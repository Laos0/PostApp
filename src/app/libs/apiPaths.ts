export class ApiEndPoints {

    // the version to concat to all api calls
    public static readonly VERSION1: string = 'api/v1/';
    public static readonly VERSION2: string = 'api/v2/';

    // gets used in the http wrapper
    public static readonly TARGET_VERSION: string = ApiEndPoints.VERSION1;  

    public static readonly USER_CREATE: string = this.TARGET_VERSION + 'signup';
    public static readonly USER_LOGIN: string = this.TARGET_VERSION + 'authenticate';
    public static readonly USER_LOGOUT: string = this.TARGET_VERSION + 'user/logout';
}