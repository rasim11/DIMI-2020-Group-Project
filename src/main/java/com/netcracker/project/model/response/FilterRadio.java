package com.netcracker.project.model.response;

public class FilterRadio {
    private Integer userID = -1;
    private Boolean myTasks = false;
    private Boolean subscribeTasks = false;
    private Boolean myActualProblems = false;

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
        myActualProblems =false;
    }

    public void setSubscribeTasks()
    {
        subscribeTasks = true;
        myTasks = false;
        myActualProblems =false;
    }

    public void setMyActualProblems()
    {
        myActualProblems =true;
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

    public Boolean getSubscribeTasks() {
        return subscribeTasks;
    }

    public Boolean getMyActualProblems() {
        return myActualProblems;
    }

}
