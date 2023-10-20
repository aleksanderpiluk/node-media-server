import { pino } from 'pino';

export class Logger {
    private logger;
    constructor(name: string) {
        this.logger = pino({
            msgPrefix: `[${name}] `,
        });
    }

    public info<T>(obj: T, msg?: string | undefined, ...args: unknown[]) {
        this.logger.info(obj, msg, ...args);
    }

    public error<T>(obj: T, msg?: string | undefined, ...args: unknown[]) {
        this.logger.error(obj, msg, ...args);
    }

    public warn<T>(obj: T, msg?: string | undefined, ...args: unknown[]) {
        this.logger.warn(obj, msg, ...args);
    }

    public debug<T>(obj: T, msg?: string | undefined, ...args: unknown[]) {
        this.logger.debug(obj, msg, ...args);
    }

    public fatal<T>(obj: T, msg?: string | undefined, ...args: unknown[]) {
        this.logger.fatal(obj, msg, ...args);
    }

    public trace<T>(obj: T, msg?: string | undefined, ...args: unknown[]) {
        this.logger.trace(obj, msg, ...args);
    }

    public silent<T>(obj: T, msg?: string | undefined, ...args: unknown[]) {
        this.logger.silent(obj, msg, ...args);
    }

    public get level() {
        return this.logger.level;
    }

    public set level(value: string) {
        this.logger.level = value;
    }

    public child() {
        return this.logger.child({});
    }
}
