import { RamenModel } from '../Model/RamenModel';
export declare class RamenResponse {
    response: any;
    request: any;
    status: number;
    transformer: any;
    manager: any;
    meta: object;
    constructor(response?: any, request?: any);
    setResponse(response: any): RamenResponse;
    getResponse(): any;
    setRequest(request: any): RamenResponse;
    getRequest(): RamenResponse;
    setTransformers(transformer: any): RamenResponse;
    getTransformers(): any;
    setManager(manager: any): RamenResponse;
    getManager(): any;
    item(item: RamenModel | null, relations: string): Promise<any>;
    setStatus(status: number): RamenResponse;
    getStatus(): number;
    collection(items: Array<any>, relations?: string): Promise<any>;
    setMeta(item: object): this;
    getMeta(): object;
}
