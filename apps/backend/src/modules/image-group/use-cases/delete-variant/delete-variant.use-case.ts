import { UseCase } from '../../../../shared/core/use-case.js';
import { GroupId } from '../../domain/group-id.js';
import { VariantName } from '../../domain/variant-name.js';
import { ImageGroupRepository } from '../../repos/image-group.repo.js';
import { DeleteVariantDto } from './delete-variant.dto.js';

export class DeleteVariantUseCase implements UseCase<DeleteVariantDto, void> {
    constructor(private imageGroupRepo: ImageGroupRepository) {}

    async execute(dto: DeleteVariantDto): Promise<void> {
        const id = GroupId.create(dto.id).value;
        const name = VariantName.create(dto.name).value;

        const group = await this.imageGroupRepo.getGroup(id);
        if (!group) {
            throw new Error('group with this id not exists.');
        }

        group.deleteVariant(name);

        await this.imageGroupRepo.save(group);
    }
}
