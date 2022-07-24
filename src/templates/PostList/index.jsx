import React from "react"

import PostItem from "components/PostItem"
import Seo from "components/Seo"
import { graphql, Link } from "gatsby"
import DefaultLayout from "layouts/DefaultLayout"

const PostList = ({
  data,
  pageContext: { nextPagePath, previousPagePath },
}) => {
  const posts = data.allWpPost.nodes

  return (
    <DefaultLayout>
      <Seo title="All posts" />
      <div className="py-4">
        {posts.length ? (
          <>
            {posts.map(post => (
              <PostItem post={post} key={post.uri} />
            ))}

            <div className="flex items-center text-sm mt-6">
              {previousPagePath && (
                <Link className="py-2 px-3 rounded-md border mr-2" to="/">
                  Previous
                </Link>
              )}
              {nextPagePath && (
                <Link className="py-2 px-3 rounded-md border" to="/">
                  Next
                </Link>
              )}
            </div>
          </>
        ) : (
          <p className="text-center">
            No blog posts found. Add posts to your WordPress site and they'll
            appear here!
          </p>
        )}
      </div>
    </DefaultLayout>
  )
}

export default PostList

export const pageQuery = graphql`
  query($offset: Int!, $postsPerPage: Int!) {
    allWpPost(
      sort: { fields: [date], order: DESC }
      limit: $postsPerPage
      skip: $offset
    ) {
      nodes {
        excerpt
        uri
        date(formatString: "MMMM DD, YYYY")
        title
        excerpt
      }
    }
  }
`
