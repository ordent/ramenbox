declare const TransformerAbstract: any;
import { RamenModel } from '../Model/RamenModel';
export declare class RamenTransformer extends TransformerAbstract {
}
export declare const RamenTransformerGenerator: (m: RamenModel, n?: string[]) => {
    new (): {
        [x: string]: any;
        transform(model: RamenModel): object;
    };
    [x: string]: any;
    readonly defaultInclude: string[];
    readonly availableInclude: string[];
};
export {};
