import { UseCase } from '../../../../shared/core/use-case.js';
import { ImageMapper } from '../../mappers/image.mapper.js';
import { ImageRepository } from '../../repos/image.repo.js';
import { ListImagesResponse } from './list-images.response.js';

export class ListImagesUseCase implements UseCase<void, ListImagesResponse> {
    constructor(private imageRepo: ImageRepository) {}

    async execute(): Promise<ListImagesResponse> {
        const images = await this.imageRepo.getImages();

        return {
            images: images.map((image) => ImageMapper.toDto(image)),
        };
    }
}
