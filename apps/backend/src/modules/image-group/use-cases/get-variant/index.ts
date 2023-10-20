import { imageGroupRepo } from '../../repos/index.js';
import { GetVariantController } from './get-variant.controller.js';
import { GetVariantUseCase } from './get-variant.use-case.js';

const useCase = new GetVariantUseCase(imageGroupRepo);

export const getVariantController = new GetVariantController(useCase);