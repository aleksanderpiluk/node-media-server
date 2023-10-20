import { ValidationError } from '../../../../shared/error/validation.error.js';
import { GroupName } from '../group-name.js';

describe('GroupName', () => {
    describe('create() method', () => {
        test('should throw validation error when value is null or undefined.', () => {
            const t1 = () => {
                GroupName.create(null);
            };

            const t2 = () => {
                GroupName.create(undefined);
            };

            expect(t1).toThrow(ValidationError);
            expect(t2).toThrow(ValidationError);
        });

        test('should throw validation error when value is not a string.', () => {
            const t = () => {
                GroupName.create(22221);
            };

            expect(t).toThrow(ValidationError);
        });

        test('should throw validation error when value is an empty string.', () => {
            const t = () => {
                GroupName.create('');
            };

            expect(t).toThrow(ValidationError);
        });

        test('should throw validation error when value is a string longer than 256 chars.', () => {
            const t = () => {
                GroupName.create('x'.repeat(257));
            };

            expect(t).toThrow(ValidationError);
        });

        test('should return GroupName instance.', () => {
            const groupName = GroupName.create('some-name');
            expect(groupName).toBeInstanceOf(GroupName);
        });
    });

    describe('value getter', () => {
        test('should return proper value.', () => {
            const groupName = GroupName.create('value to return');

            expect(groupName.value).toEqual('value to return');
        });
    });
});
