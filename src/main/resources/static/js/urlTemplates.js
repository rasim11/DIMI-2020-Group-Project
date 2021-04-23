const SERVER = "https://socialissuetracker.herokuapp.com";
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

const URL_GET_ALL_USER = SERVER + API + VERSION + USER_MANAGEMENT + ALL_USERS_GET;
const URL_GET_EMPLOYEES = SERVER + API + VERSION + USER_MANAGEMENT + "/get-employees-by-responsible-email";
const URL_GET_TASKS_BY_WORKER_ID = SERVER + API + VERSION + TASK_SOCIAL_WORKERS_MANAGEMENT +
    "/active-tasks-get-by-social-worker" + BY_ID;
const URL_DELETE_USER = SERVER + API + VERSION + USER_MANAGEMENT + USER_DELETE;
const URL_GET_ALL_ROLES = SERVER + API + VERSION + ROLE_MANAGEMENT + ALL_ROLES_GET;
const URL_GET_CUR_USER = SERVER + API + VERSION + USER_MANAGEMENT + CUR_USER_GET;
const URL_PUT_USER = SERVER + API + VERSION + USER_MANAGEMENT + USER_PUT;
const URL_GET_ALL_REGIONS = SERVER + API + VERSION + REGION_MANAGEMENT + ALL_REGIONS_GET;
const URL_CHECK_EMAIL_FREE = SERVER + API + VERSION + USER_MANAGEMENT + EMAIL_FREE;
const URL_POST_COMMENT = SERVER + API + VERSION + COMMENT_MANAGEMENT + COMMENT_POST;
const URL_POST_FEEDBACK = SERVER + API + VERSION + FEEDBACK_MANAGEMENT + FEEDBACK_POST;
const URL_GET_COMMENT_BY_TASK_ID = SERVER + API + VERSION + COMMENT_MANAGEMENT + COMMENT_GET + "-by-task";
const URL_GET_SUBSCRIPTION_BY_TASK_USER_IDS = SERVER + API + VERSION + SUBSCRIPTION_MANAGEMENT +
    "/subscription-get-by-task-user-ids";
const URL_DELETE_SUBSCRIPTION_BY_ID = SERVER + API + VERSION + SUBSCRIPTION_MANAGEMENT +
    "/subscription-delete-by-id";
const URL_POST_SUBSCRIPTION = SERVER + API + VERSION + SUBSCRIPTION_MANAGEMENT + "/subscription-post";
const URL_GET_MUNICIPALITIES = SERVER + API + VERSION + MUNICIPALITY_MANAGEMENT + "/municipalities-get";