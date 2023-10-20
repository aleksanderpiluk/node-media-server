import { Guard } from '../../../shared/core/guard.js';
import { ValueObject } from '../../../shared/domain/value-object.js';
import { ValidationError } from '../../../shared/error/validation.error.js';
import { ImageVariantFit } from '../types/image-variant-fit.js';

interface VariantFitProps {
    value: ImageVariantFit;
}

export class VariantFit extends ValueObject<VariantFitProps> {
    private constructor(props: VariantFitProps) {
        super(props);
    }

    public get value() {
        return this.props.value;
    }

    public static create(value: unknown): VariantFit {
        if (!Guard.ensureString(value)) {
            throw new ValidationError('VariantFit must be a string.');
        }

        if (!this.ensureAcceptedValue(value)) {
            throw new ValidationError('VariantFit must be one of possible fit options.');
        }

        return new VariantFit({
            value,
        });
    }

    private static ensureAcceptedValue(value: string): value is ImageVariantFit {
        const accepted = ['cover', 'contain', 'fill', 'inside', 'outside'];
        return accepted.includes(value);
    }
}
