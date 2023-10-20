import { UseCase } from '../../../../shared/core/use-case.js';
import { GroupId } from '../../domain/group-id.js';
import { VariantName } from '../../domain/variant-name.js';
import { ImageVariantMapper } from '../../mappers/image-variant.mapper.js';
import { ImageGroupRepository } from '../../repos/image-group.repo.js';
import { GetVariantDto } from './get-variant.dto.js';
import { GetVariantResponse } from './get-variant.response.js';

export class GetVariantUseCase implements UseCase<GetVariantDto, GetVariantResponse> {
    constructor(private imageGroupRepo: ImageGroupRepository) {}

    async execute(dto: GetVariantDto): Promise<GetVariantResponse> {
        const id = GroupId.create(dto.id).value;
        const name = VariantName.create(dto.name).value;

        const group = await this.imageGroupRepo.getGroup(id);
        if (!group) {
            throw new Error('group with this id not exists.');
        }

        const variant = group.getVariant(name);
        if (!variant) {
            throw new Error('variant with given name not found.');
        }

        return {
            variant: ImageVariantMapper.toDto(variant),
        };
    }
}
