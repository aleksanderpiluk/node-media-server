import { UseCase } from '../../../../shared/core/use-case.js';
import { GroupId } from '../../domain/group-id.js';
import { ImageGroupMapper } from '../../mappers/image-group.mapper.js';
import { ImageGroupRepository } from '../../repos/image-group.repo.js';
import { GetGroupDto } from './get-group.dto.js';
import { GetGroupResponse } from './get-group.response.js';

export class GetGroupUseCase implements UseCase<GetGroupDto, GetGroupResponse> {
    constructor(private imageGroupRepo: ImageGroupRepository) {}

    async execute(dto: GetGroupDto): Promise<GetGroupResponse> {
        const id = GroupId.create(dto.id).value;

        const group = await this.imageGroupRepo.getGroup(id);
        if (!group) {
            throw new Error('group with this id not exists.');
        }

        return {
            group: ImageGroupMapper.toDto(group),
        };
    }
}
