/**
 * Abstract error type used to create custom errors.
 */
abstract class AegisServerError extends Error {
  readonly source: Error;

  protected constructor(cause: Error, message?: string) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this, Error);
    this.name = this.constructor.name;
    this.source = cause;
  }
}

/**
 * ServerBootstrapError occurs when there is a failure during the bootstrap process.
 * Throwing this error should completely stop the server from starting.
 */
export class ServerBootstrapError extends AegisServerError {
  constructor(source: Error, message?: string) {
    super(source, message);
    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this, ServerBootstrapError);
    this.message = message ?? "Unknown or unexpected error";
    this.name = this.constructor.name;
  }
}
