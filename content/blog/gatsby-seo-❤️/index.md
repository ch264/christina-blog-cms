---
title: Gatsby + SEO = ❤️
date: 2021-05-25T21:00:30.311Z
thumbnail: girls.jpeg
description: Improve your search engine performance and site ranking with SEO in
  headless WordPress CMS + Gatsby and a Gatsby/Markdown CMS app
hashtag:
  - gatsbyjs
  - cms
  - seo
  - wordpress
---
This blog post is going to walk you through how to implement SEO in your Gatsby app in two different Gatsby applications.

👉 The first Gatsby app is a headless WordPress CMS connected to Gatsby via [WPGraphQL](https://www.wpgraphql.com/). SEO can be implemented via the WPGraphQL YOAST SEO Plugin.

👉 The second SEO implementation is going to show you how to implement SEO data via the Gatsby SEO plugin in a Gatsby app.

Let’s get started 🏇 🙌

\--- 

# Headless WordPress CMS + Gatsby + YOAST SEO

This post assumes you already have your Gatsby Frontend connected to your WordPress via [WPGraphql](https://www.wpgraphql.com/).

In order to get the data from YOAST, you can install [Ash Hitchcock’s](http://ash_hitchcock/) plugin [ashhitch/wp-graphql-yoast-seo](https://github.com/ashhitch/wp-graphql-yoast-seo) on WordPress:

This allows you to query an additional field in the GraphQL for SEO data from YOAST under *pages*.

![GraphQL query for SEO data from YOAST](https://miro.medium.com/max/2720/1*vbwtHOnenZtvvvezDRMxMQ.png)

The site meta data is set in the *gatsby-config.js* file.

![siteMetadata for SEO in gatsby-config.js](https://miro.medium.com/max/1400/1*ASPJUdpvyVL7ghqoRV5G2A.png "siteMetadata for SEO in gatsby-config.js")

Therefore in *seo.jsx* we can set either SEO data in the Helmet from YOAST or from siteMetaData. Here is an example:

![](https://miro.medium.com/max/1400/1*FMTLaOUkXTwAj-Viw1ftLw.png)

That is all you need to do to setup SEO in your headless Wordpress CMS + Gatsby app! 🍰

# SEO in Gatsby via Gatsby SEO plugin

The second Gatsby app has a Markdown CMS implementation. You can find an example in [Postman’s](https://www.postman.com/) open-source [Learning Center repository](https://github.com/postmanlabs/postman-docs).

## In *src/components* folder create a file called *seo.jsx*

The SEO component queries for data with [Gatsby’s useStaticQuery React hook](https://www.gatsbyjs.org/docs/use-static-query/). Just import the useStaticQuery and graphql from gatsby like so:

![seo.jsx in Gatsby App + Markdown CMS](https://miro.medium.com/max/1400/1*K6Vh66UvgwHQ8UmkB6FPCw.png "seo.jsx in Gatsby App + Markdown CMS")

Once you created your SEO component you can import the SEO component in your page template and pass in the information you want from your page content source. In this case we pull in the data from Markdown via [Gatsby’s transformer remark](https://www.gatsbyjs.com/plugins/gatsby-transformer-remark/).

💡 For example, SEO data can be pulled in a page template under *src/templates/doc.jsx* via markdownRemark and passed into the SEO component.

![](https://miro.medium.com/max/1400/1*j_lvLhz7nBprWP62ZHOqWw.png)

And that’s it 🔥 🚀

![pinapple party](https://miro.medium.com/max/1400/0*EsJMzel5who9CkaC)

You now have SEO in your Gatsby apps, which will help you with site ranking and better performance in search engines 👏