import { EntityId } from '../../../../shared/domain/entity-id.js';
import { ImageVariant } from '../image-variant.entity.js';

describe('ImageVariant', () => {
    test('create() method should return ImageVariant instance.', () => {
        const id = new EntityId();
        const props = {
            fit: 'fill',
            height: 10,
            width: 2,
            name: 'test-variant-name',
        } as const;
        const imageVariant = ImageVariant.create(props, id);

        expect(imageVariant).toBeInstanceOf(ImageVariant);
        expect(imageVariant.id).toBe(id);
        expect(imageVariant.props).toEqual(props);
    });

    test('getters should return correct values.', () => {
        const id = new EntityId();
        const imageVariant = ImageVariant.create(
            {
                fit: 'inside',
                height: 5,
                width: 7,
                name: 'test',
            },
            id
        );

        expect(imageVariant.fit).toEqual('inside');
        expect(imageVariant.name).toEqual('test');
        expect(imageVariant.width).toEqual(7);
        expect(imageVariant.height).toEqual(5);
    });
});
