export type CustomLog = {
    input?: any;
    output?: unknown;
    error?: unknown;
    function: string;
    message?: string;
};
export declare class AppLogger {
    private readonly contextName;
    constructor(context: string);
    customLog(info: CustomLog): void;
}
export declare function LogActivity(): MethodDecorator;
