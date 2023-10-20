import { ObjectId } from 'mongodb';
import { ImageVariant } from '../../entity/image-variant.entity.js';
import { ImageVariantMapper } from '../image-variant.mapper.js';

describe('ImageVariantMapper', () => {
    test('toDto should return correct dto object from ImageVariant instance.', () => {
        const variant = ImageVariant.create({
            name: 'test-variant',
            fit: 'cover',
            width: 10,
            height: -1,
        });

        const dto = ImageVariantMapper.toDto(variant);

        expect(dto).toEqual({
            name: 'test-variant',
            fit: 'cover',
            width: 10,
            height: -1,
        });
    });

    test('toPersistance should return correct dao object from ImageGroup instance.', () => {
        const variant = ImageVariant.create({
            name: 'test-variant',
            fit: 'cover',
            width: 10,
            height: -1,
        });

        const dao = ImageVariantMapper.toPersistence(variant);

        expect(dao).toMatchObject({
            name: 'test-variant',
            fit: 'cover',
            width: 10,
            height: -1,
        });
    });

    test('toDomain should return correct ImageGroup instance from raw data.', () => {
        const id = new ObjectId();
        const data = {
            name: 'test-variant',
            fit: 'cover',
            width: 10,
            height: -1,
            _id: id,
        };

        const variant = ImageVariantMapper.toDomain(data);
        expect(variant).toBeInstanceOf(ImageVariant);
        expect(variant.id._id).toBe(id);
        expect(variant.fit).toEqual('cover');
        expect(variant.width).toEqual(10);
        expect(variant.height).toEqual(-1);
        expect(variant.name).toEqual('test-variant');
    });
});
