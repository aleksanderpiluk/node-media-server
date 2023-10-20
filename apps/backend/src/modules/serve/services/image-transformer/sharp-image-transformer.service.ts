import { Readable } from 'stream';
import { ImageVariantDto } from '../../../image-group/dto/image-variant.dto.js';
import { ImageTransformerService } from './image-transformer.service.js';
import sharp from 'sharp';

export class SharpImageTransformerService implements ImageTransformerService {
    async transform(stream: Readable, variant: ImageVariantDto, format: string): Promise<Readable> {
        const transform = sharp().resize({
            fit: variant.fit,
            width: variant.width > 0 ? variant.width : undefined,
            height: variant.height > 0 ? variant.height : undefined,
        });

        stream.pipe(transform);
        if (format === 'image/jpeg') {
            return transform.jpeg();
        } else if (format === 'image/avif') {
            return transform.avif();
        } else if (format === 'image/webp') {
            return transform.webp();
        }

        throw new Error('format not implemented.');
    }
}
