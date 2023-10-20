import { ObjectId } from 'mongodb';
import { Guard } from '../../../shared/core/guard.js';
import { EntityId } from '../../../shared/domain/entity-id.js';
import { ValidationError } from '../../../shared/error/validation.error.js';
import { ImageGroupModel } from '../../../shared/infra/mongoose/models/image-group.model.js';
import { ImageGroupDto } from '../dto/image-group.dto.js';
import { ImageGroup } from '../entity/image-group.entity.js';
import { ImageVariantMapper } from './image-variant.mapper.js';

export class ImageGroupMapper {
    public static toDto(group: ImageGroup): ImageGroupDto {
        return {
            id: group.id._id.toString(),
            name: group.name,
            variants: group.variants.map((variant) => variant.name),
        };
    }

    public static toPersistence(group: ImageGroup) {
        const dao = new ImageGroupModel({
            _id: group.id._id,
            name: group.name,
            variants: group.variants.map((variant) => ImageVariantMapper.toPersistence(variant)),
        });

        return dao;
    }

    public static toDomain(raw: unknown): ImageGroup {
        if (!Guard.ensureObject(raw)) {
            throw new ValidationError('toDomain raw must be an object.');
        }

        if (!Guard.ensureString(raw.name)) {
            throw new ValidationError('toDomain raw.name must be a string.');
        }

        if (!Array.isArray(raw.variants)) {
            throw new ValidationError('toDomain raw.variants must be an array.');
        }

        if (!(raw._id instanceof ObjectId)) {
            throw new ValidationError('toDomain raw._id must be an ObjectId instance.');
        }

        return ImageGroup.create(
            {
                name: raw.name,
                variants: raw.variants.map((variant) => ImageVariantMapper.toDomain(variant)),
            },
            new EntityId(raw._id)
        );
    }
}
