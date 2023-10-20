import { imageGroupRepo } from '../../repos/index.js';
import { AddGroupController } from './add-group.controller.js';
import { AddGroupUseCase } from './add-group.use-case.js';

const useCase = new AddGroupUseCase(imageGroupRepo);

export const addGroupController = new AddGroupController(useCase);