declare const GE: any;
export interface RamenResponseStatus {
    (arg0: number): any;
}
export interface Meta {
    message: string | Object;
    status: number;
    code: string;
    stack: Array<Object>;
}
export interface Result {
    data: Array<Object> | Object | null;
    meta: Meta;
}
export interface RamenExceptionInterface {
    wrapper: Function;
    handle: Function;
}
export interface RamenExceptionError {
    message: any;
}
export declare class RamenException extends GE.LogicalException {
    constructor(item: any);
    wrapper(response: any, status: number, message: any, stack?: Array<Object>, code?: string): void;
}
export {};
