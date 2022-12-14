export class ApiEndPoints {


    // HEROKU hosting
    //public static readonly BASE_URL: string = 'https://nodejs-post-app-server.herokuapp.com/';

    // AWS backend server hosting
    //public static readonly BASE_URL: string = '';

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

    // TODO: Need to update bottom apis so they are not redundant

    // for deleting: http://localhost:8080/posts/ + id + 'delete'
    public static readonly DELETE_POST: string = this.BASE_URL + this.TARGET_VERSION + 'posts/';

    public static readonly EDIT_POST: string = this.BASE_URL + this.TARGET_VERSION + 'posts/';

    // for deleting: http://localhost:8080/posts/ + id + '/comment';
    public static readonly GET_COMMENTS: string = this.BASE_URL + this.TARGET_VERSION + 'posts/';

    // for commenting: http://localhost:8080/posts/ + postId + '/comments/new';
    public static readonly ADD_COMMENT: string = this.BASE_URL + this.TARGET_VERSION + 'posts/';

}