import { decimal, helpers, integer, maxLength, maxValue, minLength, minValue, required, sameAs } from '@vuelidate/validators';

export const useValidation = () => {
  return {
    required: (message: string) => helpers.withMessage(message, required),
    decimal: (message: string) => helpers.withMessage(message, decimal),
    integer: (message: string) => helpers.withMessage(message, integer),
    sameAs: (message: string, ...args: Parameters<typeof sameAs>) => helpers.withMessage(message, sameAs(...args)),
    minLength: (message: string, ...args: Parameters<typeof minLength>) => helpers.withMessage(message, minLength(...args)),
    maxLength: (message: string, ...args: Parameters<typeof maxLength>) => helpers.withMessage(message, maxLength(...args)),
    minValue: (message: string, ...args: Parameters<typeof minValue>) => helpers.withMessage(message, minValue(...args)),
    maxValue: (message: string, ...args: Parameters<typeof maxValue>) => helpers.withMessage(message, maxValue(...args)),
  };
};
