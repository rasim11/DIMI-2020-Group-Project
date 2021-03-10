package com.netcracker.project.url;

public final class UrlTemplates {
    private UrlTemplates(){
    }

    public static final String API = "/api";
    public static final String VERSION = "/v1";
    public static final String USER_MANAGEMENT = "/user-management";
    public static final String USER_LOGIN = "/user-login";
    public static final String USER_REGISTRATION = "/user-registration";
    public static final String MAIN_PAGE = "/main-page";
    public static final String REDIRECT_ON_MAIN_PAGE = "redirect:" + API + VERSION + MAIN_PAGE;
    public static final String PERSONAL_ACCOUNT = "/personal-account";
    public static final String USER_GET = "/user-get";
    public static final String CURRENT_USER_GET = "/current-user-get";
    public static final String USER_PUT = "/user-put";
    public static final String ADMIN_MANAGEMENT = "/admin-management";
    public static final String TASK_MANAGEMENT = "/task-management";
    public static final String TASK_GET = "/task-get";
    public static final String TASK_POST = "/task-post";
    public static final String ROLE_MANAGEMENT = "/role-management";
    public static final String ROLE_GET = "/role-get";
    public static final String BY_ID = "-by-id";
    public static final String BY_EMAIL = "-by-email";
    public static final String BY_NAME = "-by-name";
    public static final String SERVER = "http://localhost:8082";
    public static final String USER_POST = "/user-post";
    public static final String USER_DELETE = "/user-delete";
    public static final String ALL_USERS_GET = "/all-users-get";
    public static final String ALL_ROLES_GET = "/all-roles-get";

    public static final String GET_TASK_LIST = "/get-task-list";
    public static final String FIND = "/find";
    public static final String FILTER = "/filter";
}
