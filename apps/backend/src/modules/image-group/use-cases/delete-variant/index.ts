import { imageGroupRepo } from '../../repos/index.js';
import { DeleteVariantController } from './delete-variant.controller.js';
import { DeleteVariantUseCase } from './delete-variant.use-case.js';

const useCase = new DeleteVariantUseCase(imageGroupRepo);

export const deleteVariantController = new DeleteVariantController(useCase);