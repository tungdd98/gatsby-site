import React from "react"

const Footer = () => {
  return (
    <footer className="container mx-auto p-2 text-center">
      © {new Date().getFullYear()}, Built with
      {` `}
      <a href="https://www.gatsbyjs.com">Gatsby</a>
      {` `}
      And <a href="https://wordpress.org/">WordPress</a>
    </footer>
  )
}

export default Footer
