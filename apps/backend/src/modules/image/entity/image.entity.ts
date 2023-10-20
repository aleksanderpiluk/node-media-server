import { EntityId } from '../../../shared/domain/entity-id.js';
import { Entity } from '../../../shared/domain/entity.js';

interface ImageProps {
    group: string;
    blob: string;
    uploaded: Date;
}

export class Image extends Entity<ImageProps> {
    private constructor(props: ImageProps, id?: EntityId) {
        super(props, id);
    }

    static create(props: ImageProps, id?: EntityId) {
        return new Image(props, id);
    }

    get group() {
        return this.props.group;
    }

    get blob() {
        return this.props.blob;
    }

    get uploaded() {
        return this.props.uploaded;
    }
}