import { imageGroupRepo } from '../../repos/index.js';
import { AddVariantController } from './add-variant.controller.js';
import { AddVariantUseCase } from './add-variant.use-case.js';

const useCase = new AddVariantUseCase(imageGroupRepo);

export const addVariantController = new AddVariantController(useCase);