import { Guard } from '../../../shared/core/guard.js';
import { ValueObject } from '../../../shared/domain/value-object.js';
import { ValidationError } from '../../../shared/error/validation.error.js';

interface GroupNameProps {
    value: string;
}

export class GroupName extends ValueObject<GroupNameProps> {
    private constructor(props: GroupNameProps) {
        super(props);
    }

    public get value() {
        return this.props.value;
    }

    public static create(value: unknown): GroupName {
        if (!Guard.againstNullOrUndefined(value)) {
            throw new ValidationError('GroupName is null or undefied.');
        }

        if (!Guard.ensureString(value)) {
            throw new ValidationError('GroupName must be a string');
        }

        if (value.length <= 0 || value.length > 256) {
            throw new ValidationError('GroupName must have length in range [1-256].');
        }

        return new GroupName({
            value,
        });
    }
}
