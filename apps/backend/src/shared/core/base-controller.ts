import { FastifyReply, FastifyRequest } from 'fastify';
import { ValidationError } from '../error/validation.error.js';
import { NotFoundError } from '../error/not-found.error.js';
import { Guard } from './guard.js';

export class BaseController {
    /**
     * Basic request params parsing.
     * Ensures that params are object and returns it.
     */
    parseParams(request: FastifyRequest) {
        if (!Guard.ensureObject(request.params)) {
            throw new ValidationError('Invalid request params variable.');
        }

        return request.params;
    }

    /**
     * Basic error handler with fallback to HTTP status 500.
     */
    handleError(reply: FastifyReply, err: unknown) {
        if (err instanceof ValidationError) {
            return this.clientError(reply, err);
        } else if (err instanceof NotFoundError) {
            return this.notFound(reply, err);
        } else {
            return this.fail(reply, err);
        }
    }

    /**
     * Send successful reply. HTTP 200
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ok(reply: FastifyReply, result?: Record<string, any>) {
        reply.status(200).send(
            result !== undefined
                ? {
                      success: true,
                      result,
                  }
                : {
                      success: true,
                  }
        );
    }

    /**
     * Send successful created reply. HTTP 201
     */
    created(reply: FastifyReply) {
        reply.status(201);
    }

    /**
     * Send client error reply. HTTP 400
     */
    clientError(reply: FastifyReply, err: unknown) {
        reply.status(400).send({
            success: false,
            error: String(err),
        });
    }

    /**
     * Send not found reply. HTTP 404
     */
    notFound(reply: FastifyReply, err?: unknown) {
        reply.status(404).send({
            success: false,
            error: err ? String(err) : 'Not found',
        });
    }

    /**
     * Send internal server error reply. HTTP 500
     */
    fail(reply: FastifyReply, err: unknown) {
        reply.status(500).send({
            success: false,
            error: String(err),
        });
    }
}
