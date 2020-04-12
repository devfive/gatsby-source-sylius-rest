import { ComposeObjectTypeConfig } from 'graphql-compose';
import { SyliusSourcePluginSchema } from '../Plugin';
import { getObjectSchema } from '../getObjectSchema';

describe('getObjectSchema', () => {
  let baseSchema: ComposeObjectTypeConfig<any, any>;

  beforeEach(() => {
    // having
    baseSchema = {
      name: 'SyliusProductPrice',
      fields: {
        current: 'Int!',
        currency: 'String!',
      },
    };
  });

  describe('when fields is an empty object', () => {
    let fields: SyliusSourcePluginSchema;

    beforeEach(() => {
      // having
      fields = {};
    });

    it('should not return object same as base schema', () => {
      // when
      // then
      expect(getObjectSchema(baseSchema, fields)).toEqual(baseSchema);
    });

    it('should not mutate base schema', () => {
      // when
      // then
      expect(getObjectSchema(baseSchema, fields)).not.toBe(baseSchema);
    });
  });

  describe('when fields are overriden', () => {
    let fields: SyliusSourcePluginSchema;

    beforeEach(() => {
      // having
      fields = {
        current: 'String!',
      };
    });

    it('should return updated schema', () => {
      // having
      const expectedSchema: ComposeObjectTypeConfig<any, any> = {
        name: 'SyliusProductPrice',
        fields: {
          current: 'String!',
          currency: 'String!',
        },
      };

      // when
      // then
      expect(getObjectSchema(baseSchema, fields)).toEqual(expectedSchema);
    });

    it('should not mutate base schema', () => {
      // when
      // then
      expect(getObjectSchema(baseSchema, fields)).not.toBe(baseSchema);
    });
  });

  describe('when new fields are added', () => {
    let fields: SyliusSourcePluginSchema;

    beforeEach(() => {
      // having
      fields = {
        newField: 'String!',
      };
    });

    it('should return updated schema', () => {
      // having
      const expectedSchema: ComposeObjectTypeConfig<any, any> = {
        name: 'SyliusProductPrice',
        fields: {
          current: 'Int!',
          currency: 'String!',
          newField: 'String!',
        },
      };

      // when
      // then
      expect(getObjectSchema(baseSchema, fields)).toEqual(expectedSchema);
    });

    it('should not mutate base schema', () => {
      // when
      // then
      expect(getObjectSchema(baseSchema, fields)).not.toBe(baseSchema);
    });
  });
});
