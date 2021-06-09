
import * as React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby"

const Card = ({title, slug, date, description, hashtag, thumbnail}) => {
	return (
		<div className="max-w-sm rounded overflow-hidden shadow-lg mb-3" key={slug}>
			{ thumbnail && thumbnail.childImageSharp ? ( <img className="w-full" src={`${thumbnail.childImageSharp.fluid.src}`} alt="Mountain" /> ) : ''}
			<div className="px-6 py-4">
				<Link to={slug} className="font-bold text-xl mb-2">{title}</Link>
				<p className="text-gray-700 text-base">
					{description}
				</p>
				<p className="text-gray-700 text-base">{date}</p>
			</div>
			<div className="px-6 pt-4 pb-2">
				{ hashtag ? hashtag.map(tag => <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#{tag}</span>) : ''}
			</div>
		</div> 
	)}


Card.defaultProps = {
  title: ``,
  slug: ``,
  description: ``,
	date: ``,
}

Card.propTypes = {
  description: PropTypes.string,
  title: PropTypes.string,
	slug: PropTypes.string,
	date: PropTypes.string,
}

export default Card;