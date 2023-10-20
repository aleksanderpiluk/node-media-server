import { Readable } from 'stream';
import { ImageVariantDto } from '../../../image-group/dto/image-variant.dto.js';

export interface ImageTransformerService {
    transform(stream: Readable, variant: ImageVariantDto, format: string): Promise<Readable>;
}