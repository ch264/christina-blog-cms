
import * as React from "react";
import PropTypes from "prop-types";

const Card = ({title, slug, date, description}) => {
	return (
		

	<div class="max-w-sm rounded overflow-hidden shadow-lg" key={slug}>
		<img class="w-full" src="../images/gatsby-icon.png" alt="Mountain" />
		<div class="px-6 py-4">
			<div class="font-bold text-xl mb-2">{title}</div>
			{console.log(title)}
			<p class="text-gray-700 text-base">
				{description}
				Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
			</p>
			<p className="text-gray-700 text-base">{date}</p>
		</div>
		<div class="px-6 pt-4 pb-2">
			<span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
			<span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#travel</span>
			<span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#winter</span>
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