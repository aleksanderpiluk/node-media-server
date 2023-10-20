// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ValueObjectProps = Record<string, any>;

export abstract class ValueObject<T extends ValueObjectProps> {
    public props: T;

    constructor(props: T) {
        this.props = {
            ...props,
        };
    }
}