export class ApiEndPoints {


    public static readonly BASE_URL: string = 'http://localhost:8080/';

    // the version to concat to all api calls
    public static readonly VERSION1: string = 'api/v1/';
    public static readonly VERSION2: string = 'api/v2/';

    // gets used in the http wrapper
    public static readonly TARGET_VERSION: string = ApiEndPoints.VERSION1;  

    public static readonly USER_CREATE: string = this.BASE_URL + this.TARGET_VERSION + 'signup';
    public static readonly USER_LOGIN: string = this.BASE_URL + this.TARGET_VERSION + 'auth/login';
    public static readonly USER_LOGOUT: string = this.BASE_URL + this.TARGET_VERSION + 'user/logout';
}