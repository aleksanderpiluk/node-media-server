import { UseCase } from '../../../../shared/core/use-case.js';
import { ImageGroupMapper } from '../../mappers/image-group.mapper.js';
import { ImageGroupRepository } from '../../repos/image-group.repo.js';
import { ListGroupsResponse } from './list-groups.response.js';

export class ListGroupsUseCase implements UseCase<undefined, ListGroupsResponse> {
    constructor(private imageGroupRepo: ImageGroupRepository) {}

    async execute(): Promise<ListGroupsResponse> {
        const results = await this.imageGroupRepo.getGroups();
        const items = results.map((result) => ImageGroupMapper.toDto(result));

        return {
            groups: items,
        };
    }
}
