import { ObjectId } from 'mongodb';
import { Guard } from '../../../shared/core/guard.js';
import { EntityId } from '../../../shared/domain/entity-id.js';
import { ValidationError } from '../../../shared/error/validation.error.js';
import { ImageVariantDto } from '../dto/image-variant.dto.js';
import { ImageVariant } from '../entity/image-variant.entity.js';

export class ImageVariantMapper {
    public static toDto(variant: ImageVariant): ImageVariantDto {
        return {
            name: variant.name,
            fit: variant.fit,
            width: variant.width,
            height: variant.height,
        };
    }

    public static toPersistence(variant: ImageVariant) {
        return {
            _id: variant.id._id,
            name: variant.name,
            fit: variant.fit,
            width: variant.width,
            height: variant.height,
        };
    }

    public static toDomain(raw: unknown): ImageVariant {
        if (!Guard.ensureObject(raw)) {
            throw new ValidationError('toDomain raw must be an object.');
        }

        if (!Guard.ensureString(raw.name)) {
            throw new ValidationError('toDomain raw.name must be a string.');
        }

        if (!Guard.ensureWithArrayOfStrings(raw.fit, ['cover', 'contain', 'fill', 'inside', 'outside'] as const)) {
            throw new ValidationError('toDomain raw.fit must be a proper fit value.');
        }

        if (!Guard.ensureInteger(raw.width)) {
            throw new ValidationError('toDomain raw.width must be an integer.');
        }

        if (!Guard.ensureInteger(raw.height)) {
            throw new ValidationError('toDomain raw.height must be an integer.');
        }

        if (!(raw._id instanceof ObjectId)) {
            throw new ValidationError('toDomain raw._id must be an ObjectId instance.');
        }


        return ImageVariant.create({
            name: raw.name,
            fit: raw.fit,
            width: raw.width,
            height: raw.height,
        }, new EntityId(raw._id));
    }
}