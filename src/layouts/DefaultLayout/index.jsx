import React from "react"

import Footer from "components/Footer"
import HeaderNavbar from "components/HeaderNavbar"
import Seo from "components/Seo"

const DefaultLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Seo />
      <HeaderNavbar />

      <main className="flex-1 container mx-auto">{children}</main>

      <Footer />
    </div>
  )
}

export default DefaultLayout
