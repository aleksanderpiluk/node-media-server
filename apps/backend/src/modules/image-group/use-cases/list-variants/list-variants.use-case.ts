import { UseCase } from '../../../../shared/core/use-case.js';
import { GroupId } from '../../domain/group-id.js';
import { ImageVariantMapper } from '../../mappers/image-variant.mapper.js';
import { ImageGroupRepository } from '../../repos/image-group.repo.js';
import { ListVariantsDto } from './list-variants.dto.js';
import { ListVariantsResponse } from './list-variants.response.js';

export class ListVariantsUseCase implements UseCase<ListVariantsDto, ListVariantsResponse> {
    constructor(private imageGroupRepo: ImageGroupRepository) {}

    async execute(dto: ListVariantsDto): Promise<ListVariantsResponse> {
        const id = GroupId.create(dto.id).value;

        const group = await this.imageGroupRepo.getGroup(id);
        if (!group) {
            throw new Error('group with given id not found');
        }

        return {
            variants: group.variants.map((variant) => ImageVariantMapper.toDto(variant)),
        };
    }
}
