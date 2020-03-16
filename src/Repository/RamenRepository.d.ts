import { RamenException } from "../Exception";
import { RamenModel } from "../Model/RamenModel";
interface collectionParameter {
    page: number | string;
    limit: number | string;
}
interface collectionResult {
    success: Array<typeof RamenModel>;
    failed: Array<collectionParameter>;
    error: Array<RamenException>;
}
export default class RamenRepository {
    model: RamenModel;
    constructor(model?: RamenModel);
    setModel(model: RamenModel): RamenRepository;
    getModel(): RamenModel;
    createModel(): typeof RamenModel;
    getItem(value: string): Promise<any>;
    getCollection(parameters: collectionParameter): Promise<any>;
    postItem(parameter: collectionParameter): Promise<any>;
    postCollection(parameters: Array<collectionParameter>): Promise<collectionResult>;
    putItem(value: string, parameter: collectionParameter): Promise<any>;
    deleteItem(id: string): Promise<void>;
}
export {};
