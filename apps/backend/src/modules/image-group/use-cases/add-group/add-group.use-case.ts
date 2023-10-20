import { UseCase } from '../../../../shared/core/use-case.js';
import { GroupName } from '../../domain/group-name.js';
import { ImageGroup } from '../../entity/image-group.entity.js';
import { ImageGroupMapper } from '../../mappers/image-group.mapper.js';
import { ImageGroupRepository } from '../../repos/image-group.repo.js';
import { AddGroupDto } from './add-group.dto.js';
import { AddGroupResponse } from './add-group.response.js';

export class AddGroupUseCase implements UseCase<AddGroupDto, AddGroupResponse> {
    constructor(private imageGroupRepo: ImageGroupRepository) {}

    async execute(dto: AddGroupDto): Promise<AddGroupResponse> {
        const name = GroupName.create(dto.name);

        if ((await this.imageGroupRepo.getGroupByName(name.value)) !== null) {
            throw new Error('group with this name is already created');
        }

        const group = ImageGroup.create({
            name: name.value,
            variants: [],
        });
        await this.imageGroupRepo.save(group);

        return {
            group: ImageGroupMapper.toDto(group),
        };
    }
}
