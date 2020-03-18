import { RamenModel } from '../Model/RamenModel';
import { RamenTransformerInterface } from '../Transformer/RamenTransformerGenerator';
export declare class RamenResponse {
    response: any;
    request: any;
    status: number;
    transformer: RamenTransformerInterface;
    manager: any;
    meta: object;
    constructor(response?: any, request?: any);
    setResponse(response: any): RamenResponse;
    getResponse(): any;
    setRequest(request: any): RamenResponse;
    getRequest(): RamenResponse;
    setTransformers(transformer: any): RamenResponse;
    getTransformers(): RamenTransformerInterface;
    setManager(manager: any): RamenResponse;
    getManager(): any;
    item(item: RamenModel | null, relations: string): Promise<object>;
    rawItem(item: object, relations?: string, transformer?: any): Promise<object>;
    setStatus(status: number): RamenResponse;
    getStatus(): number;
    collection(items: Array<any>, relations?: string): Promise<object>;
    rawCollection(items: Array<object>, relations?: string, transformer?: any): Promise<object>;
    setMeta(item: object): RamenResponse;
    getMeta(): object;
}
