import React from "react"

import { Link } from "gatsby"
import parse from "html-react-parser"
import PropTypes from "prop-types"

const PostItem = ({ post }) => {
  const { title, uri, date, excerpt } = post

  return (
    <article
      className="mb-3 p-3 shadow-md rounded-md hover:shadow-xl transition-shadow"
      key={uri}
    >
      <header>
        <h2 className="font-medium text-lg">
          <Link
            to={uri}
            itemProp="url"
            className="hover:text-indigo-600 transition-colors"
          >
            <span itemProp="headline">{parse(title)}</span>
          </Link>
        </h2>
        <small className="text-slate-400 text-xs">{date}</small>
      </header>
      <section itemProp="description" className="text-sm">
        {parse(excerpt)}
      </section>
    </article>
  )
}

PostItem.propTypes = {
  post: PropTypes.shape({
    title: PropTypes.string,
    uri: PropTypes.string,
    date: PropTypes.string,
    excerpt: PropTypes.string,
  }),
}

export default PostItem
