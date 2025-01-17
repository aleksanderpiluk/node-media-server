import { UseCase } from '../../../../shared/core/use-case.js';
import { VariantName } from '../../../image-group/domain/variant-name.js';
import { ImageVariantMapper } from '../../../image-group/mappers/image-variant.mapper.js';
import { ImageGroupRepository } from '../../../image-group/repos/image-group.repo.js';
import { ImageId } from '../../../image/domain/image-id.js';
import { ImageRepository } from '../../../image/repos/image.repo.js';
import { ServeImageDto } from './serve-image.dto.js';
import { ServeImageResponse } from './serve-image.response.js';

export class ServeImageUseCase implements UseCase<ServeImageDto, ServeImageResponse> {
    constructor(
        private imageRepo: ImageRepository,
        private imageGroupRepo: ImageGroupRepository
    ) {}

    async execute(dto: ServeImageDto): Promise<ServeImageResponse> {
        const imageId = ImageId.create(dto.imageId).value;
        const variantName = VariantName.create(dto.variant).value;

        const image = await this.imageRepo.getImage(imageId);
        if (!image) {
            throw new Error('image with given id not exist.');
        }

        const groupId = image.group;
        const group = await this.imageGroupRepo.getGroupByName(groupId);
        if (!group) {
            throw new Error('group with given id not exist.');
        }

        const variant = group.getVariant(variantName);
        if (!variant) {
            throw new Error('variant not exist.');
        }

        return {
            blob: image.blob,
            variant: ImageVariantMapper.toDto(variant),
        };
    }
}
