import React from "react"

import PostComment from "components/PostComment"
import Seo from "components/Seo"
import { graphql, Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import parse from "html-react-parser"
import DefaultLayout from "layouts/DefaultLayout"

const PostDetail = props => {
  const {
    data: { previous, next, post },
  } = props

  const featuredImage = {
    data: post.featuredImage?.node?.localFile?.childImageSharp?.gatsbyImageData,
    alt: post.featuredImage?.node?.alt || ``,
  }

  const postComments = post.comments.nodes
  console.log(postComments)

  return (
    <DefaultLayout>
      <Seo title={post.title} description={post.excerpt} />

      <article className="py-3">
        <header>
          <h1 itemProp="headline" className="font-semibold text-3xl mb-3">
            {parse(post.title)}
          </h1>

          <p className="text-slate-500 text-sm mb-5">{post.date}</p>

          {/* if we have a featured image for this post let's display it */}
          {featuredImage?.data && (
            <GatsbyImage
              image={featuredImage.data}
              alt={featuredImage.alt}
              className="mb-10"
            />
          )}
        </header>

        {!!post.content && <section>{parse(post.content)}</section>}
      </article>

      <nav className="mt-5">
        <ul className="list-none flex justify-between">
          <li>
            {previous && (
              <Link
                to={previous.uri}
                rel="prev"
                className="hover:text-indigo-600 transition-colors"
              >
                ← {parse(previous.title)}
              </Link>
            )}
          </li>

          <li>
            {next && (
              <Link
                to={next.uri}
                rel="next"
                className="hover:text-indigo-600 transition-colors"
              >
                {parse(next.title)} →
              </Link>
            )}
          </li>
        </ul>
      </nav>

      <section className="mt-5 w-1/2 mx-auto">
        <div className="border-t-2 mb-5"></div>
        <h5 className="text-lg mb-4">
          {postComments.length} comments for "{post.title}"
        </h5>
        <ul className="list-none">
          {postComments.map(comment => (
            <li key={comment.id}>
              <PostComment comment={comment} />
            </li>
          ))}
        </ul>
      </section>
    </DefaultLayout>
  )
}

export default PostDetail

export const pageQuery = graphql`
  query($id: String!, $previousPostId: String, $nextPostId: String) {
    post: wpPost(id: { eq: $id }) {
      id
      excerpt
      content
      title
      date(formatString: "MMMM DD, YYYY")
      featuredImage {
        node {
          altText
          localFile {
            childImageSharp {
              gatsbyImageData(
                quality: 100
                placeholder: TRACED_SVG
                layout: FULL_WIDTH
              )
            }
          }
        }
      }
      comments {
        nodes {
          id
          date(formatString: "MMMM DD, YYYY")
          content
          author {
            node {
              avatar {
                url
              }
              id
              name
            }
          }
        }
      }
    }
    previous: wpPost(id: { eq: $previousPostId }) {
      uri
      title
    }
    next: wpPost(id: { eq: $nextPostId }) {
      uri
      title
    }
  }
`
