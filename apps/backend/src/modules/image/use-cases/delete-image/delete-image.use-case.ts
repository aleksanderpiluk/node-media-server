import { UseCase } from '../../../../shared/core/use-case.js';
import { NotFoundError } from '../../../../shared/error/not-found.error.js';
import { ImageId } from '../../domain/image-id.js';
import { ImageRepository } from '../../repos/image.repo.js';
import { DeleteImageDto } from './delete-image.dto.js';

export class DeleteImageUseCase implements UseCase<DeleteImageDto, void> {
    constructor(private imageRepo: ImageRepository) {}

    async execute(dto: DeleteImageDto): Promise<void> {
        const id = ImageId.create(dto.id).value;

        const image = await this.imageRepo.getImage(id);
        if (!image) throw new NotFoundError('image with this id not exists.');

        await this.imageRepo.delete(image);
    }
}
