/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

const Bio = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      site {
        siteMetadata {
          author {
            name
            summary
            company {
              name
              url
            }
          }
          social {
            twitter
          }
        }
      }
    }
  `)

  // Set these values by editing "siteMetadata" in gatsby-config.js
  const author = data.site.siteMetadata?.author
  const social = data.site.siteMetadata?.social

  return (
    <div className="bio mb-16 flex flex-row">
      <StaticImage
        className="bio-avatar mr-6 mb-0 rounded-full h-50 w-50 max-w-50"
        layout="fixed"
        formats={["AUTO", "WEBP", "AVIF"]}
        src="../images/profile-pic.png"
        width={50}
        height={50}
        quality={95}
        alt="Profile picture"
      />
      {author.name && (
        <p>
          Written by <strong>{author.name}</strong> <br />{author.summary || null }
          {' '}
          <a href={author.company.url}> @{author.company.name}</a>
          {' '}
          <span role="img" aria-label="astronaut-emoji">👩‍🚀</span>
          {' '}
          <a href={`https://twitter.com/${social.twitter}`}>
          Follow me on Twitter for more tech content <span role="img" aria-label="hands-celebration-emoji">🙌</span></a>
        </p>
      )}
    </div>
  )
}

export default Bio;
