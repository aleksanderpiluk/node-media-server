import { ValidationError } from '../../../../shared/error/validation.error.js';
import { VariantName } from '../variant-name.js';

describe('VariantName', () => {
    describe('create() method', () => {
        test('should throw validation error when value is null or undefined.', () => {
            const t1 = () => {
                VariantName.create(null);
            };

            const t2 = () => {
                VariantName.create(undefined);
            };

            expect(t1).toThrow(ValidationError);
            expect(t2).toThrow(ValidationError);
        });

        test('should throw validation error when value is not a string.', () => {
            const t = () => {
                VariantName.create(22221);
            };

            expect(t).toThrow(ValidationError);
        });

        test('should throw validation error when value is an empty string.', () => {
            const t = () => {
                VariantName.create('');
            };

            expect(t).toThrow(ValidationError);
        });

        test('should throw validation error when value is a string longer than 256 chars.', () => {
            const t = () => {
                VariantName.create('x'.repeat(257));
            };

            expect(t).toThrow(ValidationError);
        });

        test('should return variantName instance.', () => {
            const variantName = VariantName.create('some-name');
            expect(variantName).toBeInstanceOf(VariantName);
        });
    });

    describe('value getter', () => {
        test('should return proper value.', () => {
            const variantName = VariantName.create('value to return');

            expect(variantName.value).toEqual('value to return');
        });
    });
});
