// Children-based field collection (careid pattern)
export { collectFormFields } from './collectFormFields';

// Schema builder
export {
  createSurveyValidationSchema,
  createDefaultValuesFromChildren,
  type SurveyFormValues,
} from './schemaBuilder';

// Base schemas (for extension)
export { baseSchemas, getBaseSchema } from './schemaBase';

// Modifiers (for custom validation)
export { modifiers } from './schemaModifiers';

// Zod error utilities (careid pattern)
export { getZodErrorMessage } from './zodError';
