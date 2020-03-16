import { RamenException } from './RamenException';
import { RamenExceptionInterface } from './RamenException';
export declare class UnprocessableEntityException extends RamenException implements RamenExceptionInterface {
    /**
     * Handle this exception by itself
     */
    handle(error: any, { response }: any): void;
}
