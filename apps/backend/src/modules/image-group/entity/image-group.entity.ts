import { EntityId } from '../../../shared/domain/entity-id.js';
import { Entity } from '../../../shared/domain/entity.js';
import { ImageVariant } from './image-variant.entity.js';

interface ImageGroupProps {
    name: string;
    variants: ImageVariant[];
}

export class ImageGroup extends Entity<ImageGroupProps> {
    private constructor(props: ImageGroupProps, id?: EntityId) {
        super(props, id);
    }

    public static create(props: ImageGroupProps, id?: EntityId): ImageGroup {
        return new ImageGroup(props, id);
    }

    public addVariant(variant: ImageVariant) {
        this.props.variants.push(variant);
    }

    public getVariant(name: string): ImageVariant | null {
        return this.props.variants.find(variant => variant.name === name) ?? null;
    }

    public deleteVariant(name: string) {
        const index = this.props.variants.findIndex(variant => variant.name === name);
        if (index === -1) {
            throw new Error('variant with given name not found.');
        }

        this.props.variants.splice(index, 1);
    }

    get name(): string {
        return this.props.name;
    }

    get variants(): ImageVariant[] {
        return [...this.props.variants];
    }
}