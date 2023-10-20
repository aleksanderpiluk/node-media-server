import { ValidationError } from '../../../../shared/error/validation.error.js';
import { GroupId } from '../group-id.js';

describe('GroupId', () => {
    describe('create() method', () => {
        test('should throw ValidationError when given value is not a string.', () => {
            const t = () => {
                GroupId.create(null);
            };

            expect(t).toThrow(ValidationError);
        });

        test('should return GroupId instance.', () => {
            const groupId = GroupId.create('some id');

            expect(groupId).toBeInstanceOf(GroupId);
        });
    });

    describe('value getter', () => {
        test('should return proper value.', () => {
            const groupId = GroupId.create('value to return');

            expect(groupId.value).toEqual('value to return');
        });
    });
});
