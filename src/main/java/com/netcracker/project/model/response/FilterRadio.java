package com.netcracker.project.model.response;

public class FilterRadio {
    private Integer userID = -1;
    private Boolean myTasks = false;
    private Boolean subscribeTasks = false;
    private Boolean myTaskForStaff = false;

    FilterRadio(Integer userId)
    {
        this.userID = userId;
    }
    public FilterRadio()
    {
    }

    public void setMyTasks()
    {
        myTasks = true;
        subscribeTasks = false;
        myTaskForStaff =false;
    }

    public void setSubscribeTasks()
    {
        subscribeTasks = true;
        myTasks = false;
        myTaskForStaff =false;
    }

    public void setMyTaskForStaff()
    {
        myTaskForStaff =true;
        subscribeTasks = false;
        myTasks = false;
    }

    public Integer getUserID() {
        return userID;
    }

    public void setUserId(Integer userId) {
        this.userID = userId;
    }

    public Boolean getMyTasks() {
        return myTasks;
    }

    public void setMyTasks(Boolean myTasks) {
        this.myTasks = myTasks;
    }

    public Boolean getSubscribeTasks() {
        return subscribeTasks;
    }

    public void setSubscribeTasks(Boolean subscribeTasks) {
        this.subscribeTasks = subscribeTasks;
    }

    public Boolean getMyTaskForStaff() {
        return myTaskForStaff;
    }

    public void setMyTaskForStaff(Boolean myTaskForStaff) {
        this.myTaskForStaff = myTaskForStaff;
    }
}
