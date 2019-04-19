import React from 'react'
import { graphql, Link } from 'gatsby'
import Layout from '../components/layout'

const IndexPage = ({
  data: {
    stories: { edges }
  }
}) => {

  return (
    <Layout>
      <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
        {edges.map((item, index) => {
          return (
            <React.Fragment>
              <Link to={`/p/${item.node.fields.slug}`} key={index}>
                <h1>{item.node.title}</h1>
              </Link>
            </React.Fragment>
          )
        })}
      </div>
    </Layout>
  )
}

export default IndexPage

export const IndexQuery = graphql`
  query IndexQuery {
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
`
