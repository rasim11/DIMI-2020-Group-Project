package com.netcracker.projectDb.controller;

import com.netcracker.projectDb.model.*;
import com.netcracker.projectDb.model.comparator.CompareByDate;
import com.netcracker.projectDb.model.response.FilterParams;
import com.netcracker.projectDb.model.response.FilterRadio;
import com.netcracker.projectDb.model.response.GetPageAndDateRange;
import com.netcracker.projectDb.repository.DuplicateTasksRepository;
import com.netcracker.projectDb.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static com.netcracker.projectDb.url.UrlTemplates.*;
import static com.netcracker.projectDb.url.UrlTemplates.URL_GET_BLOCKED_FROM_FIRST;

@RestController
public class TaskController {

    // тасков на странице
    final int taskCountOnPage = 10;

    @Autowired
    private TaskService taskService;

    @Autowired
    private TaskSocialWorkersService taskSocialWorkersService;

    @Autowired
    private UserService userService;

    @Autowired
    private SubscriptionService subscriptionService;



    @GetMapping(URL_GET_TASK_LIST + "/page")
    public GetPageAndDateRange pageGet(@RequestParam Integer page) {
        System.out.println("URL_GET_TASK_LIST page " + page);

        // индекс страницы
        if (page != null) {
            if (page - 1 > -1)
                page--;
        } else {
            page = 0;
        }

        List<Task> taskList = (List<Task>) taskService.findAll();
        CompareByDate compareByDate = new CompareByDate();
        taskList.sort(compareByDate);
        List<Task> limitList = taskList.stream()
                .skip(taskCountOnPage * page)
                .limit(taskCountOnPage)
                .collect(Collectors.toList());

        GetPageAndDateRange getPageAndDateRange = new GetPageAndDateRange(limitList, null, null);
        getPageAndDateRange.setAllTaskCount(taskList.size());

        return getPageAndDateRange;
    }

    @PostMapping(URL_GET_TASK_LIST + "/filter")
    public GetPageAndDateRange filterStatus(@RequestBody FilterParams filterParams) {

        ArrayList<Task> taskList = new ArrayList<>();

        if (!filterParams.isFilterEmpty()) // если не пустой
        {
            if (filterParams.getFilterRadio() != null) // если есть радиокнопки
            {
                FilterRadio filterRadio = filterParams.getFilterRadio();
                Long userId = Long.valueOf(filterParams.getFilterRadio().getUserID());
                User user = userService.getUserById(userId).orElse(null);

                if (user != null) {
                    if (filterRadio.getMyTasks()) // если мои проблемы
                    {
                        if (user.getRole() == Role.USER) {
                            taskList = (ArrayList<Task>) taskService.findAllByAuthor(user);
                        } else if (user.getRole() == Role.SOCIAL_WORKER) { // если проблемы для соц работников
                            Iterable<TaskSocialWorkers> taskSocialWorkers = taskSocialWorkersService.getAllBySocialWorker(user);
                            for (TaskSocialWorkers elem : taskSocialWorkers) {
                                Task activeTask = elem.getActiveTask();
                                taskList.add(activeTask);
                            }
                        } else if (user.getRole() == Role.RESPONSIBLE) // если проблемы для регионального ответственного
                        {
                            taskList = (ArrayList<Task>) taskService.findAll();
                            taskList = (ArrayList<Task>) taskList.stream()
//                                    .filter( (x)->  x.getRegion().getResponsible().getId() == user.getId() )
                                    .filter( (x)->  x.getRegion()!= null  )
                                    .filter( (x)->  x.getRegion().getResponsible() != null)
                                    .filter( (x)->  x.getRegion().getResponsible().getId() != null)
                                    .filter( (x)->  x.getRegion().getResponsible().getId() == user.getId())
                                    .collect(Collectors.toList());
                        } else if (user.getRole() == Role.DEPUTY) // если проблемы для ответственного
                        {
                            taskList = (ArrayList<Task>) taskService.getAllByCurrResponsibleId(userId);
                        }

                        return filterAll(filterParams, taskList);
                    } else if (filterRadio.getSubscribeTasks()) // если проблемы с подпиской
                    {
                        ArrayList<Subscription> subsList = subscriptionService.findAllByUser(user);

                        if (subsList != null) {
                            for (Subscription elem : subsList) {
                                Task task = elem.getTask();
                                taskList.add(task);
                            }
                            return filterAll(filterParams, taskList);
                        } else return null;
                    }
                    else if (filterRadio.getMyActualProblems()) // если мои актуальные проблемы
                    {
                        if (user.getRole() == Role.USER) {
                            taskList = (ArrayList<Task>) taskService.findAllByAuthor(user);
                        } else if (user.getRole() == Role.SOCIAL_WORKER) { // если проблемы для соц работников
                            Iterable<TaskSocialWorkers> taskSocialWorkers = taskSocialWorkersService.getAllBySocialWorker(user);
                            for (TaskSocialWorkers elem : taskSocialWorkers) {
                                Task activeTask = elem.getActiveTask();
                                taskList.add(activeTask);
                            }
                        } else if (user.getRole() == Role.RESPONSIBLE) // если проблемы для регионального ответственного
                        {
                            taskList = (ArrayList<Task>) taskService.findAll();
                            taskList = (ArrayList<Task>) taskList.stream()
//                                    .filter( (x)->  x.getRegion().getResponsible().getId() == user.getId() )
                                    .filter( (x)->  x.getRegion()!= null  )
                                    .filter( (x)->  x.getRegion().getResponsible() != null)
                                    .filter( (x)->  x.getRegion().getResponsible().getId() != null)
                                    .filter( (x)->  x.getRegion().getResponsible().getId() == user.getId())
                                    .collect(Collectors.toList());
                        } else if (user.getRole() == Role.DEPUTY) // если проблемы для ответственного
                        {
                            taskList = (ArrayList<Task>) taskService.getAllByCurrResponsibleId(userId);
                        }

                        taskList = (ArrayList<Task>) taskList.stream()
                                 .filter( (x)->  (x.getStatus()==Status.IN_CREATING ||
                                         x.getStatus()==Status.IN_PROCESSING ||
                                         x.getStatus()==Status.OPENED ||
                                         x.getStatus()==Status.AWAITING_SOLUTION) )
                                .collect(Collectors.toList());

                        return filterAll(filterParams, taskList);
                    }
                } else return null;
            } else { // если нет радиокнопок, то возварщаем все проблемы

                taskList = (ArrayList<Task>) taskService.findAll();
                return filterAll(filterParams, taskList);
            }
        } else return null;    // если пустой
        return null;
    }

// поочередная фильтрация по всем пунктам
    public GetPageAndDateRange filterAll(FilterParams filterParams, ArrayList<Task> taskList) {
        System.out.println("taskList" + taskList.size());
        taskList = filterByStatus(filterParams, taskList);
        System.out.println("taskList filterByStatus" + taskList.size());
        taskList = filterByDate(filterParams, taskList);
        System.out.println("taskList filterByDate" + taskList.size());
        taskList = filterByAuthor(filterParams, taskList);
        System.out.println("taskList filterByAuthor" + taskList.size());
        taskList = filterByResponsible(filterParams, taskList);
        System.out.println("taskList filterByResponsible" + taskList.size());

        GetPageAndDateRange getPageAndDateRange = new GetPageAndDateRange(null, null, null);
        getPageAndDateRange.setAllTaskCount(taskList.size());

        taskList = filterByPage(filterParams, taskList);
        System.out.println("taskList filterByPage" + taskList.size());

        getPageAndDateRange.setTaskList(taskList);

        return getPageAndDateRange;
    }


    public ArrayList<Task> filterByPage(FilterParams filterParams, ArrayList<Task> arrayList) {
        CompareByDate compareByDate = new CompareByDate();
        arrayList.sort(compareByDate);

        Integer page = filterParams.getPage();

        if (page != null) {
            if (page - 1 > -1)
                page--;
        } else {
            page = 0;
        }

        List<Task> limitList = arrayList.stream()
                .skip(taskCountOnPage * page)
                .limit(taskCountOnPage)
                .collect(Collectors.toList());

        return (ArrayList<Task>) limitList;
    }

    public ArrayList<Task> filterByStatus(FilterParams filterParams, ArrayList<Task> arrayList) {
        ArrayList<Task> taskListStatus = new ArrayList<>();
        // забираем по параметру
        if (filterParams.getListTasksStatus() != null) {
            Integer paramsSize = filterParams.getListTasksStatus().size();

            for (int i = 0; i < paramsSize; ++i) {
                Status taskStatus = filterParams.getListTasksStatus().get(i);
                System.out.println("taskStatus " + taskStatus.toString() );
                List<Task> buffer = arrayList.stream()
                        .filter((x) -> x.getStatus() == taskStatus)
                        .collect(Collectors.toList());
                taskListStatus.addAll(buffer);
            }
        } else {
            taskListStatus = arrayList;
        }
        return taskListStatus;
    }

    public ArrayList<Task> filterByDate(FilterParams filterParams, ArrayList<Task> arrayList) {
        ArrayList<Task> taskListDate = new ArrayList<>();

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd.MM.yyyy HH:mm:ss");

        if (filterParams.getLeftDate() == null && filterParams.getRightDate() == null) {
            return arrayList;
        } else if (filterParams.getLeftDate() != null && filterParams.getRightDate() != null) {
            for (int i = 0; i < arrayList.size(); ++i) {
                LocalDate elemDate = LocalDate.now();
                Task currELem = arrayList.get(i);
                try {
                    elemDate = LocalDate.parse(currELem.getRegDate(), formatter);
                } catch (DateTimeParseException e) {
                    System.out.println("java.time.format.DateTimeParseException");
                    elemDate = LocalDate.now();
                }
                LocalDate left = filterParams.getLeftDate();
                LocalDate right = filterParams.getRightDate();

                if (elemDate.compareTo(left) >= 0 && elemDate.compareTo(right) <= 0)
                    taskListDate.add(currELem);
            }
        } else if (filterParams.getLeftDate() != null) {
            for (int i = 0; i < arrayList.size(); ++i) {
                LocalDate elemDate = LocalDate.now();
                Task currELem = arrayList.get(i);
                try {
                    elemDate = LocalDate.parse(currELem.getRegDate(), formatter);
                } catch (DateTimeParseException e) {
                    System.out.println("java.time.format.DateTimeParseException");
                    elemDate = LocalDate.now();
                }
                LocalDate left = filterParams.getLeftDate();

                if (elemDate.compareTo(left) >= 0)
                    taskListDate.add(currELem);
            }
        } else if (filterParams.getRightDate() != null) {
            for (int i = 0; i < arrayList.size(); ++i) {
                LocalDate elemDate = LocalDate.now();
                Task currELem = arrayList.get(i);
                try {
                    elemDate = LocalDate.parse(currELem.getRegDate(), formatter);
                } catch (DateTimeParseException e) {
                    System.out.println("java.time.format.DateTimeParseException");
                    elemDate = LocalDate.now();
                }
                LocalDate right = filterParams.getRightDate();
                if (elemDate.compareTo(right) <= 0)
                    taskListDate.add(currELem);
            }
        }
        return taskListDate;
    }

    public ArrayList<Task> filterByAuthor(FilterParams filterParams, ArrayList<Task> arrayList) {
        ArrayList<Task> taskListAuthor = new ArrayList<>();

        String authorFilter = filterParams.getAuthorFilter();

        if (authorFilter != null) {
            if (authorFilter.length() > 0) {
                authorFilter = authorFilter.toLowerCase();
                for (int i = 0; i < arrayList.size(); ++i) {
                    Task task = arrayList.get(i);
                    String author = task.getAuthor().getFirstname()
                            + " " + task.getAuthor().getLastname()
                            + " " + task.getAuthor().getMiddlename();
                    author = author.toLowerCase();

                    if (author.contains(authorFilter)) {
                        taskListAuthor.add(task);
                    } else System.out.println("not euqual");
                }
                return taskListAuthor;
            }
            return arrayList;
        }
        return arrayList;
    }


    public ArrayList<Task> filterByResponsible(FilterParams filterParams, ArrayList<Task> arrayList) {
        ArrayList<Task> taskListResp = new ArrayList<>();

        String respFilter = filterParams.getResponsibleFilter();
        System.out.println("respFilter " + respFilter);
        if (respFilter != null) {
            if (respFilter.length() > 0) {
                respFilter = respFilter.toLowerCase();
                for (int i = 0; i < arrayList.size(); ++i) {
                    ArrayList<User> respUsers = getAllTaskWorkerByTask(arrayList.get(i));

                    for (int j = 0; j < respUsers.size(); ++j) {
                        User user = respUsers.get(j);
                        String gullName = user.getFirstname()
                                + " " + user.getLastname()
                                + " " + user.getMiddlename();
                        gullName = gullName.toLowerCase();

                        if (gullName.contains(respFilter))
                            taskListResp.add(arrayList.get(i));
                    }
                }
                System.out.println(" return taskListResp");
                return taskListResp;
            }
            return arrayList;
        }
        System.out.println("return  arrayList");
        return arrayList;
    }


    ArrayList<User> getAllTaskWorkerByTask(Task task) {
        ArrayList<TaskSocialWorkers> arrayTaskSW = (ArrayList<TaskSocialWorkers>) taskSocialWorkersService.getAllByActiveTask(task);

        ArrayList<User> users = new ArrayList<>();

        for (int i = 0; i < arrayTaskSW.size(); ++i) {
            users.add(arrayTaskSW.get(i).getSocialWorker());
        }
        return users;
    }


    @GetMapping(URL_GET_TASK_LIST + FIND)
    public List<Task> returnFindTaskList(@PathVariable String find) {
//        System.out.println("find - " + find);
        find = find.toLowerCase();
        List<Task> allList =  (List<Task>) taskService.findAll();
        List<Task> findList = new ArrayList<>();

        for (Task elem : allList)
        {
            String taskName = elem.getTaskName();
            taskName = taskName.toLowerCase();
            System.out.println("find - " + find);
            System.out.println("taskName - " + taskName);
            System.out.println("contains - " + ( taskName.contains(find) || find.contains(taskName)));
            if ( taskName.contains(find) || find.contains(taskName))
                findList.add(elem);
        }
         return findList;
    }

}
