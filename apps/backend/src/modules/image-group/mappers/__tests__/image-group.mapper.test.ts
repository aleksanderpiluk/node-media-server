import { ObjectId } from 'mongodb';
import { ImageGroup } from '../../entity/image-group.entity.js';
import { ImageVariant } from '../../entity/image-variant.entity.js';
import { ImageGroupMapper } from '../image-group.mapper.js';

describe('ImageGroupMapper', () => {
    test('toDto should return correct dto object from ImageGroup instance.', () => {
        const imageGroup = ImageGroup.create({
            name: 'test name',
            variants: [
                ImageVariant.create({
                    name: 'test-variant',
                    fit: 'cover',
                    width: 10,
                    height: -1,
                }),
            ],
        });

        const dto = ImageGroupMapper.toDto(imageGroup);

        expect(dto).toEqual({
            id: imageGroup.id._id.toString(),
            name: 'test name',
            variants: ['test-variant'],
        });
    });

    test('toPersistance should return correct dao object from ImageGroup instance.', () => {
        const variant = ImageVariant.create({
            name: 'test-variant',
            fit: 'cover',
            width: 10,
            height: -1,
        });

        const imageGroup = ImageGroup.create({
            name: 'test name',
            variants: [variant],
        });

        const dao = ImageGroupMapper.toPersistence(imageGroup);

        expect(dao).toMatchObject({
            name: 'test name',
            variants: [
                {
                    name: 'test-variant',
                    width: 10,
                    height: -1,
                    fit: 'cover',
                },
            ],
        });
    });

    test('toDomain should return correct ImageGroup instance from raw data.', () => {
        const id = new ObjectId();
        const data = {
            name: 'test name',
            _id: id,
            variants: [
                {
                    name: 'test-variant',
                    width: 10,
                    height: -1,
                    fit: 'cover',
                    _id: new ObjectId(),
                },
            ],
        };

        const imageGroup = ImageGroupMapper.toDomain(data);
        expect(imageGroup).toBeInstanceOf(ImageGroup);
        expect(imageGroup.id._id).toBe(id);
        expect(imageGroup.name).toEqual('test name');
        expect(imageGroup.variants.length).toEqual(1);
        expect(imageGroup.variants[0].fit).toEqual('cover');
        expect(imageGroup.variants[0].width).toEqual(10);
        expect(imageGroup.variants[0].height).toEqual(-1);
        expect(imageGroup.variants[0].name).toEqual('test-variant');
    });
});
