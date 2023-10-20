import { ValidationError } from '../../../../shared/error/validation.error.js';
import { VariantFit } from '../variant-fit.js';

describe('VariantFit', () => {
    describe('create() method', () => {
        test('should throw ValidationError when given value is not a string', () => {
            const t1 = () => VariantFit.create(null);
            const t2 = () => VariantFit.create(undefined);
            const t3 = () => VariantFit.create(10);
            const t4 = () => VariantFit.create(true);
            const t5 = () => VariantFit.create({});

            expect(t1).toThrow(ValidationError);
            expect(t2).toThrow(ValidationError);
            expect(t3).toThrow(ValidationError);
            expect(t4).toThrow(ValidationError);
            expect(t5).toThrow(ValidationError);
        });

        test('should throw ValidationError when given value is not accepted option.', () => {
            const t1 = () => VariantFit.create('');
            const t2 = () => VariantFit.create('test');
            const t3 = () => VariantFit.create('some other value');
            const t4 = () => VariantFit.create('a');
            const t5 = () => VariantFit.create(' ');

            expect(t1).toThrow(ValidationError);
            expect(t2).toThrow(ValidationError);
            expect(t3).toThrow(ValidationError);
            expect(t4).toThrow(ValidationError);
            expect(t5).toThrow(ValidationError);
        });

        test('should return VariantFit instace for valid values', () => {
            expect(VariantFit.create('cover')).toBeInstanceOf(VariantFit);
            expect(VariantFit.create('contain')).toBeInstanceOf(VariantFit);
            expect(VariantFit.create('fill')).toBeInstanceOf(VariantFit);
            expect(VariantFit.create('inside')).toBeInstanceOf(VariantFit);
            expect(VariantFit.create('outside')).toBeInstanceOf(VariantFit);
        });
    });
});
