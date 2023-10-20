import { ValueObject } from '../../../shared/domain/value-object.js';
import { ValidationError } from '../../../shared/error/validation.error.js';

interface AcceptImageFormatProps {
    format: string;
}

export class AcceptImageFormat extends ValueObject<AcceptImageFormatProps> {
    private constructor(props: AcceptImageFormatProps) {
        super(props);
    }

    get format() {
        return this.props.format;
    }

    public static create(accept: unknown): AcceptImageFormat {
        if (typeof accept !== 'string') {
            throw new ValidationError('Accept header must be a string.');
        }

        let format = 'image/jpeg';
        if (accept === '*/*' || accept === 'images/*') {
            format = 'image/avif';
        } else if (accept.includes('avif')) {
            format = 'image/avif';
        } else if (accept.includes('webp')) {
            format = 'image/webp';
        }

        return new AcceptImageFormat({ format });
    }
}
