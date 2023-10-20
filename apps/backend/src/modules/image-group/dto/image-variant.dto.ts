import { ImageVariantFit } from '../types/image-variant-fit.js';

export interface ImageVariantDto {
    name: string;
    width: number;
    height: number;
    fit: ImageVariantFit;
}
