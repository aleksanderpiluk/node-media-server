import { imageGroupRepo } from '../../repos/index.js';
import { ListGroupsController } from './list-groups.controller.js';
import { ListGroupsUseCase } from './list-groups.use-case.js';

const useCase = new ListGroupsUseCase(imageGroupRepo);
export const listGroupsController = new ListGroupsController(useCase);