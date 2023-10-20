import { imageGroupRepo } from '../../repos/index.js';
import { DeleteGroupController } from './delete-group.controller.js';
import { DeleteGroupUseCase } from './delete-group.use-case.js';

const useCase = new DeleteGroupUseCase(imageGroupRepo);

export const deleteGroupController = new DeleteGroupController(useCase);