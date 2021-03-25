package com.netcracker.project.url;

public final class UrlTemplates {
    private UrlTemplates() {
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
    public static final String BY_ID = "-by-id";
    public static final String BY_EMAIL = "-by-email";
    public static final String COMMENT_GET = "/comment-get";
    public static final String SERVER = "http://localhost:8082";
    public static final String USER_POST = "/user-post";
    public static final String USER_DELETE = "/user-delete";
    public static final String ALL_USERS_GET = "/all-users-get";
    public static final String ALL_ROLES_GET = "/all-roles-get";
    public static final String TASK_LIST_GET = "/task-list-get";
    public static final String FIND = "/find";
    public static final String FILTER = "/filter";
    public static final String REGION_MANAGEMENT = "/region-management";
    public static final String ALL_REGIONS_GET = "/all-regions-get";
    public static final String EMAIL_FREE = "/email-free";
    public static final String REGION_GET = "/region-get";
    public static final String REGION_PUT = "/region-put";
    public static final String USER_ROLE_EDIT = "/user-role-edit";
    public static final String REDIRECT_ON_ADMINISTRATION = "redirect:" + API + VERSION + ADMIN_MANAGEMENT;
    public static final String COMMENT_POST = "/comment-post";
    public static final String COMMENT_MANAGEMENT = "/comment-management";
    public static final String TASK_PUT = "/task-put";
    public static final String TASK_SOCIAL_WORKERS_MANAGEMENT = "/task-social-workers-management";
    public static final String SOCIAL_WORKERS_GET = "/social-workers-get";
    public static final String ACTIVE_TASK_DELETE = "/active-task-delete";
    public static final String ACTIVE_TASK_POST = "/active-task-post";
    public static final String FEEDBACK_MANAGEMENT = "/feedback-management";
    public static final String FEEDBACK_POST = "/feedback-post";
    public static final String ACTIVE_TASKS_GET = "/active-tasks-get";
    public static final String COMMENT_DELETE = "/comment-delete";
    public static final String FEEDBACK_GET = "/feedback-get";

    public static final String LOCAL_URL_ADMINISTRATION = API + VERSION + ADMIN_MANAGEMENT;
    public static final String LOCAL_URL_USER_ROLE_EDIT = API + VERSION + ADMIN_MANAGEMENT +
            USER_ROLE_EDIT + BY_ID + "/{id}";
    public static final String LOCAL_URL_USER_REGISTRATION_ADMIN = API + VERSION + ADMIN_MANAGEMENT + USER_REGISTRATION;
    public static final String LOCAL_URL_GET_ALL_USERS = API + VERSION + USER_MANAGEMENT + ALL_USERS_GET;
    public static final String LOCAL_URL_GET_ALL_ROLES = API + VERSION + ROLE_MANAGEMENT + ALL_ROLES_GET;
    public static final String LOCAL_URL_GET_ALL_REGIONS = API + VERSION + REGION_MANAGEMENT + ALL_REGIONS_GET;
    public static final String LOCAL_URL_CHECK_EMAIL_FREE = API + VERSION + USER_MANAGEMENT + EMAIL_FREE;
    public static final String LOCAL_URL_GET_CURRENT_USER = API + VERSION + USER_MANAGEMENT + CURRENT_USER_GET;
    public static final String LOCAL_URL_PUT_USER = API + VERSION + USER_MANAGEMENT + USER_PUT;
    public static final String LOCAL_URL_DELETE_USER = API + VERSION + USER_MANAGEMENT + USER_DELETE + "/{email}";
    public static final String LOCAL_URL_USER_LOGIN = API + VERSION + USER_MANAGEMENT + USER_LOGIN;
    public static final String LOCAL_URL_MAIN_PAGE = API + VERSION + MAIN_PAGE;
    public static final String LOCAL_URL_PERSONAL_ACCOUNT = API + VERSION + PERSONAL_ACCOUNT;
    public static final String LOCAL_URL_USER_PROFILE = API + VERSION + USER_MANAGEMENT + USER_GET + BY_ID + "/{id}";
    public static final String LOCAL_URL_USER_REGISTRATION = API + VERSION + USER_MANAGEMENT + USER_REGISTRATION;
    public static final String LOCAL_URL_POST_TASK = API + VERSION + TASK_MANAGEMENT + TASK_POST;
    public static final String LOCAL_URL_GET_TASK_BY_ID = API + VERSION + TASK_MANAGEMENT + TASK_GET + BY_ID + "/{id}";
    public static final String LOCAL_URL_AUTHOR_PUT_TASK = API + VERSION + TASK_MANAGEMENT + TASK_PUT +
            BY_ID + "-by-author/{id}";
    public static final String LOCAL_URL_POST_COMMENT = API + VERSION + COMMENT_MANAGEMENT + COMMENT_POST;
    public static final String LOCAL_URL_GET_COMMENT_BY_TASK_ID = API + VERSION + COMMENT_MANAGEMENT +
            COMMENT_GET + "-by-task/{id}";
    public static final String LOCAL_URL_RESPONSIBLE_PUT_TASK = API + VERSION + TASK_MANAGEMENT +
            TASK_PUT + BY_ID + "-by-responsible/{id}";
    public static final String LOCAL_URL_POST_FEEDBACK = API + VERSION + FEEDBACK_MANAGEMENT + FEEDBACK_POST;

    public static final String URL_GET_ALL_REGIONS = SERVER + LOCAL_URL_GET_ALL_REGIONS;
    public static final String URL_GET_ALL_USERS = SERVER + LOCAL_URL_GET_ALL_USERS;
    public static final String URL_POST_USER = SERVER + API + VERSION + USER_MANAGEMENT + USER_POST;
    public static final String URL_DELETE_USER = SERVER + LOCAL_URL_DELETE_USER;
    public static final String URL_GET_USER_BY_EMAIL = SERVER + API + VERSION + USER_MANAGEMENT +
            USER_GET + BY_EMAIL + "/{email}";
    public static final String URL_GET_USER_BY_ID = SERVER + API + VERSION + USER_MANAGEMENT +
            USER_GET + BY_ID + "/{id}";
    public static final String URL_POST_TASK = SERVER + API + VERSION + TASK_MANAGEMENT + TASK_POST;
    public static final String URL_GET_TASK_BY_ID = SERVER + LOCAL_URL_GET_TASK_BY_ID;
    public static final String URL_GET_REGION_BY_ID = SERVER + API + VERSION +
            REGION_MANAGEMENT + REGION_GET + BY_ID + "/{id}";
    public static final String URL_PUT_REGION = SERVER + API + VERSION + REGION_MANAGEMENT + REGION_PUT;
    public static final String URL_GET_REGION_BY_RESPONSIBLE_EMAIL = SERVER + API + VERSION +
            REGION_MANAGEMENT + REGION_GET + "-by-responsible" + BY_EMAIL + "/{email}";
    public static final String URL_GET_TASKS_BY_AUTHORS_EMAIL = SERVER + API + VERSION +
            TASK_MANAGEMENT + TASK_GET + "-by-author" + BY_EMAIL + "/{email}";
    public static final String URL_GET_TASK_LIST = SERVER + API + VERSION + TASK_LIST_GET;
    public static final String URL_GET_USERS_BY_REGION_ID = URL_GET_ALL_USERS + "-by-region" + BY_ID + "/{id}";
    public static final String URL_GET_WORKERS_BY_TASK_ID = SERVER + API + VERSION + TASK_SOCIAL_WORKERS_MANAGEMENT +
            SOCIAL_WORKERS_GET + "-by-active-task" + BY_ID + "/{id}";
    public static final String URL_GET_TASKS_BY_WORKER_ID = SERVER + API + VERSION + TASK_SOCIAL_WORKERS_MANAGEMENT +
            ACTIVE_TASKS_GET + "-by-social-worker" + BY_ID + "/{id}";
    public static final String URL_DELETE_ACTIVE_TASK_BY_TASK_ID = SERVER + API + VERSION +
            TASK_SOCIAL_WORKERS_MANAGEMENT + ACTIVE_TASK_DELETE + "-by-task" + BY_ID + "/{id}";
    public static final String URL_DELETE_ACTIVE_TASK_BY_WORKER_ID = SERVER + API + VERSION +
            TASK_SOCIAL_WORKERS_MANAGEMENT + ACTIVE_TASK_DELETE + "-by-worker" + BY_ID + "/{id}";
    public static final String URL_POST_ACTIVE_TASK = SERVER + API + VERSION + TASK_SOCIAL_WORKERS_MANAGEMENT +
            ACTIVE_TASK_POST;
    public static final String URL_POST_FEEDBACK = SERVER + LOCAL_URL_POST_FEEDBACK;
    public static final String URL_POST_COMMENT = SERVER + LOCAL_URL_POST_COMMENT;
    public static final String URL_GET_COMMENT_BY_TASK_ID = SERVER + LOCAL_URL_GET_COMMENT_BY_TASK_ID;
    public static final String URL_DELETE_COMMENT_BY_AUTHOR_ID = SERVER + API + VERSION + COMMENT_MANAGEMENT +
            COMMENT_DELETE + "-by-author/{id}";
    public static final String URL_GET_FEEDBACK_BY_TASK_ID = SERVER + API + VERSION + FEEDBACK_MANAGEMENT +
            FEEDBACK_GET + "-by-task/{id}";

}
