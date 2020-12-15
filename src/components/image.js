import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

/*
 * This component is built using `gatsby-image` to automatically serve optimized
 * images with lazy loading and reduced file sizes. The image is loaded using a
 * `useStaticQuery`, which allows us to load the image from directly within this
 * component, rather than having to pass the image data down from pages.
 *
 * For more information, see the docs:
 * - `gatsby-image`: https://gatsby.dev/gatsby-image
 * - `useStaticQuery`: https://www.gatsbyjs.com/docs/use-static-query/
 */

export const Image = (props) => {
  const data = useStaticQuery(graphql`
  query {
    allFile(
      filter: {
        extension: { regex: "/(jpg)|(png)|(jpeg)/" }
        relativeDirectory: { eq: "" }
      }
    ) {
      edges {
        node {
          base
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`)
  data.allFile.edges = data.allFile.edges.filter(image => {
    return image.node.base.indexOf(props.type) > -1
  })
  console.log(data.allFile.edges)
  return (
    <div>
    {
      data.allFile.edges.map(image => (
        <Img
          key={image.node.base}
          fluid={image.node.childImageSharp.fluid}
          alt={image.node.base.split(".")[0]} // only use section of the file extension with the filename
        />
      ))
    }</div>
  )

  if (!data?.placeholderImage?.childImageSharp?.fluid) {
    return <div>Picture not found</div>
  }

  return <Img fluid={data.placeholderImage.childImageSharp.fluid} />
}