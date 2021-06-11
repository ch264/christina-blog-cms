import * as React from "react"
import { Link } from "gatsby"

import Footer from '../components/footer'

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath
  let header

  if (isRootPath) {
    header = (
      <h1 className="font-bold">
        <Link to="/" className="font-bold text-5xl">{title}</Link>
      </h1>
    )
  } else {
    header = (
      <Link className="header-link-home font-bold text-2xl" to="/">
        {title}
      </Link>
    )
  }

  return (
    <div className="container mx-auto p-20" data-is-root-path={isRootPath}>
      <header className="mb-8">{header}</header>
      <main>{children}</main>
      <Footer /> 
    </div>
  )
}

export default Layout
