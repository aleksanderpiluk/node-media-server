import { UseCase } from '../../../../shared/core/use-case.js';
import { GroupId } from '../../domain/group-id.js';
import { VariantDimention } from '../../domain/variant-dimention.js';
import { VariantFit } from '../../domain/variant-fit.js';
import { VariantName } from '../../domain/variant-name.js';
import { ImageVariant } from '../../entity/image-variant.entity.js';
import { ImageVariantMapper } from '../../mappers/image-variant.mapper.js';
import { ImageGroupRepository } from '../../repos/image-group.repo.js';
import { AddVariantDto } from './add-variant.dto.js';
import { AddVariantResponse } from './add-variant.response.js';

export class AddVariantUseCase implements UseCase<AddVariantDto, AddVariantResponse> {
    constructor(private imageGroupRepo: ImageGroupRepository) {}

    async execute(dto: AddVariantDto): Promise<AddVariantResponse> {
        const id = GroupId.create(dto.id).value;
        const name = VariantName.create(dto.name).value;
        const width = VariantDimention.create(dto.width).value;
        const height = VariantDimention.create(dto.height).value;
        const fit = VariantFit.create(dto.fit).value;

        const group = await this.imageGroupRepo.getGroup(id);
        if (!group) {
            throw new Error('group with given id not found');
        }

        if (group.getVariant(name) !== null) {
            throw new Error('variant with this name is already defined.');
        }

        const variant = ImageVariant.create({
            name,
            width,
            height,
            fit,
        });

        group.addVariant(variant);

        await this.imageGroupRepo.save(group);

        return {
            variant: ImageVariantMapper.toDto(variant),
        };
    }
}
