import * as React from "react"
import { Link } from "gatsby"

import Footer from '../components/footer'
import { Linkedin, GitHub, Twitter } from 'react-feather';

import stackoverflow from '../assets/stackoverflow.svg'
import medium from '../assets/medium-new.svg'

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
      <header className="mb-8 flex flex-col text-center content-center sm:flex-row sm:text-left sm:justify-between">
        <div className="mb-2 sm:mb-0 inner">{header}</div>
        <div className="flex sm:mb-0 self-center post-meta-share-icons">
          
          
          <a href="https://christinavhastenrath.medium.com/" target="_blank" rel="noopener noreferrer" className="icon"><img className="h-10 p-1" src={medium} alt="medium" /></a>

          <a href="https://www.linkedin.com/in/christinahastenrath/" className="pr-1" target="_blank" rel="noopener noreferrer"><Linkedin strokeWidth={1.00} /></a>

          <a href="https://twitter.com/etTinchen" className="pr-1" target="_blank" rel="noopener noreferrer"><Twitter strokeWidth={1.00} /></a>
  
          <a href="https://github.com/ch264" target="_blank" rel="noopener noreferrer"><GitHub strokeWidth={1.00} /></a>
          <a href="https://stackoverflow.com/users/11683537/c-dev" target="_blank" rel="noopener noreferrer" className="icon"><img className="h-9 pb-1 pt-1" src={stackoverflow} alt="stackoverflow" /></a>
        </div>
      </header>
      <main>{children}</main>
      <Footer /> 
    </div>
  )
}

export default Layout
