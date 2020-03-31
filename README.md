![CI](https://github.com/devfive/gatsby-source-sylius-rest/workflows/CI/badge.svg?branch=master)


## Description

`gatsby-source-sylius-rest` helps you source the data from Sylius e-Commerce framework. It sources all necessary data and creates localized pages for you.

### Learning Resources (optional)

This source plugin uses API provided by [SyliusShopApi](https://github.com/Sylius/ShopApiPlugin) bundle.

## How to install

Using yarn:
```
yarn add gatsby-source-sylius-rest
```

or npm:
```
npm install --save gatsby-source-sylius-rest
```

## Examples of usage

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
      },
    },
  ],
};
```

### Options
#### Plugin options
Please check [SyliusSourcePluginOptionsInterface](https://github.com/devfive/gatsby-source-sylius-rest/blob/master/src/schemas/Plugin/Options.ts#L8) definition for TypeScript interface.

|   Name  | Required |                Type                | Description                                                                                                                                      |
|:-------:|:--------:|:----------------------------------:|--------------------------------------------------------------------------------------------------------------------------------------------------|
|  debug  |    no    |               boolean              | Provides additional messages during Gatsby build                                                                                                 |
| locales |    yes   |              string[]              | List of supported locales. They are required for retrieving data from Sylius API, sourcing GraphQL nodes and link building.                      |
|  pages  |    no    | SyliusSourcePluginPageDefinition[] | Definitions of pages which should be created using Gatsby Node API (`createPages`). If empty, `gatsby-source-sylius-rest` will not create pages. |
|   url   |    yes   |               string               | URL to the Sylius shop API.                                                                                                                      |

#### Pages definitions options
Please check [SyliusSourcePluginPageDefinition](https://github.com/devfive/gatsby-source-sylius-rest/blob/master/src/schemas/Plugin/Options.ts#L15) definition for TypeScript interface.

|    Name   | Required |             Type            | Description                                                                                                            |
|:---------:|:--------:|:---------------------------:|------------------------------------------------------------------------------------------------------------------------|
| component |    yes   |            string           | Path to the component in your project.                                                                                 |
|    path   |    no    |  SyliusSourcePluginPagePath | Path of page which will be created. It can be either string or object with locales as keys to retrieve localized path. |
|    type   |    yes   | SyliusSourcePluginPagesType | Type of page - `taxon` or `product`.                                                                                   |

## How to query for data (source plugins only)

### Products
```
query Products {
  allSyliusProduct {
    nodes {
      averageRating
      channelCode
      code
      description
      id
      images {
        path
        cachedPath
      }
      locale
      metaDescription
      metaKeywords
      name
      shortDescription
      slug
      taxons {
        main
        others
      }
      variants {
        axis
        code
        nameAxis
        originalPrice {
          currency
          current
        }
        price {
          currency
          current
        }
      }
    }
  }
}
```

### Taxons
```
query Taxons {
  allSyliusTaxon {
    nodes {
      code
      description
      locale
      name
      position
      slug
    }
  }
}
```

## How to run tests

Write `yarn run test` in terminal or use launch configurations in your Visual Studio Code.
