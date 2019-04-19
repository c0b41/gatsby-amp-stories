const path = require('path')
const _ = require('lodash')

exports.onCreateNode = ({ node, actions }) => {
  
  const { createNodeField } = actions
  let slug
  if (node.internal.type === 'StoriesYaml') {
    if (
      Object.prototype.hasOwnProperty.call(node, 'title') &&
      !Object.prototype.hasOwnProperty.call(node, 'slug')
    ) {
      slug = `${_.kebabCase(node.title)}`
    }

    if (slug) {
      createNodeField({ node, name: 'slug', value: slug })
    }
  }
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const StorieTemplate = path.resolve('src/templates/post.js')

  try {
    const Stories = await graphql(`
      {
        stories: allStoriesYaml {
          edges {
            node {
              fields {
                slug
              }
              id
              title
              cover {
                publicURL
              }
            }
          }
        }
      }
    `)

    if (Stories.errors) {
      console.log(Stories.errors)
      return Promise.reject(Stories.errors)
    } else {
      const posts = Stories.data.stories.edges

      _.each(posts, (edge, index) => {

        createPage({
          path: `/p/${edge.node.fields.slug}`,
          component: StorieTemplate,
          context: {
            slug: edge.node.fields.slug
          }
        })
      })
    }

 }catch(err){
    console.log(err)
    return err
 }

}
