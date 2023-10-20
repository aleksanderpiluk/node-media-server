import { Readable } from 'stream';
import { ValueObject } from '../../../shared/domain/value-object.js';
import { ValidationError } from '../../../shared/error/validation.error.js';
import { v4 as uuidV4 } from 'uuid';
import mime from 'mime';

interface ImageBlobProps {
    stream: Readable;
    mime: string;
    id: string;
}

export class ImageBlob extends ValueObject<ImageBlobProps> {
    private constructor(props: ImageBlobProps) {
        super(props);
    }

    static create(values: { file: Readable; mimetype: string; id?: string }): ImageBlob {
        if (!this.isMimeTypeSupported(values.mimetype)) {
            throw new ValidationError('ImageBlob must have supported mime type.');
        }

        const ext = mime.getExtension(values.mimetype);
        const id = values.id ?? `${uuidV4()}.${ext}`;

        return new ImageBlob({
            stream: values.file,
            mime: values.mimetype,
            id,
        });
    }

    get stream() {
        return this.props.stream;
    }

    get mime() {
        return this.props.mime;
    }

    get id() {
        return this.props.id;
    }

    /**
     * Check if given MIME type is supported.
     */
    private static isMimeTypeSupported(type: string) {
        const validTypes = [
            'image/png',
            'image/jpeg',
            'image/webp',
            'image/avif',
            'image/tiff',
            'image/gif',
        ];

        return validTypes.includes(type);
    }
}
