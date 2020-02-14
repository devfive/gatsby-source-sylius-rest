`gatsby-source-sylius-rest` helps you source the data from Sylius e-Commerce framework.

# Installation

```
// TODO
```

# Sample configuration
You should add plugin configuration to your `gatsby-config.js`:

```
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

# Options
## Plugin options
Please check [SyliusSourcePluginOptionsInterface](https://github.com/devfive/gatsby-source-sylius-rest/blob/master/src/schemas/Plugin/Options.ts#L8) definition for TypeScript interface.

- `debug: boolean` - Provides additional messages during build.
- `locales: string[]` - List of supported locales. They are required for retrieving data from Sylius API, sourcing GraphQL nodes and link building.
- `pages: SyliusSourcePluginPageDefinition[]` - Definitions of pages which should be created using Gatsby Node API (`createPages`). If empty, `gatsby-source-sylius-rest` will not create pages.
- `url: string` - URL to the Sylius shop API.

## Pages definitions options
Please check [SyliusSourcePluginPageDefinition](https://github.com/devfive/gatsby-source-sylius-rest/blob/master/src/schemas/Plugin/Options.ts#L15) definition for TypeScript interface.

- `component: string` - Path to the component in your project.
- `path?: SyliusSourcePluginPagePath` - Path of page which will be created. It can be either string or object with locales as keys to retrieve localized path.
- `type: SyliusSourcePluginPagesType` - Type of page - `taxon` or `product`.
