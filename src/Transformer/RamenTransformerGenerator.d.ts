import { RamenModel } from '../Model/RamenModel';
export interface RamenTransformerInterface {
    transform: object;
}
export declare const RamenTransformerGenerator: (m: RamenModel, n?: string[]) => any;
