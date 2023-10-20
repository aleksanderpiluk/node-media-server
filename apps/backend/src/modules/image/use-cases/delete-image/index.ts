import { imageRepo } from '../../repos/index.js';
import { DeleteImageController } from './delete-image.controller.js';
import { DeleteImageUseCase } from './delete-image.use-case.js';

const useCase = new DeleteImageUseCase(imageRepo);

export const deleteImageController = new DeleteImageController(useCase);
