declare const Model: any;
export declare class RamenModel extends Model {
    constructor();
    static boot(): void;
    static get slug(): string | null;
    static get properties(): Array<string>;
    static get files(): object;
    static get rules(): object;
    static get relations(): Array<object>;
    static get transformers(): {
        new (): {
            [x: string]: any;
            transform(model: RamenModel): object;
        };
        [x: string]: any;
        readonly defaultInclude: string[];
        readonly availableInclude: string[];
    };
    static get getIncludeRelations(): Array<string>;
    static get getAvailableInclude(): Array<string>;
    static get getDefaultInclude(): Array<string>;
}
export {};
