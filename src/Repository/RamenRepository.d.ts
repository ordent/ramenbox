import { RamenModel } from "../Model/RamenModel";
interface collectionParameter {
    page: number | string;
    limit: number | string;
}
export declare class RamenRepository {
    model: RamenModel;
    constructor(model?: RamenModel);
    setModel(model: RamenModel): RamenRepository;
    getModel(): RamenModel;
    createModel(): typeof RamenModel;
    getItem(value: string): Promise<any>;
    getCollection(parameters: collectionParameter): Promise<any>;
    postItem(parameter: collectionParameter): Promise<any>;
    postCollection(parameters: Array<collectionParameter>): Promise<any>;
    putItem(value: string, parameter: collectionParameter): Promise<any>;
    deleteItem(id: string): Promise<void>;
}
export {};
