import { Guard } from '../../../shared/core/guard.js';
import { ValueObject } from '../../../shared/domain/value-object.js';
import { ValidationError } from '../../../shared/error/validation.error.js';

interface GroupIdProps {
    value: string;
}

export class GroupId extends ValueObject<GroupIdProps> {
    private constructor(props: GroupIdProps) {
        super(props);
    }

    public get value() {
        return this.props.value;
    }

    public static create(value: unknown): GroupId {
        if (!Guard.ensureString(value)) {
            throw new ValidationError('GroupId must be a string');
        }

        return new GroupId({
            value,
        });
    }
}
