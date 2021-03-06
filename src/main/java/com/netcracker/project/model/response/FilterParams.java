package com.netcracker.project.model.response;

import com.netcracker.project.model.Status;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;

public class FilterParams {
    private LocalDate leftDate;
    private LocalDate rightDate;
    private ArrayList<Status> listTasksStatus = null;

    private String authorFilter;
    private String responsibleFilter;

    private FilterRadio filterRadio = null;

    private Integer page;

    public void setParams(Integer[] params) {
        if (params != null) {
            listTasksStatus = new ArrayList<Status>();
            for (int i = 0; i < params.length; ++i) {
                    Status status = Status.valueOf(params[i]);
                    listTasksStatus.add(status);
            }
        }
    }

    public boolean isFilterEmpty() {
        boolean empty = true;

        if (leftDate != null) {
            if (leftDate.toString().length() > 0)
                empty = false;
        }

        if (rightDate != null)
        {
            if (rightDate.toString().length() > 0 )
                empty = false;
        }

        if (listTasksStatus != null) {
           if (  listTasksStatus.size() > 0)
            empty = false;
        }


        if (authorFilter != null)
        {
            if (authorFilter.toString().length() > 0 )
                empty = false;
        }

        if (responsibleFilter != null)
        {
            if (responsibleFilter.toString().length() > 0 )
                empty = false;
        }

        if (filterRadio != null)
            empty = false;

        return empty;
    }

    public boolean isDateRangeIsCorrect()
    {
        boolean correct = true;
        if (leftDate != null && rightDate != null) {
            long daysBetween = ChronoUnit.DAYS.between(leftDate, rightDate);
//            System.out.println("daysBetween = " + daysBetween);
            if (daysBetween < 0) {
                correct = false;
            }
        }
        return correct;
    }

    public LocalDate getLeftDate() {
        return leftDate;
    }

    public void setLeftDate(LocalDate leftDate) {
        this.leftDate = leftDate;
    }

    public LocalDate getRightDate() {
        return rightDate;
    }

    public void setRightDate(LocalDate rightDate) {
        this.rightDate = rightDate;
    }

    public ArrayList<Status> getListTasksStatus() {
        return listTasksStatus;
    }

    public void setListTasksStatus(ArrayList<Status> listTasksStatus) {
        this.listTasksStatus = listTasksStatus;
    }

    public Integer getPage() {
        return page;
    }

    public void setPage(Integer page) {
        if (page == null)
            page = 1;
        this.page = page;
    }

    public String getAuthorFilter() {
        return authorFilter;
    }

    public void setAuthorFilter(String authorFilter) {
        this.authorFilter = authorFilter;
    }

    public String getResponsibleFilter() {
        return responsibleFilter;
    }

    public void setResponsibleFilter(String responsibleFilter) {
        this.responsibleFilter = responsibleFilter;
    }

    public FilterRadio getFilterRadio() {
        return filterRadio;
    }

    public void setFilterRadio(FilterRadio filterRadio) {
        this.filterRadio = filterRadio;
    }
}
