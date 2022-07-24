import DefaultLayout from "layouts/DefaultLayout"
import React from "react"

const HomePage = () => {
  return (
    <DefaultLayout>
      <div className="py-3">
        <h1 className="text-3xl font-bold underline">Hello world!</h1>
      </div>
    </DefaultLayout>
  )
}

export default HomePage
