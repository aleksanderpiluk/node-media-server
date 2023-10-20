import { ImageVariantDto } from '../../../image-group/dto/image-variant.dto.js';

export interface ServeImageResponse {
    blob: string;
    variant: ImageVariantDto,
}