import * as React from "react"
import { Heart } from 'react-feather';

const Footer = () => (

	<footer className="p-6 mt-10 flex">
        © {new Date().getFullYear()}, Built with  💚 by Christina Hastenrath
        {/* {` `}
        <a href="https://www.gatsbyjs.com" className="font-bold">Gatsby</a> 
        {` `}
        on {` `}
        <a href="https://www.netlifycms.org/" className="font-bold">Netlify CMS</a>{` `}
        and styled with
        {` `}
        <a href="https://www.gatsbyjs.com" className="font-bold">Tailwind CSS</a> {` `} 🚀 */}
  </footer>
)

export default Footer;