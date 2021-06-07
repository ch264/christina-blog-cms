import * as React from "react"
import { Link } from "gatsby"

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
    <div className="container mx-auto p-12" data-is-root-path={isRootPath}>
      <header className="mb-8">{header}</header>
      <main>{children}</main>
      <footer className="p-6">
        © {new Date().getFullYear()}, Built with
        {` `}
        <a href="https://www.gatsbyjs.com" className="font-bold">Gatsby</a> 
        {` `}
        on {` `}
        <a href="https://www.netlifycms.org/" className="font-bold">Netlify CMS</a>{` `}
        and styled with
        {` `}
        <a href="https://www.gatsbyjs.com" className="font-bold">Tailwind CSS</a> {` `} 🚀
      </footer>
    </div>
  )
}

export default Layout
