export class ApiEndPoints {


    public static readonly BASE_URL: string = 'http://localhost:8080/';

    // the version to concat to all api calls
    public static readonly VERSION1: string = 'api/v1/';
    public static readonly VERSION2: string = 'api/v2/';

    // gets used in the http wrapper
    public static readonly TARGET_VERSION: string = ApiEndPoints.VERSION1;  

    public static readonly USER_CREATE: string = this.BASE_URL + this.TARGET_VERSION + 'users/new';
    public static readonly USER_LOGIN: string = this.BASE_URL + this.TARGET_VERSION + 'auth/login';
    public static readonly USER_LOGOUT: string = this.BASE_URL + this.TARGET_VERSION + 'user/logout';
    public static readonly GET_USER: string = this.BASE_URL + this.TARGET_VERSION + 'users/';

    public static readonly USER_CREATE_POST: string = this.BASE_URL + this.TARGET_VERSION + 'posts/new';
    public static readonly GET_POSTS: string = this.BASE_URL + this.TARGET_VERSION + 'posts/all';
    public static readonly POST_ADD_VIEW_COUNT: string = this.BASE_URL + this.TARGET_VERSION + 'posts/id/addViews';

    // for deleting: http://localhost:8080/posts/ + id + 'delete'
    public static readonly DELETE_POST: string = this.BASE_URL + this.TARGET_VERSION + 'posts/';

}