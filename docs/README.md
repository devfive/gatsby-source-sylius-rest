# gatsby-source-sylius-rest

Welcome to the `gatsby-source-sylius-rest` documentation.

## Table of contents

1. [Introduction](#introduction)
    1. [Installation](#installation)
    2. [Configuration](#configuration)

2. [Examples](#examples)
    1. [Queries](#queries)
    2. [Page components](#page-components)

## Introduction
### Installation
Using yarn:
```
yarn add gatsby-source-sylius-rest
```

or npm:
```
npm install --save gatsby-source-sylius-rest
```

### Configuration
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
| locales |    yes   |              string[]              | List of supported locales. They are required for retrieving data from Sylius API, sourcing GraphQL nodes and link building.                      |
|  pages  |    no    | SyliusSourcePluginPageDefinition[] | Definitions of pages which should be created using Gatsby Node API (`createPages`). If empty, `gatsby-source-sylius-rest` will not create pages. |
| schemas |    no    |      SyliusSourcePluginSchemas     | Definitions of additional or overriden fields in schemas that will be sourced.                                                                   |
|   url   |    yes   |               string               | URL to the Sylius shop API.                                                                                                                      |

##### Pages definitions options
Please check [SyliusSourcePluginSchemas](https://github.com/devfive/gatsby-source-sylius-rest/blob/master/src/schemas/Plugin/Options.ts#L36) definition for TypeScript interface.

|    Name   | Required |             Type            | Description                                                                                                            |
|:---------:|:--------:|:---------------------------:|------------------------------------------------------------------------------------------------------------------------|
| component |    yes   |            string           | Path to the component in your project.                                                                                 |
|    path   |    no    |  SyliusSourcePluginPagePath | Path of page which will be created. It can be either string or object with locales as keys to retrieve localized path. |
|    type   |    yes   | SyliusSourcePluginPagesType | Type of page - `taxon` or `product`.                                                                                   |

##### Schemas definitions options
Please check [SyliusSourcePluginSchema](https://github.com/devfive/gatsby-source-sylius-rest/blob/master/src/schemas/Plugin/Options.ts#L45) definition for TypeScript interface.

|      Name      | Required |            Type          | Description                                             |
|:--------------:|:--------:|:------------------------:|---------------------------------------------------------|
| image          |    no    | SyliusSourcePluginSchema | Additional or overriden fields for SyliusImage          |
| product        |    no    | SyliusSourcePluginSchema | Additional or overriden fields for SyliusProduct        |
| productPrice   |    no    | SyliusSourcePluginSchema | Additional or overriden fields for SyliusProductPrice   |
| productTaxons  |    no    | SyliusSourcePluginSchema | Additional or overriden fields for SyliusProductTaxons  |
| productVariant |    no    | SyliusSourcePluginSchema | Additional or overriden fields for SyliusProductVariant |
| taxon          |    no    | SyliusSourcePluginSchema | Additional or overriden fields for SyliusTaxon          |

## Examples
### Queries
#### Products
```graphql
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

#### Taxons
```graphql
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

### Page components
#### Product page
```typescript
import { graphql } from 'gatsby';
import { BaseProductNode } from 'gatsby-source-sylius-rest';
import React from 'react';
import Helmet from 'react-helmet';
import { Main } from '../layouts/Main';
import { ProductDetails } from '../components/ProductDetails';

export const query = graphql`
query Product($code: String) {
  product: syliusProduct(code: {eq: $code}) {
    averageRating
    channelCode
    code
    description
    id
    images {
      file {
        childImageSharp {
          fixed(height: 480, pngCompressionSpeed: 10) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
    locale
    metaDescription
    metaKeywords
    name
    options
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
`;

export interface SyliusProductPageProps {
  pageContext: {
    code: string;
    product: BaseProductNode,
  };
  data: {
    product: BaseProductNode,
  },
}

export default function SyliusProductPage({
  data,
}: SyliusProductPageProps): React.ReactElement {
  if (!data) {
    return null;
  }

  const { product } = data;

  return (
    <Main>
      <Helmet>
        { /* here you can take care of SEO */ }
      </Helmet>
      <ProductDetails data={ product } />
    </Main>
  );
}

```

### Taxons page
```typescript
import { graphql } from 'gatsby';
import { BaseProductNode, BaseTaxonNode } from 'gatsby-source-sylius-rest';
import React from 'react';
import Helmet from 'react-helmet';
import { Main } from '../layouts/Main/Main';
import { ProductGrid } from '../components/Grid/ProductGrid';
import { Page } from '../components/Page/Page';
import { EmptyState } from '../components/EmptyState/EmptyState';

export const query = graphql`
query Products($code: String) {
  productsMain: allSyliusProduct(filter: {taxons: {main: {eq: $code}}}) {
    nodes {
      ...fullSyliusProduct
    }
  }

  productsOthers: allSyliusProduct(filter: {taxons: {others: {in: [$code]}}}) {
    nodes {
      ...fullSyliusProduct
    }
  }
}

fragment fullSyliusProduct on SyliusProduct {
  averageRating
  channelCode
  code
  description
  id
  images {
    file {
      childImageSharp {
        thumbnail: fixed(height: 250, pngCompressionSpeed: 10) {
          ...GatsbyImageSharpFixed
        }
      }
    }
  }
  locale
  metaDescription
  metaKeywords
  name
  options
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
`;

export interface SyliusTaxonPageProps {
  pageContext: {
    taxon: BaseTaxonNode,
  };
  data: {
    productsMain: {
      nodes: BaseProductNode[],
    },
    productsOthers: {
      nodes: BaseProductNode[],
    },
  },
}

export default function SyliusTaxonPage({
  data: { productsMain, productsOthers },
  pageContext,
}: SyliusTaxonPageProps): React.ReactElement {
  const { taxon } = pageContext;
  const products = [
    ...productsMain.nodes,
    ...productsOthers.nodes,
  ];

  return (
    <Main>
      <Helmet>
        { /* here you can take care of SEO */ }
      </Helmet>
      <Page>
        <h1>{ taxon.name }</h1>
        {
          products.length === 0
            ? <EmptyState />
            : <ProductGrid products={ products } />
        }
      </Page>
    </Main>
  );
}

```
