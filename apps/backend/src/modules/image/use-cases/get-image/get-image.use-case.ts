import { UseCase } from '../../../../shared/core/use-case.js';
import { NotFoundError } from '../../../../shared/error/not-found.error.js';
import { ImageId } from '../../domain/image-id.js';
import { ImageMapper } from '../../mappers/image.mapper.js';
import { ImageRepository } from '../../repos/image.repo.js';
import { GetImageDto } from './get-image.dto.js';
import { GetImageResult } from './get-image.result.js';

export class GetImageUseCase implements UseCase<GetImageDto, GetImageResult> {
    constructor(private imageRepo: ImageRepository) {}

    async execute(dto: GetImageDto): Promise<GetImageResult> {
        const id = ImageId.create(dto.id).value;

        const image = await this.imageRepo.getImage(id);
        if (!image) throw new NotFoundError('image with this id not exists.');

        return {
            image: ImageMapper.toDto(image),
        };
    }
}
