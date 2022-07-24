import React from "react"

import parse from "html-react-parser"
import PropTypes from "prop-types"

const PostComment = ({ comment }) => {
  const {
    author: { node: author },
    content,
    date,
  } = comment

  return (
    <article className="mb-5">
      <div className="flex items-center">
        <img
          className="rounded-full shadow-md w-10 mr-3"
          src={author.avatar.url}
          alt={author.name}
        />
        <div className="flex-1">
          <p className="text-sm">{author.name}</p>
          <small className="text-xs text-gray-500">{date}</small>
        </div>
      </div>

      <div className="text-sm mt-3">{parse(content)}</div>
    </article>
  )
}

PostComment.propTypes = {
  comment: PropTypes.shape({
    content: PropTypes.string,
    date: PropTypes.string,
    author: PropTypes.shape({
      node: PropTypes.shape({
        avatar: PropTypes.shape({
          url: PropTypes.string,
        }),
        id: PropTypes.string,
        name: PropTypes.string,
      }),
    }),
  }),
}

export default PostComment
