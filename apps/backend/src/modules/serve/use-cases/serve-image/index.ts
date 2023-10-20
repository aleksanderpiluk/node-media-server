import { imageGroupRepo } from '../../../image-group/repos/index.js';
import { imageRepo } from '../../../image/repos/index.js';
import { imageStorageService } from '../../../image/services/image-storage/index.js';
import { imageTransformerService } from '../../services/image-transformer/index.js';
import { ServeImageController } from './serve-image.controller.js';
import { ServeImageUseCase } from './serve-image.use-case.js';

const useCase = new ServeImageUseCase(imageRepo, imageGroupRepo);

export const serveImageController = new ServeImageController(
    useCase,
    imageStorageService,
    imageTransformerService
);
