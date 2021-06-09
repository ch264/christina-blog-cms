
import * as React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby"

const Card = ({title, slug, date, description, hashtag}) => {
	return (
		<div className="max-w-sm rounded overflow-hidden shadow-lg mb-3" key={slug}>
			<img className="w-full" src="../images/gatsby-icon.png" alt="Mountain" />
			<div className="px-6 py-4">
				<Link to={slug} className="font-bold text-xl mb-2">{title}</Link>
				<p className="text-gray-700 text-base">
					{description}
					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
				</p>
				<p className="text-gray-700 text-base">{date}</p>
			</div>
			<div className="px-6 pt-4 pb-2">
				<span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{hashtag}</span>
				<span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#travel</span>
				<span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#winter</span>
			</div>
		</div> 
	)}


Card.defaultProps = {
  title: "title",
  slug: "slug",
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