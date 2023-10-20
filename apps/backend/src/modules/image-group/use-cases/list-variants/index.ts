import { imageGroupRepo } from '../../repos/index.js';
import { ListVariantsController } from './list-variants.controller.js';
import { ListVariantsUseCase } from './list-variants.use-case.js';

const useCase = new ListVariantsUseCase(imageGroupRepo);

export const listVariantsController = new ListVariantsController(useCase);