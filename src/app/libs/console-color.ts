// a class I created to make my console logs colorfied 
export class ConsoleColor{
   
    // this is how you use this class
    // %c to use it
    // console.log("%c You text here", ConsoleColor.RED)
    public static readonly RED: string = 'color: white; background: red';
    public static readonly GREEN: string = 'color: white; background: green;';
    public static readonly YELLOW: string = 'color: black; background: yellow;';
}