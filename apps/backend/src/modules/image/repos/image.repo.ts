import { ImageModel } from '../../../shared/infra/mongoose/models/image.model.js';
import { Image } from '../entity/image.entity.js';
import { ImageMapper } from '../mappers/image.mapper.js';

export class ImageRepository {
    async save(image: Image) {
        const imageDao = ImageMapper.toPersistence(image);

        const exists = await ImageModel.exists({
            _id: imageDao._id,
        });

        if (!exists) {
            await ImageModel.create(imageDao);
        } else {
            await ImageModel.updateOne(
                {
                    _id: imageDao._id,
                },
                imageDao
            );
        }
    }

    async getImages(): Promise<Image[]> {
        const results = await ImageModel.find();

        return results.map((result) => ImageMapper.toDomain(result));
    }

    async getImage(id: string): Promise<Image | null> {
        const result = await ImageModel.findOne({
            _id: id,
        });

        return result ? ImageMapper.toDomain(result) : null;
    }

    async delete(image: Image) {
        const dao = ImageMapper.toPersistence(image);

        await ImageModel.findOneAndDelete({
            _id: dao._id,
        });
    }
}
