import * as React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"

import ShareButtons from "../components/share-buttons"


// import parse from 'html-react-parser';

const BlogPostTemplate = ({ data, location }) => {
  const url = typeof window !== 'undefined' ? window.location.href : '';
  const post = data.markdownRemark
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const { previous, next } = data


  return (
    <Layout location={location} title={siteTitle}>
      <Seo
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />
      <article
        className="blog-post"
        itemScope
        itemType="http://schema.org/Article"
      >
        <header className="font-sans">
          <h1 itemProp="headline" className="font-bold font-black mt-12 mb-6 text-5xl">{post.frontmatter.title}</h1>
          <p className="text-2xl font-thin p-0 mb-8">{post.frontmatter.date} - <span className="text-1l"> {post.frontmatter.hashtag ? post.frontmatter.hashtag.map(tag => (` ${tag}`)) : ''} - {post.timeToRead || ''} min read </span>
            <ShareButtons url={url} title={post.title} description={post.frontmatter.description}/>
          </p>
        </header>
        <section
          className="cms-content md:px-16 lg:px-24"
          dangerouslySetInnerHTML={{ __html: post.html }}
          itemProp="articleBody"
        />
        <hr />
        <p className=" flex justify-center"> <ShareButtons url={url} title={post.title} description={post.frontmatter.description} /></p>
       
        <footer className="pt-6">
          <Bio />
        </footer>
      </article>
      <nav>
        <ul className="flex justify-between">
          <li>
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      html
      timeToRead
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        hashtag
      }
    }
    previous: markdownRemark(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    next: markdownRemark(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`
