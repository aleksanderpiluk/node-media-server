import { imageRepo } from '../../repos/index.js';
import { imageStorageService } from '../../services/image-storage/index.js';
import { AddImageController } from './add-image.controller.js';
import { AddImageUseCase } from './add-image.use-case.js';

const useCase = new AddImageUseCase(imageRepo);

export const addImageController = new AddImageController(imageStorageService, useCase);
