import React from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'

const StoriPage = (props) => {
  const post = props.data.storie

  return (
    <React.Fragment>
      <Helmet>
        <html amp="" lang="en" />
        <script async src="https://cdn.ampproject.org/v0.js" />
        <script
          async
          custom-element="amp-story"
          src="https://cdn.ampproject.org/v0/amp-story-1.0.js"
        />
        <script
          async
          custom-element="amp-video"
          src="https://cdn.ampproject.org/v0/amp-video-0.1.js"
        />
        <title>Stories in AMP - Hello World</title>
        <style
          amp-boilerplate
          dangerouslySetInnerHTML={{
            __html: `
        body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}
        `
          }}
        />

        <style
          amp-custom
          dangerouslySetInnerHTML={{
            __html: `
            amp-story {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI ", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji ", "Segoe UI Emoji ", "Segoe UI Symbol ";
      }
      amp-story-page * {
        color: white;
        text-align: center;
      }
      [template=thirds] {
        padding: 0;
      }
        `
          }}
        />
      </Helmet>
      <amp-story
        standalone
        title="Stories in AMP - Hello World"
        publisher="AMP Project"
        publisher-logo-src="https://amp.dev/favicons/coast-228x228.png"
        poster-portrait-src="https://amp.dev/static/samples/img/story_dog2_portrait.jpg"
        poster-square-src="https://amp.dev/static/samples/img/story_dog2_square.jpg"
        poster-landscape-src="https://amp.dev/static/samples/img/story_dog2_landscape.jpg"
      >
      {post.pages.map((page, index) => {
        return (
          <amp-story-page id={`page-${index}`} key={index}>
            <amp-story-grid-layer template="fill">
              <amp-img
                src={page.cover.childImageSharp.fluid.src}
                width="720"
                height="1280"
                layout="responsive"
              />
            </amp-story-grid-layer>
            <amp-story-grid-layer template="vertical">
              <h1>{page.title}</h1>
              <p>{page.desc}</p>
            </amp-story-grid-layer>
          </amp-story-page>
        )
      })}
      </amp-story>
    </React.Fragment>
  )
}

export default StoriPage

export const Query = graphql`
  query storieBySlug($slug: String!) {
    storie: storiesYaml(fields: { slug: { eq: $slug } }) {
      id
      title
      fields {
        slug
      }
      features
      cover {
        childImageSharp {
          fluid(maxWidth: 350) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }

      pages {
        title
        desc
        cover {
          childImageSharp {
            fluid(maxWidth: 350) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
    }
  }
`
