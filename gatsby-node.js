/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

// You can delete this file if you're not using it
const path = require('path')

exports.onCreatePage = async ({ page, actions }) => {
    const { createPage } = actions
    if (page.path.match(/^\/patient/)) {
        createPage({
            path: '/patient',
            matchPath: '/patient/:id',
            component: path.resolve('src/pages/patient.js'),
        })
    }
}