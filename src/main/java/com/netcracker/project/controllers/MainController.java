package com.netcracker.project.controllers;


import com.netcracker.project.model.Task;
import com.netcracker.project.model.response.FilterParams;
import com.netcracker.project.model.response.FilterRadio;
import com.netcracker.project.model.response.GetPageAndDateRange;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import static com.netcracker.project.url.UrlTemplates.*;

@Controller
public class MainController {

    // тасков на странице
    final int taskCountOnPage = 10;

    @Autowired
    private RestTemplate restTemplate;

    final String pageUrl = URL_GET_TASK_LIST + "/page";
    final String filterUrl = URL_GET_TASK_LIST + "/filter";


    @GetMapping(LOCAL_URL_MAIN_PAGE)
    public String mainPageGet(Model model) {
//        Integer currentPage = 1;
//        mainPageCommon(currentPage, model);
        model.addAttribute("defaultRadio", true);
        return "main";
    }


    @PostMapping(LOCAL_URL_MAIN_PAGE)
    public String mainPagePost(Model model, @RequestParam(required = false) Integer page
    ) {

        Integer currentPage = -1;
        if (page != null) {
            model.addAttribute("currentPage", page);
            currentPage = page;
        } else currentPage = 1;

        mainPageCommon(currentPage, model);

        return "taskList";
    }

    public void mainPageCommon(Integer currentPage, Model model) {
        HttpHeaders headers = new HttpHeaders();
        headers.set("Accept", MediaType.APPLICATION_JSON_VALUE);

        UriComponentsBuilder builder = UriComponentsBuilder.fromHttpUrl(pageUrl)
                .queryParam("page", currentPage);
        HttpEntity<?> entity = new HttpEntity<>(headers);

        ResponseEntity<GetPageAndDateRange> response = restTemplate.exchange(
                builder.toUriString(),
                HttpMethod.GET,
                entity,
                GetPageAndDateRange.class);

        List<Task> taskList = response.getBody().getTaskList();

        model.addAttribute("taskList", taskList);
        Integer taskCount = response.getBody().getAllTaskCount();
        if (taskCount == null)
            taskCount = 0;

        setButtons(currentPage, taskCount, model);
    }


    public void setButtons(Integer page, Integer taskCount, Model model) {
        Integer currentPage = -1;
        if (page != null) {
            model.addAttribute("currentPage", page);
            currentPage = page;
        } else currentPage = 1;

        if (taskCount == null)
            taskCount = 0;


        // формирование кнопок страниц
        int buttonCount = (int) (taskCount / taskCountOnPage);
        int ostatok = (int) (taskCount % taskCountOnPage);
        if (ostatok != 0)
            buttonCount++;

//        buttonCount = 100;

        if (currentPage - 3 > 1)
            model.addAttribute("setFirst", 1);

        if (currentPage + 3 < buttonCount)
            model.addAttribute("setLast", buttonCount);

        if (currentPage - 1 >= 1)
            model.addAttribute("toLeft", currentPage - 1);

        if (currentPage + 1 <= buttonCount)
            model.addAttribute("toRight", currentPage + 1);

        if (currentPage > buttonCount)
            currentPage = buttonCount;
        if (currentPage < 1)
            currentPage = 1;

        ArrayList<Integer> pageNumbers = new ArrayList<>();

        int left = 2;
        int right = 4;
        int currentPageBuff = currentPage;

        if (buttonCount < 7) {
            for (int i = 0; i < buttonCount; ++i) {
                pageNumbers.add(i + 1);
//                System.out.println(pageNumbers.size());
            }
        } else {
            while (left != 0 && currentPageBuff != 1) {
                left--;
                currentPageBuff--;
                pageNumbers.add(0, currentPageBuff);
            }
            right += left;
            currentPageBuff = currentPage;
            while (currentPageBuff != buttonCount + 1 && right != 0) {
                pageNumbers.add(currentPageBuff);
                right--;
                currentPageBuff++;
            }
        }
        model.addAttribute("currentPage", currentPage);
        model.addAttribute("pageNumbers", pageNumbers);
    }


    @PostMapping(LOCAL_URL_MAIN_PAGE + "/filter")
    public String filterPost(@RequestParam(required = false) Integer[] checkbox,
                             @RequestParam(required = false) String[] date,
                             @RequestParam(required = false) Integer page,
                             @RequestParam(required = false) String inpAuthForm,
                             @RequestParam(required = false) String inpRespForm,
                             @RequestParam(required = false) Boolean radioAP,
                             @RequestParam(required = false) Boolean radioMP,
                             @RequestParam(required = false) Boolean radioSP,
                             @RequestParam(required = false) Integer userId,

                             Model model
    ) {

        FilterRadio filterRadio = null;

        // задание радио кнопок
        if (radioMP != null) {
            if (radioMP) {
                filterRadio = new FilterRadio();
                filterRadio.setMyTasks();
                filterRadio.setUserId(userId);
                String infMessage = "Созданные задачи" ;
                model.addAttribute("infMessage", infMessage);
            }
        } else  if (radioSP != null) {
            if (radioSP) {
                filterRadio = new FilterRadio();
                filterRadio.setSubscribeTasks();
                filterRadio.setUserId(userId);
                String infMessage = "Отслеживаемые задачи" ;
                model.addAttribute("infMessage", infMessage);
            }
        }


        if (inpAuthForm != null)
            System.out.println("inpAuth " + inpAuthForm);
        else System.out.println("inpAuthForm == null ");

        if (inpRespForm != null)
            System.out.println("inpAuth " + inpRespForm);
        else System.out.println("inpRespForm == null ");


        FilterParams filterParams = new FilterParams();
        filterParams.setFilterRadio(filterRadio);

        if (checkbox != null) {
            filterParams.setParams(checkbox);
            for (int i = 0; i < checkbox.length; ++i) {
                String checkParam = "checkbox" + checkbox[i];
                model.addAttribute(checkParam, 1);
            }
        }

        filterParams.setAuthorFilter(inpAuthForm);
        filterParams.setResponsibleFilter(inpRespForm);

        DateTimeFormatter format = DateTimeFormatter.ofPattern("dd/MM/yyyy");
        LocalDate leftDate = null;
        LocalDate rightDate = null;

        if (date != null) {
            if (date[0].length() > 0) {
                try {
                    leftDate = LocalDate.parse(date[0], format);
                    filterParams.setLeftDate(leftDate);
                } catch (DateTimeParseException e) {
                    System.out.println("java.time.format.DateTimeParseException");
                }
            }

            if (date[1].length() > 0) {
                try {
                    rightDate = LocalDate.parse(date[1], format);
                    filterParams.setRightDate(rightDate);
                } catch (DateTimeParseException e) {
                    System.out.println("java.time.format.DateTimeParseException");
                }
            }
        }

        if (filterParams.isFilterEmpty()) {
            System.out.println("filterParams.isFilterEmpty()");
            mainPagePost(model, 1);
            return "taskList";
        } else {
            System.out.println("filterParams.isFilterEmpty() not not not");
            if (filterParams.isDateRangeIsCorrect()) {

                if (leftDate != null)
                    model.addAttribute("leftDate", leftDate);
                if (rightDate != null)
                    model.addAttribute("rightDate", rightDate);

                filterParams.setPage(page);
                GetPageAndDateRange response = restTemplate.postForObject(filterUrl, filterParams, GetPageAndDateRange.class);
                if (response != null)
                {
                    model.addAttribute("taskList", response.getTaskList());
                    Integer allTaskCount = response.getAllTaskCount();
                    setButtons(page, allTaskCount, model);
                }

            } else {
                String betweenError = "Начальный день после последнего";
                model.addAttribute("infMessage", betweenError);
            }
        }
        return "taskList";
    }

    @GetMapping(LOCAL_URL_MAIN_PAGE + "/filterMyProblems")
    public String filterMyProblemsGet( @RequestParam(required = false) Integer userId,  Model model    ) {
        setRadios(0, userId, model);
        String infMessage = "Созданные задачи" ;
        model.addAttribute("infMessage", infMessage);

//        return "redirect:/api/v1/main-page";
        return "taskList";
    }

    @GetMapping(LOCAL_URL_MAIN_PAGE + "/filterSubsProblems")
    public String filterSubscribeProblemsGet( @RequestParam(required = false) Integer userId, Model model) {
        setRadios(1, userId, model);
        String infMessage = "Отслеживаемые задачи" ;
        model.addAttribute("infMessage", infMessage);
        return "taskList";
    }

    void setRadios(Integer valeOfRadio, Integer userId, Model model)
    {
        System.out.println("filterPost " + userId);
        FilterParams filterParams = new FilterParams();
        if (userId != null)
        {
            FilterRadio filterRadio = new FilterRadio();

            if (valeOfRadio == 0)
            filterRadio.setMyTasks();
            if (valeOfRadio == 1)
                filterRadio.setSubscribeTasks();

            filterRadio.setUserId(userId);
            filterParams.setFilterRadio(filterRadio);

            GetPageAndDateRange response = restTemplate.postForObject(filterUrl, filterParams, GetPageAndDateRange.class);
            if (response != null)
            {
                model.addAttribute("taskList", response.getTaskList());
                Integer allTaskCount = response.getAllTaskCount();
                setButtons(1, allTaskCount, model);
                System.out.println("size " +  response.getTaskList().size());
            }
        }
    }


    @PostMapping(LOCAL_URL_MAIN_PAGE + FIND)
    public String findPost(@RequestParam(required = false, defaultValue = "") String find, Model model) {
        RestTemplate restTemplate = new RestTemplate();
        List<Task> listTask;
        ResponseEntity<Task[]> response =
                restTemplate.getForEntity(
                        URL_GET_TASK_LIST + "/" + find,
                        Task[].class);
        Task[] taskArray = response.getBody();
        listTask = Arrays.asList(taskArray);
        if (listTask != null)
            if (listTask.size() > 0)
                model.addAttribute("taskList", listTask);

        return "taskList";
    }
}
