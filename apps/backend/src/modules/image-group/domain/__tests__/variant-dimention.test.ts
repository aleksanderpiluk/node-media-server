import { ValidationError } from '../../../../shared/error/validation.error.js';
import { VariantDimention } from '../variant-dimention.js';

describe('VariantDimention', () => {
    describe('create() method', () => {
        test('should throw ValidationError when given value is not an integer.', () => {
            const t1 = () => VariantDimention.create('string');
            const t2 = () => VariantDimention.create(null);
            const t3 = () => VariantDimention.create(undefined);
            const t4 = () => VariantDimention.create(123.24);

            expect(t1).toThrow(ValidationError);
            expect(t2).toThrow(ValidationError);
            expect(t3).toThrow(ValidationError);
            expect(t4).toThrow(ValidationError);
        });

        test('should throw ValidationError when given value is integer less than -1.', () => {
            const t = () => VariantDimention.create(-2);
            expect(t).toThrow(ValidationError);
        });

        test('should throw ValidationError when given value is zero.', () => {
            const t = () => VariantDimention.create(0);
            expect(t).toThrow(ValidationError);
        });

        test('should return VariantDimention instance.', () => {
            const variantDimention = VariantDimention.create(512);
            expect(variantDimention).toBeInstanceOf(VariantDimention);
        });
    });

    describe('value getter', () => {
        test('should return correct value.', () => {
            const variantDimention = VariantDimention.create(1024);
            expect(variantDimention.value).toEqual(1024);
        });
    });
});
