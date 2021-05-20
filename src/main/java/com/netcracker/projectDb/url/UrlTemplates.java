package com.netcracker.projectDb.url;

public final class UrlTemplates {
    private UrlTemplates() {
    }

    public static final String API = "/api";
    public static final String VERSION = "/v1";
    public static final String USER_MANAGEMENT = "/user-management";
    public static final String USER_GET = "/user-get";
    public static final String BY_ID = "-by-id";
    public static final String BY_EMAIL = "-by-email";
    public static final String ADMIN_MANAGEMENT = "/admin-management";
    public static final String ADMIN_POST = "/admin-post";
    public static final String TASK_POST = "/task-post";
    public static final String USER_POST = "/user-post";
    public static final String TASK_MANAGEMENT = "/task-management";
    public static final String TASK_GET = "/task-get";
    public static final String COMMENT_GET = "/comment-get";
    public static final String USER_DELETE = "/user-delete";
    public static final String ALL_USERS_GET = "/all-users-get";
    public static final String REGION_MANAGEMENT = "/region-management";
    public static final String ADD_STANDARD_REGIONS = "/add-standard-regions";
    public static final String ALL_REGIONS_GET = "/all-regions-get";
    public static final String REGION_GET = "/region-get";
    public static final String REGION_PUT = "/region-put";
    public static final String TASK_LIST_GET = "/task-list-get";
    public static final String FIND = "/{find}";
    public static final String TASK_SOCIAL_WORKERS_MANAGEMENT = "/task-social-workers-management";
    public static final String SOCIAL_WORKERS_GET = "/social-workers-get";
    public static final String ACTIVE_TASKS_GET = "/active-tasks-get";
    public static final String ACTIVE_TASK_DELETE = "/active-task-delete";
    public static final String ACTIVE_TASK_POST = "/active-task-post";
    public static final String FEEDBACK_MANAGEMENT = "/feedback-management";
    public static final String FEEDBACK_POST = "/feedback-post";
    public static final String COMMENT_POST = "/comment-post";
    public static final String COMMENT_MANAGEMENT = "/comment-management";
    public static final String COMMENT_DELETE = "/comment-delete";
    public static final String FEEDBACK_GET = "/feedback-get";
    public static final String SUBSCRIPTION_MANAGEMENT = "/subscription-management";
    public static final String HISTORY_MANAGEMENT = "/history-management";
    public static final String MUNICIPALITY_MANAGEMENT = "/municipality-management";


    public static final String URL_ADD_STANDARD_REGIONS = API + VERSION + REGION_MANAGEMENT + ADD_STANDARD_REGIONS;
    public static final String URL_POST_ADMIN = API + VERSION + ADMIN_MANAGEMENT + ADMIN_POST;
    public static final String URL_ADD_STANDARD_MUNICIPALITY = API + VERSION + MUNICIPALITY_MANAGEMENT +
            "/add-standard-municipality";

    public static final String URL_GET_USER_BY_EMAIL = API + VERSION + USER_MANAGEMENT +
            USER_GET + BY_EMAIL + "/{email}";
    public static final String URL_GET_USER_BY_ID = API + VERSION + USER_MANAGEMENT + USER_GET + BY_ID + "/{id}";
    public static final String URL_POST_USER = API + VERSION + USER_MANAGEMENT + USER_POST;
    public static final String URL_GET_TASK_BY_ID = API + VERSION + TASK_MANAGEMENT + TASK_GET + BY_ID + "/{id}";
    public static final String URL_POST_TASK = API + VERSION + TASK_MANAGEMENT + TASK_POST;
    public static final String URL_DELETE_USER = API + VERSION + USER_MANAGEMENT + USER_DELETE + "/{email}";
    public static final String URL_GET_ALL_USERS = API + VERSION + USER_MANAGEMENT + ALL_USERS_GET;
    public static final String URL_GET_ALL_REGIONS = API + VERSION + REGION_MANAGEMENT + ALL_REGIONS_GET;
    public static final String URL_GET_REGION_BY_ID = API + VERSION + REGION_MANAGEMENT + REGION_GET + BY_ID + "/{id}";
    public static final String URL_PUT_REGION = API + VERSION + REGION_MANAGEMENT + REGION_PUT;
    public static final String URL_GET_REGION_BY_RESPONSIBLE_EMAIL = API + VERSION + REGION_MANAGEMENT +
            REGION_GET + "-by-responsible" + BY_EMAIL + "/{email}";
    public static final String URL_GET_TASKS_BY_AUTHORS_EMAIL = API + VERSION + TASK_MANAGEMENT +
            TASK_GET + "-by-author" + BY_EMAIL + "/{email}";
    public static final String URL_GET_TASK_LIST = API + VERSION + TASK_LIST_GET;
    public static final String URL_GET_WORKERS_BY_REGION_ID = API + VERSION + USER_MANAGEMENT +
            "/workers-get-by-region-id/{id}";
    public static final String URL_GET_WORKERS_BY_TASK_ID = API + VERSION + TASK_SOCIAL_WORKERS_MANAGEMENT +
            SOCIAL_WORKERS_GET + "-by-active-task" + BY_ID + "/{id}";
    public static final String URL_GET_TASKS_BY_WORKER_ID = API + VERSION + TASK_SOCIAL_WORKERS_MANAGEMENT +
            ACTIVE_TASKS_GET + "-by-social-worker" + BY_ID + "/{id}";
    public static final String URL_DELETE_ACTIVE_TASK_BY_TASK_ID = API + VERSION + TASK_SOCIAL_WORKERS_MANAGEMENT +
            ACTIVE_TASK_DELETE + "-by-task" + BY_ID + "/{id}";
    public static final String URL_DELETE_ACTIVE_TASK_BY_WORKER_ID = API + VERSION + TASK_SOCIAL_WORKERS_MANAGEMENT +
            ACTIVE_TASK_DELETE + "-by-worker" + BY_ID + "/{id}";
    public static final String URL_POST_ACTIVE_TASK = API + VERSION + TASK_SOCIAL_WORKERS_MANAGEMENT +
            ACTIVE_TASK_POST;
    public static final String URL_POST_COMMENT = API + VERSION + COMMENT_MANAGEMENT + COMMENT_POST;
    public static final String URL_GET_COMMENT_BY_TASK_ID = API + VERSION + COMMENT_MANAGEMENT +
            COMMENT_GET + "-by-task/{id}";
    public static final String URL_DELETE_COMMENT_BY_AUTHOR_ID = API + VERSION + COMMENT_MANAGEMENT +
            COMMENT_DELETE + "-by-author/{id}";
    public static final String URL_GET_FEEDBACK_BY_TASK_ID = API + VERSION + FEEDBACK_MANAGEMENT +
            FEEDBACK_GET + "-by-task/{id}";
    public static final String URL_GET_SUBSCRIPTION_BY_TASK_USER_IDS = API + VERSION + SUBSCRIPTION_MANAGEMENT +
            "/subscription-get-by-task-user-ids/{taskId}&{userId}";
    public static final String URL_POST_SUBSCRIPTION = API + VERSION + SUBSCRIPTION_MANAGEMENT + "/subscription-post";
    public static final String URL_DELETE_SUBSCRIPTION_BY_ID = API + VERSION + SUBSCRIPTION_MANAGEMENT +
            "/subscription-delete-by-id/{id}";
    public static final String URL_DELETE_SUBSCRIPTIONS_BY_USER_ID = API + VERSION + SUBSCRIPTION_MANAGEMENT +
            "/subscriptions-delete-by-user-id/{id}";
    public static final String URL_GET_DEPUTIES_BY_REGION_ID = API + VERSION + USER_MANAGEMENT +
            "/deputies-get-by-region-id/{id}";
    public static final String URL_GET_TASKS_BY_CURR_RESPONSIBLE_ID = API + VERSION + TASK_MANAGEMENT + TASK_GET +
            "-by-curr-responsible-id/{id}";
    public static final String URL_GET_HISTORY_BY_TASK_ID = API + VERSION + HISTORY_MANAGEMENT +
            "/history-get-by-task-id/{id}";
    public static final String URL_POST_HISTORY = API + VERSION + HISTORY_MANAGEMENT + "/history-post";
    public static final String URL_GET_REGION_BY_NAME = API + VERSION + REGION_MANAGEMENT + REGION_GET +
            "-by-name/{name}";
    public static final String URL_GET_MUNICIPALITIES = API + VERSION + MUNICIPALITY_MANAGEMENT + "/municipalities-get";
    public static final String URL_GET_MUNICIPALITY_BY_ID = API + VERSION + MUNICIPALITY_MANAGEMENT +
            "/municipality-get-by-id/{id}";
    public static final String URL_GET_HISTORIES_BY_PREVIOUS_CURRENT_RESPONSIBLE_ID = API + VERSION +
            HISTORY_MANAGEMENT + "/history-get-by-previous-current-responsible-id/{id}";
    public static final String URL_DELETE_HISTORY = API + VERSION + HISTORY_MANAGEMENT + "/history-delete/{id}";
    public static final String URL_GET_ORIGIN_FROM_DUPLICATE = API + VERSION + "/get-origin-from-duplicate/{id}";
    public static final String URL_GET_DUPLICATE_FROM_ORIGIN = API + VERSION + "/get-duplicate-from-origin/{id}";
    public static final String URL_GET_FIRST_FROM_BLOCKED = API + VERSION + "/get-first-from-blocked/{id}";
    public static final String URL_GET_BLOCKED_FROM_FIRST = API + VERSION + "/get-blocked-from-first/{id}";
    public static final String URL_GET_LINKED_TASKS = API + VERSION + "/get-linked-tasks/{id}";
    public static final String URL_POST_DUPLICATES_TASKS = API + VERSION + TASK_MANAGEMENT + "/post-duplicates";
    public static final String URL_POST_BLOCKED_TASKS = API + VERSION + TASK_MANAGEMENT + "/post-blocked";
    public static final String URL_DELETE_DUPLICATES_BY_ID = API + VERSION + TASK_MANAGEMENT +
            "/delete-duplicates-by-id/{id}";
    public static final String URL_DELETE_BLOCKED_BY_ID = API + VERSION + TASK_MANAGEMENT +
            "/delete-blocked-by-id/{id}";
    public static final String URL_DELETE_LINKED_TASKS = API + VERSION + TASK_MANAGEMENT + "/delete-linked-tasks/{id}";
    public static final String URL_POST_LINKED_TASKS = API + VERSION + TASK_MANAGEMENT + "/post-linked";
    public static final String URL_GET_SUBSCRIPTIONS_BY_TASK_ID = API + VERSION + SUBSCRIPTION_MANAGEMENT +
            "/subscriptions-get-by-task-id/{id}";
    public static final String URL_GET_COMMENTS_BY_AUTHOR = API + VERSION + COMMENT_MANAGEMENT +
            "/comments-get-by-author/{id}";
    public static final String URL_GET_USER_BY_URL_ACCOUNT_CONFIRM = API + VERSION + USER_MANAGEMENT +
            "/get-by-url-account-confirm/{url}";
}
