import { Types } from 'mongoose';

export class EntityId {
    private id: Types.ObjectId;

    constructor(id?: Types.ObjectId) {
        this.id = id ?? new Types.ObjectId();
    }

    get _id() {
        return this.id;
    }
}