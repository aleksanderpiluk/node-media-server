import { imageGroupRepo } from '../../repos/index.js';
import { GetGroupController } from './get-group.controller.js';
import { GetGroupUseCase } from './get-group.use-case.js';

const useCase = new GetGroupUseCase(imageGroupRepo);

export const getGroupController = new GetGroupController(useCase);