export interface RamenValidatorInterface {
    sanitize: Function;
    validate: Function;
}
export declare const RamenValidatorGenerator: (base: any) => {
    new(): {
        sanitize(value: object, type: string): Promise<object>;
        validate(value: object, type: string): Promise<any>;
    };
};
