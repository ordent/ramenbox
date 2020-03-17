import { RamenServices } from "../Services/RamenServices";
import { RamenModel } from "../Model/RamenModel";
export declare class RamenController {
    services: RamenServices | null;
    constructor(item: any);
    getServices(): RamenServices | null;
    setServices(item: RamenServices | RamenModel): void;
    index({ request, response, transform }: {
        request: any;
        response: any;
        transform: any;
    }): Promise<any>;
    show({ request, response, transform }: {
        request: any;
        response: any;
        transform: any;
    }): Promise<any>;
    store({ request, response, transform }: {
        request: any;
        response: any;
        transform: any;
    }): Promise<any>;
    update({ request, response, transform }: {
        request: any;
        response: any;
        transform: any;
    }): Promise<any>;
    delete({ request, response, transform }: {
        request: any;
        response: any;
        transform: any;
    }): Promise<void>;
}
