package com.netcracker.project.model.response;



import com.netcracker.project.model.Task;

import java.time.LocalDate;
import java.util.List;

public class GetPageAndDateRange {
   private List<Task> taskList;
    private LocalDate dateLeft;
    private LocalDate dateRight;

    private Integer allTaskCount;

   public GetPageAndDateRange(List<Task> taskList, LocalDate dateLeft, LocalDate dateRight)
    {
        this.taskList = taskList;
        this.dateLeft = dateLeft;
        this.dateRight = dateRight;
    }

    public GetPageAndDateRange()
    {
    }

    public List<Task> getTaskList() {
        return taskList;
    }

    public void setTaskList(List<Task> taskList) {
        this.taskList = taskList;
    }

    public LocalDate getDateLeft() {
        return dateLeft;
    }

    public void setDateLeft(LocalDate dateLeft) {
        this.dateLeft = dateLeft;
    }

    public LocalDate getDateRight() {
        return dateRight;
    }

    public void setDateRight(LocalDate dateRight) {
        this.dateRight = dateRight;
    }

    public Integer getAllTaskCount() {
        return allTaskCount;
    }

    public void setAllTaskCount(Integer allTaskCount) {
        this.allTaskCount = allTaskCount;
    }
}
