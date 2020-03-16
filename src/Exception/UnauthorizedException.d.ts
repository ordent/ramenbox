import { RamenException } from './RamenException';
import { RamenExceptionInterface, RamenExceptionError } from './RamenException';
export declare class UnauthorizedException extends RamenException implements RamenExceptionInterface {
    /**
     * Handle this exception by itself
     */
    handle(error: RamenExceptionError, { response }: any): void;
}
