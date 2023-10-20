import { UseCase } from '../../../../shared/core/use-case.js';
import { GroupId } from '../../domain/group-id.js';
import { ImageGroupRepository } from '../../repos/image-group.repo.js';
import { DeleteGroupDto } from './delete-group.dto.js';

export class DeleteGroupUseCase implements UseCase<DeleteGroupDto, void> {
    constructor(private imageGroupRepo: ImageGroupRepository) {}

    async execute(dto: DeleteGroupDto): Promise<void> {
        const id = GroupId.create(dto.id).value;

        const group = await this.imageGroupRepo.getGroup(id);
        if (!group) {
            throw new Error('group with this id not exists.');
        }

        await this.imageGroupRepo.delete(group);
    }
}
