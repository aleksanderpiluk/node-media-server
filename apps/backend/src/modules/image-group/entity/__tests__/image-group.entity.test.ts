import { EntityId } from '../../../../shared/domain/entity-id.js';
import { ImageGroup } from '../image-group.entity.js';
import { ImageVariant } from '../image-variant.entity.js';

describe('ImageGroup', () => {
    test('create() method should return ImageVariant instance.', () => {
        const variant = ImageVariant.create({
            name: 'variant',
            fit: 'cover',
            width: 1,
            height: 1,
        });

        const id = new EntityId();
        const props = {
            name: 'test-group',
            variants: [variant],
        };

        const group = ImageGroup.create(props, id);

        expect(group).toBeInstanceOf(ImageGroup);
        expect(group.id).toBe(id);
        expect(group.props).toEqual(props);
    });

    test('getters should return correct values.', () => {
        const variant = ImageVariant.create({
            name: 'variant',
            fit: 'cover',
            width: 1,
            height: 1,
        });

        const id = new EntityId();
        const props = {
            name: 'test-group',
            variants: [variant],
        };

        const group = ImageGroup.create(props, id);

        expect(group.name).toEqual('test-group');
        expect(Array.isArray(group.variants)).toEqual(true);
        expect(group.variants.length).toEqual(1);
        expect(group.variants[0]).toBe(variant);
    });

    test('getVariant() should return correct value.', () => {
        const variant = ImageVariant.create({
            name: 'variant',
            fit: 'cover',
            width: 1,
            height: 1,
        });

        const id = new EntityId();
        const props = {
            name: 'test-group',
            variants: [variant],
        };

        const group = ImageGroup.create(props, id);

        expect(group.getVariant('variant')).toBe(variant);
    });

    test('addVariant() should add entity.', () => {
        const variant = ImageVariant.create({
            name: 'variant',
            fit: 'cover',
            width: 1,
            height: 1,
        });

        const id = new EntityId();
        const props = {
            name: 'test-group',
            variants: [],
        };

        const group = ImageGroup.create(props, id);

        expect(group.variants.length).toEqual(0);

        group.addVariant(variant);

        expect(group.variants.length).toEqual(1);
        expect(group.variants[0]).toBe(variant);
    });

    test('deleteVariant() should remove variant correctly.', () => {
        const variant = ImageVariant.create({
            name: 'variant',
            fit: 'cover',
            width: 1,
            height: 1,
        });

        const id = new EntityId();
        const props = {
            name: 'test-group',
            variants: [variant],
        };

        const group = ImageGroup.create(props, id);

        expect(group.variants.length).toEqual(1);
        expect(group.variants[0]).toBe(variant);

        group.deleteVariant('variant');

        expect(group.variants.length).toEqual(0);
    });
});
