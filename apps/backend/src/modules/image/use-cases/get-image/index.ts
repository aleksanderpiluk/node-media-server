import { imageRepo } from '../../repos/index.js';
import { GetImageController } from './get-image.controller.js';
import { GetImageUseCase } from './get-image.use-case.js';

const useCase = new GetImageUseCase(imageRepo);

export const getImageController = new GetImageController(useCase);
