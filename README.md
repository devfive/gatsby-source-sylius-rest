![CI](https://github.com/devfive/gatsby-source-sylius-rest/workflows/CI/badge.svg?branch=master)


## Description

`gatsby-source-sylius-rest` helps you source the data from Sylius e-Commerce framework. It sources all necessary data and creates localized pages for you.

### Learning Resources

This source plugin uses API provided by [SyliusShopApi](https://github.com/Sylius/ShopApiPlugin) bundle.

## Documentation

Please check full docs [here](docs/README.md).

### How to install

Using yarn:
```
yarn add gatsby-source-sylius-rest
```

or npm:
```
npm install --save gatsby-source-sylius-rest
```

### Examples of usage

Add plugin configuration to your `gatsby-config.js`:

```javascript
module.exports = {
  plugins: [
    // plugins
    {
      resolve: 'gatsby-source-sylius-rest',
      options: {
        locales: ['en', 'de'],
        url: 'https://your-sylius-shop.com/shop-api',
        pages: [
          {
            component: require.resolve('./src/templates/SyliusTaxonPage.tsx'),
            type: 'taxon',
          },
          {
            component: require.resolve('./src/templates/SyliusProductPage.tsx'),
            type: 'product',
            path: {
              de: '/:locale/produkt/:slug',
              en: '/:locale/product/:slug',
            },
          },
        ],
        schemas: {
          product: {
            variantSelectionMethod: 'String!',
          },
        },
      },
    },
  ],
};
```

#### Options
##### Plugin options
Please check [SyliusSourcePluginOptionsInterface](https://github.com/devfive/gatsby-source-sylius-rest/blob/master/src/schemas/Plugin/Options.ts#L8) definition for TypeScript interface.

|   Name  | Required |                Type                | Description                                                                                                                                      |
|:-------:|:--------:|:----------------------------------:|--------------------------------------------------------------------------------------------------------------------------------------------------|
|  debug  |    no    |               boolean              | Provides additional messages during Gatsby build                                                                                                 |
| limits  |    no    |      SyliusSourcePluginLimits      | Rows limits used for pagination for specific calls to Sylius Shop API.                                                                           |
| locales |    yes   |              string[]              | List of supported locales. They are required for retrieving data from Sylius API, sourcing GraphQL nodes and link building.                      |
|  pages  |    no    | SyliusSourcePluginPageDefinition[] | Definitions of pages which should be created using Gatsby Node API (`createPages`). If empty, `gatsby-source-sylius-rest` will not create pages. |
| schemas |    no    |      SyliusSourcePluginSchemas     | Definitions of additional or overriden fields in schemas that will be sourced.                                                                   |
|   url   |    yes   |               string               | URL to the Sylius shop API.                                                                                                                      |


## How to run tests

Write `yarn run test` in terminal or use launch configurations in your Visual Studio Code.

## TODO

1. Source products attributes.
2. Source product variant images.
3. Source latest products.
