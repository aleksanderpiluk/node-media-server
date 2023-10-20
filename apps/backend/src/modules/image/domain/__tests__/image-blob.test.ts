import { Readable } from 'stream';
import { ImageBlob } from '../image-blob.js';
import { ValidationError } from '../../../../shared/error/validation.error.js';

describe('ImageBlob', () => {
    describe('create() method', () => {
        test('should throw ValidationError when MIME type is not supported.', () => {
            const file = new Readable();
            const t1 = () => ImageBlob.create({ file, mimetype: '' });
            const t2 = () => ImageBlob.create({ file, mimetype: 'some invalid TYPE/' });
            const t3 = () => ImageBlob.create({ file, mimetype: 'video/mp4' });
            const t4 = () => ImageBlob.create({ file, mimetype: 'image/svg' });

            expect(t1).toThrow(ValidationError);
            expect(t2).toThrow(ValidationError);
            expect(t3).toThrow(ValidationError);
            expect(t4).toThrow(ValidationError);
        });

        test('should return ImageBlob instace for supported MIME types.', () => {
            const file = new Readable();
            expect(ImageBlob.create({ file, mimetype: 'image/jpeg' })).toBeInstanceOf(ImageBlob);
            expect(ImageBlob.create({ file, mimetype: 'image/png' })).toBeInstanceOf(ImageBlob);
            expect(ImageBlob.create({ file, mimetype: 'image/webp' })).toBeInstanceOf(ImageBlob);
            expect(ImageBlob.create({ file, mimetype: 'image/avif' })).toBeInstanceOf(ImageBlob);
            expect(ImageBlob.create({ file, mimetype: 'image/tiff' })).toBeInstanceOf(ImageBlob);
            expect(ImageBlob.create({ file, mimetype: 'image/gif' })).toBeInstanceOf(ImageBlob);
        });
    });

    test('getters should return correct values.', () => {
        const file = new Readable();
        const blob = ImageBlob.create({ file, mimetype: 'image/png', id: 'some-id' });

        expect(blob.id).toEqual('some-id');
        expect(blob.mime).toEqual('image/png');
        expect(blob.stream).toBe(file);
    });
});
