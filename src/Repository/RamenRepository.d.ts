import { RamenModel } from "../Model/RamenModel";
export declare class RamenRepository {
    model: RamenModel;
    constructor(model?: RamenModel);
    setModel(model: RamenModel): RamenRepository;
    getModel(): RamenModel;
    createModel(): typeof RamenModel;
    getItem(value: string): Promise<any>;
    getCollection(parameters: any): Promise<any>;
    postItem(parameter: object): Promise<any>;
    postCollection(parameters: Array<object>): Promise<any>;
    putItem(value: string, parameter: object): Promise<any>;
    deleteItem(id: string): Promise<void>;
}
