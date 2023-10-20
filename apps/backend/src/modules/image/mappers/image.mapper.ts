import { ObjectId } from 'mongodb';
import { Guard } from '../../../shared/core/guard.js';
import { EntityId } from '../../../shared/domain/entity-id.js';
import { ValidationError } from '../../../shared/error/validation.error.js';
import { ImageModel } from '../../../shared/infra/mongoose/models/image.model.js';
import { ImageDto } from '../dto/image.dto.js';
import { Image } from '../entity/image.entity.js';

export class ImageMapper {
    public static toDto(image: Image): ImageDto {
        return {
            id: image.id._id.toString(),
            group: image.group,
            uploaded: image.uploaded.toISOString(),
        };
    }

    public static toPersistence(image: Image) {
        const dao = new ImageModel({
            _id: image.id._id,
            group: image.group,
            blob: image.blob,
            uploaded: image.uploaded,
        });

        return dao;
    }

    public static toDomain(raw: unknown): Image {
        if (!Guard.ensureObject(raw)) {
            throw new ValidationError('toDomain raw must be an object.');
        }

        if (!Guard.ensureString(raw.group)) {
            throw new ValidationError('toDomain raw.group must be a string.');
        }

        if (!Guard.ensureString(raw.blob)) {
            throw new ValidationError('toDomain raw.blob must be a string.');
        }

        if (!(raw.uploaded instanceof Date)) {
            throw new ValidationError('toDomain raw.uploaded must be an instance of Date class.');
        }

        if (!(raw._id instanceof ObjectId)) {
            throw new ValidationError('toDomain raw._id must be an ObjectId instance.');
        }

        return Image.create(
            {
                group: raw.group,
                blob: raw.blob,
                uploaded: raw.uploaded,
            },
            new EntityId(raw._id)
        );
    }
}
