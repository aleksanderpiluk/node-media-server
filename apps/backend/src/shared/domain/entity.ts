import { EntityId } from './entity-id.js';

export abstract class Entity<T> {
    protected readonly _id: EntityId;
    public readonly props: T;

    constructor(props: T, id?: EntityId) {
        this.props = props;
        this._id = id ?? new EntityId();
    }

    get id(): EntityId {
        return this._id;
    }
}