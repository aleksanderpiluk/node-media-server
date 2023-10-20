import { imageRepo } from '../../repos/index.js';
import { ListImagesController } from './list-images.controller.js';
import { ListImagesUseCase } from './list-images.use-case.js';

const useCase = new ListImagesUseCase(imageRepo);

export const listImagesController = new ListImagesController(useCase);
