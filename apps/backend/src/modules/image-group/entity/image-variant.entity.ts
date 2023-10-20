import { EntityId } from '../../../shared/domain/entity-id.js';
import { Entity } from '../../../shared/domain/entity.js';
import { ImageVariantFit } from '../types/image-variant-fit.js';

interface ImageVariantProps {
    name: string;
    width: number;
    height: number;
    fit: ImageVariantFit;
}

export class ImageVariant extends Entity<ImageVariantProps> {
    private constructor(props: ImageVariantProps, id?: EntityId) {
        super(props, id);
    }

    public static create(props: ImageVariantProps, id?: EntityId): ImageVariant {
        return new ImageVariant(props, id);
    }

    get name(): string {
        return this.props.name;
    }

    get width(): number {
        return this.props.width;
    }

    get height(): number {
        return this.props.height;
    }

    get fit(): ImageVariantFit {
        return this.props.fit;
    }
}
