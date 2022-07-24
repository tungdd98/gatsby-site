import React from "react"
import DefaultLayout from "layouts/DefaultLayout"
import Seo from "components/Seo"
import { graphql, Link } from "gatsby"
import parse from "html-react-parser"

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
            {posts.map(post => {
              const title = post.title

              return (
                <article
                  className="mb-3 p-3 shadow-md rounded-md hover:shadow-xl transition-shadow"
                  key={post.uri}
                >
                  <header>
                    <h2 className="font-medium text-lg">
                      <Link
                        to={post.uri}
                        itemProp="url"
                        className="hover:text-indigo-600 transition-colors"
                      >
                        <span itemProp="headline">{parse(title)}</span>
                      </Link>
                    </h2>
                    <small className="text-slate-400 text-xs">
                      {post.date}
                    </small>
                  </header>
                  <section itemProp="description" className="text-sm">
                    {parse(post.excerpt)}
                  </section>
                </article>
              )
            })}

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
