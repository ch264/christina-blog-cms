---
title: Tutorial: Algolia React InstantSearch implementation for a React Gatsby App
date: 2019-12-03T18:55:31.656Z
thumbnail: ./image-3.jpeg
description: Tutorial: Algolia React InstantSearch implementation for a React Gatsby App
hashtag: [Postman, S3, AWS, API]
---
![](image-3.jpeg)

Tutorial: Algolia React InstantSearch implementation for a React Gatsby App

This is a step-by-step tutorial on how to setup Algolia for your Gatsby Site with [React InstantSearch.js](https://www.algolia.com/doc/api-reference/widgets/instantsearch/react/). First we implemented the Algolia backend and then the frontend. In our repo the Algolia Keys are stored in [Github Secrets](https://help.github.com/en/actions/automating-your-workflow-with-github-actions/creating-and-using-encrypted-secrets#creating-encrypted-secrets  ) and get send as environment variables through Github Actions when the app is deployed. This tutorial will focus on implementing Algolia in an existing Gatsby React App.

## Algolia Backend Setup

Let us get started with the Algolia Backend implementation.

Ready?

Set.

Go!

1. Create an account with Algolia and grab 4 pieces of information:
    * The name you gave the index (‘docs’ in our case)
    * Your App ID
    * Your Search-Only API Key
    * Your Admin API Key

2. Run (only install dotenv if you are not using it already):

```bash
$ gatsby-plugin-algolia react-instantsearch-dom dotenv
```

3. Add your API keys to the .env.production file (these are just example keys. Our actual keys are stored in GitHub secrets in the Repo)

```bash
GATSBY_ALGOLIA_APP_ID = KA4OJA9KAS
GATSBY_ALGOLIA_SEARCH_KEY=lkjas987ef923ohli9asj213k12n59a
ALGOLIA_ADMIN_KEY = lksa09sadkj1230asd09dfvj12309aj
```

4. Add the following code to your *gatsby-config.js* file:

```javascript
const queries = require('./src/utils/algolia');

require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  siteMetadata: {
  title: 'your title',
  description: 'your description',
  author: '@gatsbyjs',
  siteUrl: 'https://learning.getpostman.com', // example url
},

plugins: [
  'gatsby-plugin-react-helmet',
 {
  resolve: `gatsby-plugin-algolia`,
  options: {
    appId: process.env.GATSBY_ALGOLIA_APP_ID,
    apiKey: process.env.ALGOLIA_ADMIN_KEY,
    queries,
    chunkSize: 10000, // default: 1000
 },
```

Note: you can check that the appID is being red from the _.env_ file by running:

```bash
$ console.log(process.env.GATSBY_ALGOLIA_APP_ID)
$ gatsby develop
```

The path in gatsby-config.js should be:

```js
require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});
```

4. Create a file in src/utils/algolia.js.

You can grab the data you want Algolia to index directly from the Gatsby’s GraphQL Layer. You can do so by exporting an array of objects from src/utils/algolia.js. Each object contains a required GraphQL query and an optional index name, transformer function and a settings object.

Query property: GraphQL query string
Transformer: function takes in query data and transforms it into an array of objects that will become the Algolia index records.

```js
const pageQuery = `{
docs: allMarkdownRemark(
  filter: {
    fileAbsolutePath: { regex: "/docs/" },
  }
 ) {
  edges {
    node {
      frontmatter {
        title
      contextual_links {
        type
        name
        url
      }
    }
    excerpt(pruneLength: 5000)
   }
  }
 }
}`

const flatten = arr =>
  arr.map(({ node: { frontmatter, ...rest } }) => ({
  ...frontmatter,
  ...rest,
}))

const settings = { attributesToSnippet: [`excerpt:20`] }

const queries = [{
  query: pageQuery,
  transformer: ({ data }) => flatten(data.docs.edges),
  indexName: `docs`,
  settings,
}]

module.exports = queries
```

5. Gatsby develop runs the server:

```bash
$ Run npm: build -  builds the static page
```

Your Algolia indices ‘docs’ should now populate with data.

_debugging tips_:
* If you cannot get any data in Algolia, console.log(queries) and check if the desired information is displayed.
* If it is not, run your app and go to localhost:8000/__graphql. You can copy and paste your graphql query here and check what data comes back.


---

## Algolia Frontend

Awesome! Our backend is setup, you have objects in your Algolia index, now let us get the Frontend going. Half way through 👏

1. We need 2 files in src/components/Search/

    * [searchPreview.jsx](https://github.com/postmanlabs/postman-docs/blob/develop/src/components/Search/searchPreview.jsx) — contains our custom code
    * _search.scss — for styling

In `searchPreview.jsx` you can create a custom SearchBox and define that Hits (results that come back from Algolia) are displayed only when a user types in the SearchBox. Otherwise Algolia will display all indexed results on page load by default. This is what the code looks like:

```js
import React from 'react';
import { connectSearchBox, connectHits } from 'react-instantsearch-dom';
import './_search.scss';

const SearchBox = ({ currentRefinement, refine }) => (
  <div className="ais-SearchBox">
  <form noValidate action="" role="search" className="ais-SearchBox-form">
    <input 
      className="ais-SearchBox-input"
      type="search"
      value={currentRefinement} 
      onChange={(event) => refine(event.currentTarget.value)}
    />
  </form>
</div>
);

export const CustomSearchBox = connectSearchBox(SearchBox);

// print out first and last characters around search term
const getSnippet = (excerpt, match) => {
const index = excerpt.indexOf(match);
return excerpt.substring(index - 50, index + 50);
};

// only display Hits when user types in SearchBox
const Hits = ({ hits }) => (
<ul className="style">
  {hits.map((hit) => (
    <li key={hit.title}>
      <a href={hit.fields.slug}>
        {hit.title}
        <p>{`...${getSnippet(hit.excerpt,  hit._highlightResult.title.matchedWords[0])}...`}
       </p>
     </a>
    </li>
  ))}
</ul>
);

export const CustomHits = connectHits(Hits);
```

We then included the Algolia SearchBox in our src/components/Header/ `Header.jsx` file because we wanted the search bar, centered in our Bootstrap4 navbar.

## Everything we need for Algolia Frontend

1. Import everything from Algolia that we need

```js
import algoliasearch from 'algoliasearch/lite';

import { 
  InstantSearch, 
  SearchBox, 
  Hits, 
  Configure 
 } from 'react-instantsearch-dom';

import { CustomHits } from '../Search/searchPreview';
```

2. We set a state that the searchInput field is empty

```js
constructor(props) {
  super(props);
  this.state = {
    isToggledOn: false,
    hasInput: false,
    refresh: false,
  };
}
```

3. We import the InstantSearch widget and pass our API key and AppID via the searchClient.

Note:
Algolia has several InstantSearches for various libraries and frameworks. We use **React InstantSearch**. Depending on which InstantSearch you are using, different options are available to you for the different widgets. This was not clear to me so in the beginning.

In our React InstantSearch widget, I configured InstantSearch to show 5 search results max:

```js
const searchClient = algoliasearch('4A5N71XH', 'bf5cf4783437b12c2dca33724c9c04');

<InstantSearch
  searchClient={searchClient}
  indexName="docs"
  refresh={refresh}
  >
  <Configure hitsPerPage={5} />
</InstantSearch>
```

4. Now we include the actual SearchBox. At this point in time React InstantSearch has no option to remove the default submit/reset buttons, so we are hiding them with CSS. We then define an ‘onKeyUp’ event that sets the state hasInput, once the user starts typing in the SearchBox.

```js
<InstantSearch
  searchClient={searchClient}
  indexName="docs"
  refresh={refresh}
>
  <Configure hitsPerPage={5} />

  <SearchBox
    className="searchbox"
    class="ais-SearchBox-input"
    submit={<></>}
    reset={<></>}
    translations={{
      placeholder: 'Search Postman Docs',
    }}

    onKeyUp={(event) => {
      this.setState({
        hasInput: event.currentTarget.value !== '',
       });
    }}
  />
</InstantSearch>
```

5. We then included our CustomHits widget, that takes in the Hits that are coming back from Algolia, which we define in our `searchPreview.jsx` file.

## Only show results when user starts typing

We wrap the CustomHits widget in a div that takes the current setState as a className because the CustomHits Widget does not take classNames natively, and we want to show Hits only when a user types in the SearchBox.

```js
<SearchBox
  className="searchbox"
  class="ais-SearchBox-input"
  submit={<></>}
  reset={<></>}
  translations={{
    placeholder: 'Search Postman Docs',
  }}

  onKeyUp={(event) => {
    this.setState({
    hasInput: event.currentTarget.value !== '',
    });
   }}
/>

 {/*forcefeed className because component does not accept natively as prop*/}

  <div className={!hasInput ? 'input-empty' : 'input-value'}>
    <CustomHits hitComponent={Hits} />
  </div>
</InstantSearch>
```

6. We then wrap our InstantSearch in a ClickOutHandler to close the Hits Container when the user clicks outside of the SearchResults.

```js
const ClickOutHandler = require('react-onclickout');

onClickOut = () => {
  document.getElementsByClassName('ais-SearchBox-input')[0].value = '';
  this.setState(() => ({
    hasInput: false,
  }));
}

 <ClickOutHandler onClickOut={this.onClickOut}>

 <InstantSearch
    searchClient={searchClient}
    indexName="docs"
    refresh={refresh}
  >
   ...

 </InstantSearch>
</ClickOutHandler>
```

7. Lastly we style our Sarchbox and Hits. You can style them by adding classNames or referencing Algolia’s classNames and adding our own styling by overwriting the default style. This is what our css looks like for SearchBox:

```css
.searchbox {

  input {
    background-color:#f5f5f5;
    border: 0;
    padding: 13px 24px;
    border-radius: 3px;
    width: 100%;
  }

  ::placeholder {
    color: #1c272b;
    font-size: 14px;
    font-weight: 600;
  }

  .ais-SearchBox-submit, .ais-SearchBox-reset {
    display: none;
  }
}
```

8. The last thing is to include is of course IE11 support for Aloglia in our `seo.jsx` file. We pass the script in the Gatsby Helmet.

```html
<Helmet>
  {/* Algolia IE11 support */}

  <script src="https://polyfill.io/v3/polyfill.min.js?features=default,Array.prototype.find,Array.prototype.includes" />
</Helmet>
```

And done!

---

Congratulations! You have now setup Algolia React InstantSearch in your Gatsby React App. Here is our Algolia implementation on the [Postman Learning Center](https://github.com/postmanlabs/postman-docs/blob/develop/src/components/Header/Header.jsx).