---
title: REST APIs in Gatsby at Runtime
date: 2020-04-23T18:55:31.656Z
thumbnail: ./computer-6.jpeg
description: This is a step-by-step tutorial on how to call external REST APIs
  in Gatsby at runtime using Axios.
hashtag:
  - Gatsbyjs
  - REST API
  - Axios
  - JavaScript
  - React
---
![](computer-6.jpeg)

This tutorial assumes you already have a Gatsby App up and running. If you are new to Gatsby, they have a great starter tutorial and documentation.

The Gatsby docs describe how you can add a REST API call in your app at Buildtime. You do this by using the createPages API in the gatsby-node.js file.

For our use case, we wanted to call the REST API endpoint at Runtime instead. Our browsers take care of the caching, which is great because we do not have to do anything extra for that.

## API response with Postman

Alright, first things first. When you receive the REST API endpoints, head over to your Postman Client to run a GET request and check that all data that you need is coming back. Postman has great docs if you would like to know more about how to set authorization for your API call.
![](https://miro.medium.com/max/1400/1*AeyF__1Dr7JM9y3xkpmHSA.png)

## Inside the Gatsby App

This is what our API endpoint looks like:

*https://covid-19testing.github.io/locations/${state}/complete.json*

In our example, we are going to hit several API endpoints with the same API call and create paths for each endpoint. Each ```${state}``` variable will be a new endpoint and return a response with new data. We could have stored all of our response data in one API endpoint, but we decided to split up the endpoints to significantly increase our App’s performance.

Once you confirm the correct API response, open up your Gatsby App and navigate to ```gatsby-node.js```. In here we are going to use the *createPages API* to create a page template for the API response data and the *context API* to pass each variable to our components.

## /gatsby-node.js
This is what our code looks like in gatsby-node.js:

![](https://miro.medium.com/max/1400/1*lJ9sWEKX4zuoB5v85WCl_g.png)

Basically, we are looping through our Array of states and adding each state into the path and into the context of the createPage API. For Each path we then resolve a template, which we are going to build next.

## src/template/stateSiteTemplate.jsx
This is the template that will resolve once the path with a state is resolved.

We are going to make the REST API call with Axios and have to install it with a package manger such as npm or yarn.

```$ npm install axios```

We can now pass in our pageContext data into our component…

![](https://miro.medium.com/max/1400/1*qdTGmn1OnvZZRGWZr4i4LQ.png)

… and defined the StateListComponent to call the API with our state.

![](https://miro.medium.com/max/1400/1*R1jPGPGgzbXIbw467gIvJw.png)
We store the response data in ```this.state```. This way we can use the data in our render() method by mapping over it and displaying any response data that we need with dot notation.

![](https://miro.medium.com/max/1400/1*trCPv7Ms9V7d1FlwPjZGRA.png)

We now display the data coming back from three different endpoints on three different paths, with one API call and one template. wohoo!

---

We also wanted to display the data of several endpoints in cards on the index page. Therefore we needed another Axios call.

## ./index.js
In ```index.js``` we create a Class Componet and write another Axios call to store our response data in the component’s state.

Again we get our state variable from the context API with a GraphQL call.

![](https://miro.medium.com/max/1400/1*HLNLnzHwY8oUv1LsvWu2rA.png)

Run your app with ```$ gatsby develop```. Now we can test the GraphQL call in Postman and check that our Context API is returning the correct response. This is the data we set in *gatsby-node.js*.

![](https://miro.medium.com/max/1400/1*1rgwogcnPqXzv8FmCsm53Q.png)

We then then pass the data from the GraphQL call into our Class Component, which we define in the same file:

![](https://miro.medium.com/max/1400/1*QUQeVk5riJHBr7zCuqYgBg.png)

Basically we are calling our API with our state variables that come from the context API. We then write a conditional to store the data in the component’s state under this.state so that we can pass all the response data into the *render()* function.

---

This completes the tutorial. I hope I could help you implement REST API calls in Gatsby at Runtime. Doing this will update your app as the API response updates and the browser will handle the caching for you. We decided to break up our API endpoint for performance reasons and use the createPages and Context API to handle our data and pass it to components and templates.

Happy hacking!