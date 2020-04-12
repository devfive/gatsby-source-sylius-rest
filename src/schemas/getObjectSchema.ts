import { ComposeObjectTypeConfig } from 'graphql-compose';
import { SyliusSourcePluginSchema } from './Plugin';

type Schema = ComposeObjectTypeConfig<any, any>;

export function getObjectSchema(
  schema: Schema,
  fields: SyliusSourcePluginSchema,
): Schema {
  const schemaFields = typeof schema.fields === 'undefined' ? {} : schema.fields;

  return {
    ...schema,
    fields: {
      ...schemaFields,
      ...fields,
    },
  };
}
