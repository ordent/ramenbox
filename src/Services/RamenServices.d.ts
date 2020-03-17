import { RamenResponse } from "../Lifecycle/RamenResponse";
import { RamenRepository } from "../Repository/RamenRepository";
import { RamenValidatorInterface } from "../Validator/RamenValidatorGenerator";
import { SobaServices } from "./SobaServices";
export declare class RamenServices {
    repository: RamenRepository;
    validator: RamenValidatorInterface;
    properties: any;
    filter: object;
    sanity: object;
    response: RamenResponse;
    configurations: object;
    services: Array<SobaServices>;
    validation: any;
    constructor(item: any);
    setRepository(repository: RamenRepository): RamenServices;
    getRepository(): RamenRepository;
    setFilter(filter?: object): RamenServices;
    getFilter(): object;
    setSanity(sanity?: object): RamenServices;
    getSanity(): object;
    setResponse(response?: RamenResponse | any): RamenServices;
    getResponse(): RamenResponse;
    setValidator(validator: RamenValidatorInterface): RamenServices;
    getValidator(): RamenValidatorInterface;
    setConfigurations(configurations?: object): RamenServices;
    getConfigurations(): object;
    setServices(services?: any[]): RamenServices;
    getServices(): Array<SobaServices>;
    appendServices(services: Array<SobaServices> | SobaServices): RamenServices;
    appendConfigurations(configurations: object): RamenServices;
    resolveServices(entity: any): SobaServices;
    fillProperties(items: any): Promise<any>;
    validate(value: object, type: string): Promise<any>;
    sanitize(value: object, type: string): Promise<object>;
    getItemHook(position: string, ...arg: any): Promise<void>;
    getCollectionHook(position: string, ...arg: any): Promise<void>;
    postItemHook(position: string, ...arg: any): Promise<void>;
    putItemHook(position: string, ...arg: any): Promise<void>;
    deleteItemHook(position: string, ...arg: any): Promise<void>;
    getItem(value: string, request: any): Promise<object>;
    getCollection(request: any): Promise<object>;
    postItem(request: any): Promise<object>;
    postCollection(request: any): Promise<object>;
    putItem(value: string, request: any): Promise<object>;
    deleteItem(value: string): Promise<void>;
}
