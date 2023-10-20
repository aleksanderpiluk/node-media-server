import { Guard } from '../../../shared/core/guard.js';
import { ValueObject } from '../../../shared/domain/value-object.js';
import { ValidationError } from '../../../shared/error/validation.error.js';

interface VariantNameProps {
    value: string;
}

export class VariantName extends ValueObject<VariantNameProps> {
    private constructor(props: VariantNameProps) {
        super(props);
    }

    public get value() {
        return this.props.value;
    }

    public static create(value: unknown): VariantName {
        if (!Guard.againstNullOrUndefined(value)) {
            throw new ValidationError('VariantName is null or undefied.');
        }

        if (!Guard.ensureString(value)) {
            throw new ValidationError('VariantName must be a string.');
        }

        if (value.length <= 0 || value.length > 256) {
            throw new ValidationError('VariantName must have length in range [1-256].');
        }

        return new VariantName({
            value,
        });
    }
}
