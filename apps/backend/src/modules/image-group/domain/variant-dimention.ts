import { Guard } from '../../../shared/core/guard.js';
import { ValueObject } from '../../../shared/domain/value-object.js';
import { ValidationError } from '../../../shared/error/validation.error.js';

interface VariantDimentionProps {
    value: number;
}

export class VariantDimention extends ValueObject<VariantDimentionProps> {
    private constructor(props: VariantDimentionProps) {
        super(props);
    }

    public get value() {
        return this.props.value;
    }

    public static create(value: unknown): VariantDimention {
        if (!Guard.ensureInteger(value)) {
            throw new ValidationError('VariantDimention must be an integer number.');
        }

        if (value < -1 || value === 0) {
            throw new ValidationError('VariantDimention must be positive integer or -1');
        }

        return new VariantDimention({
            value,
        });
    }
}
