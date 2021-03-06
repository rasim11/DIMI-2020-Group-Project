const API = "/api";
const VERSION = "/v1";
const USER_MANAGEMENT = "/user-management";
const USER_PUT = "/user-put";
const USER_DELETE = "/user-delete";
const ALL_USERS_GET = "/all-users-get";
const CUR_USER_GET = "/current-user-get";
const PERSONAL_ACCOUNT = "/personal-account";
const ALL_ROLES_GET = "/all-roles-get";
const ROLE_MANAGEMENT = "/role-management";
const ADMIN_MANAGEMENT = "/admin-management";
const USER_REGISTRATION = "/user-registration";
const REGION_MANAGEMENT = "/region-management";
const ALL_REGIONS_GET = "/all-regions-get";
const EMAIL_FREE = "/email-free";
const USER_GET = "/user-get";
const BY_ID = "-by-id";
const COMMENT_POST = "/comment-post";
const COMMENT_MANAGEMENT = "/comment-management";
const COMMENT_GET = "/comment-get";
const FEEDBACK_MANAGEMENT = "/feedback-management";
const FEEDBACK_POST = "/feedback-post";
const TASK_MANAGEMENT = "/task-management";
const TASK_GET = "/task-get";
const SUBSCRIPTION_MANAGEMENT = "/subscription-management";
const TASK_SOCIAL_WORKERS_MANAGEMENT = "/task-social-workers-management";
const MUNICIPALITY_MANAGEMENT = "/municipality-management";

const URL_GET_ALL_USER = API + VERSION + USER_MANAGEMENT + ALL_USERS_GET;
const URL_GET_EMPLOYEES = API + VERSION + USER_MANAGEMENT + "/get-employees-by-responsible-email";
const URL_GET_TASKS_BY_WORKER_ID = API + VERSION + TASK_SOCIAL_WORKERS_MANAGEMENT +
    "/active-tasks-get-by-social-worker" + BY_ID;
const URL_DELETE_USER = API + VERSION + USER_MANAGEMENT + USER_DELETE;
const URL_GET_ALL_ROLES = API + VERSION + ROLE_MANAGEMENT + ALL_ROLES_GET;
const URL_GET_CUR_USER = API + VERSION + USER_MANAGEMENT + CUR_USER_GET;
const URL_PUT_USER = API + VERSION + USER_MANAGEMENT + USER_PUT;
const URL_GET_ALL_REGIONS = API + VERSION + REGION_MANAGEMENT + ALL_REGIONS_GET;
const URL_CHECK_EMAIL_FREE = API + VERSION + USER_MANAGEMENT + EMAIL_FREE;
const URL_POST_COMMENT = API + VERSION + COMMENT_MANAGEMENT + COMMENT_POST;
const URL_GET_COMMENT_BY_TASK_ID = API + VERSION + COMMENT_MANAGEMENT + COMMENT_GET + "-by-task";
const URL_GET_SUBSCRIPTION_BY_TASK_USER_IDS = API + VERSION + SUBSCRIPTION_MANAGEMENT +
    "/subscription-get-by-task-user-ids";
const URL_DELETE_SUBSCRIPTION_BY_ID = API + VERSION + SUBSCRIPTION_MANAGEMENT +
    "/subscription-delete-by-id";
const URL_POST_SUBSCRIPTION = API + VERSION + SUBSCRIPTION_MANAGEMENT + "/subscription-post";
const URL_GET_MUNICIPALITIES = API + VERSION + MUNICIPALITY_MANAGEMENT + "/municipalities-get";
const URL_CHANGE_TASK_DEPUTY = API + VERSION + TASK_MANAGEMENT + "/change-deputy";
const URL_CHANGE_TASK_PRIORITY = API + VERSION + TASK_MANAGEMENT + "/change-priority";
const URL_CHANGE_TASK_STATUS = API + VERSION + TASK_MANAGEMENT + "/change-status";
const URL_GET_TASKS = API + VERSION + TASK_MANAGEMENT + "/tasks-get";
const URL_GET_FIRST_BY_BLOCKED = API + VERSION + TASK_MANAGEMENT + "/get-first-by-blocked";
const URL_GET_ORIGIN_BY_DUPLICATE = API + VERSION + TASK_MANAGEMENT + "/get-origin-by-duplicate";
const URL_POST_EMP = API + VERSION + USER_MANAGEMENT + "/post-emp";
const URL_POST_BLOCKED_TASKS = API + VERSION + TASK_MANAGEMENT + "/post-blocked";
const URL_POST_DUPLICATES_TASKS = API + VERSION + TASK_MANAGEMENT + "/post-duplicates";
const URL_GET_LINKED_TASKS = API + VERSION + TASK_MANAGEMENT + "/get-linked-tasks";
const URL_POST_LINKED_TASKS = API + VERSION + TASK_MANAGEMENT + "/post-linked";
const URL_GET_SUBSCRIPTIONS_BY_TASK_ID = API + VERSION + SUBSCRIPTION_MANAGEMENT + "/subscriptions-get-by-task-id";
const URL_GET_TASK_BY_CITY = API + VERSION + TASK_MANAGEMENT + TASK_GET + "-by-city/";
const URL_GENERATE_URL_CONFIRM_ACCOUNT = API + VERSION + USER_MANAGEMENT + "/generate-url-confirm-account";
const URL_CHECK_USER_ON_LOGOUT = API + VERSION + USER_MANAGEMENT + "/check-user-on-logout";