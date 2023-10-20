import { UseCase } from '../../../../shared/core/use-case.js';
import { GroupId } from '../../../image-group/domain/group-id.js';
import { Image } from '../../entity/image.entity.js';
import { ImageMapper } from '../../mappers/image.mapper.js';
import { ImageRepository } from '../../repos/image.repo.js';
import { AddImageDto } from './add-image.dto.js';
import { AddImageResponse } from './add-image.response.js';

export class AddImageUseCase implements UseCase<AddImageDto, AddImageResponse> {
    constructor(private imageRepo: ImageRepository) {}

    async execute(dto: AddImageDto): Promise<AddImageResponse> {
        const group = GroupId.create(dto.group).value;

        const image = Image.create({
            blob: dto.blob,
            group,
            uploaded: new Date(),
        });

        await this.imageRepo.save(image);

        return {
            image: ImageMapper.toDto(image),
        };
    }
}
