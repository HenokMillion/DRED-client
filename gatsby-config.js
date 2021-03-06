const path = require('path')
module.exports = {
  siteMetadata: {
    title: `Diabetic Retinopathy Early Detection (DRED)`,
    description: `A tool to detect diabetic retinopathy from retina scan images`,
    author: `@gatsbyjs`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-root-import`,
      options: {
        root: path.join(__dirname, 'src'),
        views: path.join(__dirname, 'src/views'),
        components: path.join(__dirname, 'src/components'),
        assets: path.join(__dirname, 'src/assets'),
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
};
