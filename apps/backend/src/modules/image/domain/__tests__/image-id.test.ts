import { ValidationError } from '../../../../shared/error/validation.error.js';
import { ImageId } from '../image-id.js';

describe('ImageId', () => {
    test('create() method should throw ValidationError when given value is not a string.', () => {
        const t1 = () => ImageId.create(null);
        const t2 = () => ImageId.create(undefined);
        const t3 = () => ImageId.create(111);
        const t4 = () => ImageId.create({});

        expect(t1).toThrow(ValidationError);
        expect(t2).toThrow(ValidationError);
        expect(t3).toThrow(ValidationError);
        expect(t4).toThrow(ValidationError);
    });

    test('create() method should return ImageId instance.', () => {
        const imageId = ImageId.create('some-id');

        expect(imageId).toBeInstanceOf(ImageId);
    });

    test('value getter should return correct value.', () => {
        const imageId = ImageId.create('some-id');

        expect(imageId.value).toEqual('some-id');
    });
});
