// by https://edvins.io/add-social-share-buttons-to-gatsby-blog

import * as React from "react"
import { Facebook, Twitter, Linkedin,  Share2 } from 'react-feather';
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
	LineShareButton
} from 'react-share';

const ShareButtons = ({ url, title, description }) => (
  <div className="post-meta-share-icons">
    <FacebookShareButton url={url} quote={description}>
      <Facebook strokeWidth={1.00} />

    </FacebookShareButton>
	<Share2 strokeWidth={1.00} url={url} quote={description}/>
		<LineShareButton></LineShareButton>

    <LinkedinShareButton url={url} title={title} summary={description}>
      <Linkedin strokeWidth={1.00} />
    </LinkedinShareButton>

    <TwitterShareButton url={url} title={description}>
      <Twitter strokeWidth={1.00} />
    </TwitterShareButton>

    {/* <PocketShareButton url={url} title={description}>
      <Pocket strokeWidth={1.00} />
    </PocketShareButton> */}
  </div>
);

export default ShareButtons;