export class Guard {
    public static againstNullOrUndefined<T>(value: T | null | undefined): value is T {
        if (value === undefined || value === null) return false;
        return true;
    }

    public static ensureObject(value: unknown): value is Record<string, unknown> {
        if (!value || typeof value !== 'object') return false;
        return true;
    }

    public static ensureString(value: unknown): value is string {
        if (typeof value !== 'string') return false;
        return true;
    }

    public static ensureInteger(value: unknown): value is number {
        if (typeof value !== 'number' || !Number.isInteger(value)) return false;
        return true;
    }

    public static ensureWithArrayOfStrings<T extends readonly string[]>(value: unknown, array: T): value is T[number] {
        if (!array.includes(value as T[number])) return false;
        else return true;
    }
}