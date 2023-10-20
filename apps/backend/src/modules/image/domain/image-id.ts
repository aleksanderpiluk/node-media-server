import { Guard } from '../../../shared/core/guard.js';
import { ValueObject } from '../../../shared/domain/value-object.js';
import { ValidationError } from '../../../shared/error/validation.error.js';

interface ImageIdProps {
    value: string;
}

export class ImageId extends ValueObject<ImageIdProps> {
    private constructor(props: ImageIdProps) {
        super(props);
    }

    public get value() {
        return this.props.value;
    }

    public static create(value: unknown): ImageId {
        if (!Guard.ensureString(value)) {
            throw new ValidationError('ImageId must be a string');
        }

        return new ImageId({
            value,
        });
    }
}
