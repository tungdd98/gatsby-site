import React from "react"
import HeaderNavbar from "components/HeaderNavbar"
import Footer from "components/Footer"
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
