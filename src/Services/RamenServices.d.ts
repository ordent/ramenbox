import RamenResponse from "../Lifecycle/RamenResponse";
import RamenRepository from "../Repository/RamenRepository";
import { RamenValidatorInterface } from "../Validator/RamenValidatorGenerator";
export interface RamenServicesInterface {
    repository: RamenRepository;
    validator: any;
    properties: any;
    filter: object;
    sanity: object;
    response: RamenResponse;
    configurations: object;
    services: Array<object>;
}
export declare class RamenServices implements RamenServicesInterface {
    repository: RamenRepository;
    validator: any;
    properties: any;
    filter: object;
    sanity: object;
    response: RamenResponse;
    configurations: object;
    services: Array<object>;
    validation: object | null;
    constructor(item: any);
    setRepository(repository: RamenRepository): RamenServices;
    getRepository(): RamenRepository;
    setFilter(filter?: object): RamenServices;
    getFilter(): object;
    setSanity(sanity?: object): RamenServices;
    getSanity(): object;
    setResponse(response?: RamenResponse | any): void;
    getResponse(): RamenResponse;
    setValidator(validator: RamenValidatorInterface): void;
    getValidator(): any;
    setConfigurations(configurations?: object): this;
    getConfigurations(): object;
    setServices(services?: any[]): this;
    getServices(): object[];
    appendServices(services: Array<object> | object): RamenServices;
    appendConfigurations(configurations: object): this;
    resolveServices(entity: any): any;
    fillProperties(items: any): Promise<any>;
    validate(value: object, type: string): Promise<this>;
    sanitize(value: object, type: string): Promise<any>;
    getItemHook(position: any, ...arg: any[]): Promise<void>;
    getCollectionHook(position: any, ...arg: any[]): Promise<void>;
    postItemHook(position: any, ...arg: any[]): Promise<void>;
    putItemHook(position: any, ...arg: any[]): Promise<void>;
    deleteItemHook(position: any, ...arg: any[]): Promise<void>;
    getItem(value: string, request: any): Promise<any>;
    getCollection(request: any): Promise<any>;
    postItem(request: any): Promise<any>;
    postCollection(request: any): Promise<any>;
    putItem(value: string, request: any): Promise<any>;
    deleteItem(value: string): Promise<void>;
}