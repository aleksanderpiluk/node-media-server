import { ImageGroupModel } from '../../../shared/infra/mongoose/models/image-group.model.js';
import { ImageGroup } from '../entity/image-group.entity.js';
import { ImageGroupMapper } from '../mappers/image-group.mapper.js';

export class ImageGroupRepository {
    async getGroups(): Promise<ImageGroup[]> {
        const results = await ImageGroupModel.find();
        return results.map((result) => ImageGroupMapper.toDomain(result));
    }

    async getGroup(id: string): Promise<ImageGroup | null> {
        const result = await ImageGroupModel.findOne({
            _id: id,
        });

        return result ? ImageGroupMapper.toDomain(result) : null;
    }

    async getGroupByName(name: string): Promise<ImageGroup | null> {
        const result = await ImageGroupModel.findOne({
            name,
        });

        return result ? ImageGroupMapper.toDomain(result) : null;
    }

    async save(group: ImageGroup) {
        const groupDao = ImageGroupMapper.toPersistence(group);

        const exists = await ImageGroupModel.exists({
            _id: groupDao._id,
        });

        if (!exists) {
            await ImageGroupModel.create(groupDao);
        } else {
            await ImageGroupModel.updateOne(
                {
                    _id: groupDao._id,
                },
                groupDao
            );
        }
    }

    async delete(group: ImageGroup) {
        const dao = ImageGroupMapper.toPersistence(group);

        await ImageGroupModel.findOneAndRemove({
            _id: dao._id,
        });
    }
}
