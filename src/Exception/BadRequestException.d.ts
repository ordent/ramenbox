import { RamenException } from './RamenException';
import { RamenExceptionInterface, RamenExceptionError } from './RamenException';
export declare class BadRequestException extends RamenException implements RamenExceptionInterface {
    /**
     * Handle this exception by itself
     */
    handle(error: RamenExceptionError, { response }: any): void;
}