---
title: How to integrate Algolia Search Analytics with Slack using Postman Client
date: 2020-05-27T21:07:18.354Z
thumbnail: beach.jpeg
description: Easy to follow step-by-step tutorial with lots of pictures
hashtag:
  - algolia
  - api
  - restapi
  - postman
  - slack
---
This is a step by step tutorial on how you can get your most searched terms into a Slack channel by using Postman.

## This tutorial assumes you already have Algolia implemented and have data to send to Slack. If you would like to get started with that first, here is a tutorial on [how I implemented Algolia in our Gatsby App](https://medium.com/@christinavhastenrath/tutorial-algolia-react-instantsearch-implementation-for-a-react-gatsby-app-120062f6f356).

Here is what we are going to do:

* Set up a Slack App
* Get the Algolia API Keys
* Create a GET request in Postman to store our Algolia Search Results in a global variable
* Post the global variable data from Postman to Slack
* Setup a Monitor in Postman to update Slack with Algolia Search Terms every week
* Bonus

Let’s get started 🦄

# Setting up a Slack APP in your Slack App

Slack has some pretty slick[ docs](https://api.slack.com/authentication/basics#start) on how to get started on creating an APP in Slack. I am going to walk you through the process with images. We first have to create a new Slack App[ here](https://api.slack.com/apps) and attach the newly created APP to a workspace.

![Create a Slack App](https://miro.medium.com/max/1400/0*PVesl_3B34sQoFrM "Create a Slack App")

Once this is done, you can select ‘Incoming Webhooks’ settings on the next screen

![Activate Incoming Webhooks](https://miro.medium.com/max/1400/0*KDsCkSoC2nIqPyil "Activate Incoming Webhooks")

You can then add a New Webhook to Workspace, which will open up a new screen and you can select the Slack Channel that you want to send your Algolia search results too.

You should now see a new Slack Channel in your overview and your sample request will show the URL to post to a channel. We will need this URL for our POST Request in Postman later.

![We will need the API call to Slack later for our POST request](https://miro.medium.com/max/1400/1*KwghpoQjj_reQ7bqV0k8UQ.png "We will need the API call to Slack later for our POST request")

Yay! Slack has already been setup. Now on to Postman 🏃



# Setting up your Postman collection

We are going to create a new collection in Postman with a GET request, to get the most searched terms from the [Algolia Analytics REST API](https://www.algolia.com/doc/rest-api/analytics/) and a POST Request, to post those terms to the Slack API.

We are then going to setup a monitor to control when the most searched terms are pushed to Slack in order to inform our Stakeholders.

Postman has awesome documentation in the [Learning Center](https://learning.postman.com/), build with Gatsby and fully [open source](https://github.com/postmanlabs/postman-docs) ✔️

So let’s first create a new collection in our Postman Client:

![Create a Postman Collection](https://miro.medium.com/max/704/0*_797Dw-z3pD7eGHb "Create a Postman Collection")

And then add a GET and a POST request:

![](https://miro.medium.com/max/1400/0*cz7Er-M1VsRQ5tpg)

## GET request from Algolia

We first want to get the results from the Algolia Analytics API. This is the URL:

```
https://analytics.algolia.com/2/searches?index=blog
```

Index, should be the name of the Algolia Index you want target for most searched terms.

![](https://miro.medium.com/max/1400/0*Y6tnQUSp2WirBcpM)

## Algolia analytics API Auth

In order to get the results, we have to send the Algolia Application ID and the Algolia API key for the Algolia Index in the headers of the request.

Navigate to the Headers Tab in Postman and add\
- \`X-Algolia-Application-Id\` for your Algolia Application ID\
- \`X-Algolia-API-Key\` for your Algolia Admin Key like

![Add Algolia App ID and Admin Key to the headers of your GET request](https://miro.medium.com/max/2820/1*PW7yWm5kFyLjXfdnZOI3ZQ.png "Add Algolia App ID and Admin Key to the headers of your GET request")

You can find your Algolia Header Keys in your Algolia Dashboard under ‘API Keys’:

![Algolia API Keys Dashboard](https://miro.medium.com/max/1244/1*xj6rNsNtvidOaiYu32LElA.png "Algolia API Keys Dashboard")

You should now see your results returning when hitting send:

![Postman Algolia API successful results](https://miro.medium.com/max/1400/0*-Dscqep1INF6nbUg "Postman Algolia API successful results")

*Yay results!\
How do I pass these now on to Slack via the Post Request?*Luckily Postman, makes this super easy with G[lobal Variables](https://learning.postman.com/docs/postman/variables-and-environments/variables/). Let’s do it!

## POST Request to Slack

Navigate to the ‘Tests’ tab and in here we are going to push our API response, most searched terms, into an array and store this array in a global variable. We can then call this variable in the POST request and push the data in the array to Slack.

In this example, I want to report on most searched term and how often that term was searched for. I store both values in a global variable called: \`topSearchBlog\`

![Postman Test Script to store Algolia API results in a global variable to pass on the data to the next request](https://miro.medium.com/max/1400/0*DwCRQY44dHTLq6ta "Postman Test Script to store Algolia API results in a global variable to pass on the data to the next request")

When you click on the eye button in the top right hand corner, you can see your results being stored in the section \`Globals\`

![Global Variable with most searched term in Postman](https://miro.medium.com/max/1400/1*-rkWxx2wrASqrKYcLQLhBA.png "Global Variable with most searched term in Postman")

In our POST request, we now have to define one Header:\
\`Content-Type\` and give it the value: \`application/json\`.

In the Body tab, select ‘raw’ and define the message that you want to post in your Slack Channel.\
This is what I am posting to ours:

![Do not forget to include your global variable, holding your most searched Terms with double {{ }}.](https://miro.medium.com/max/1400/0*30QRLmSNq4uHj_AD "Do not forget to include your global variable, holding your most searched Terms with double {{ }}.")

You can find the Slack API call in your Slack App ‘Incoming Webhooks’ tab, which we set up earlier: This is what mine looks like:\
*[https://hooks.slack.com/services/T02G4V5RL/BW64EP05X/pmpenviep;xnbbnfozSPbYhdEreGZtgK](https://hooks.slack.com/services/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)*

Hit send and you should get a status ok.

![The ‘text’ value will be the Slack Channel message](https://miro.medium.com/max/1400/0*UjLsvqx-gfApk3YH "The ‘text’ value will be the Slack Channel message")

And bing, here are our most searched terms:

![](https://miro.medium.com/max/1400/0*JFV5taWzP5qX_jrU)

💥 BOOM! Most Search Terms from Algolia are now in our Slack Channel.

# Setting up a Postman Monitor

I want update the slack channel with most searched terms, every Monday morning at 9 am. I can set this up in a few clicks with a [Postman Monitor](https://learning.postman.com/docs/postman/monitors/intro-monitors/).

In order to do that go back to Postman and next to the collection name, there is a button that looks like play.

![Collection Settings](https://miro.medium.com/max/1400/1*T9rM04vvFDfRI7Gd9xuIfQ.png "Collection Settings")

Just click ‘Create Monitor’ and set the time you want to push the most searched terms to Slack.

![Postman Monitor Config for automatic push to from Algolia to Slack](https://miro.medium.com/max/1400/0*B7ACnZiBA8zUhfT- "Postman Monitor Config for automatic push to from Algolia to Slack")

---

Hit \`Create\` and you are all set for automatic run of your collection. The monitor will now, every Monday morning at 9am, GET your data from Algolia and POST it into your Slack channel.

Congratulations, this completes the tutorial on how to setup an Algolia/Slack integration with Postman and push your search analytics to a Slack channel on a regular basis with Postman Monitors.

**Bonus**\
You can also report on ‘most searched terms with No Results from the Algolia REST API. Simply create a new collection and hit the correct Algolia Analytics endpoint `<https://analytics.algolia.com/2/searches/noResults?index=blog>`.

Do not forget to create a different global variable for each endpoint you query to not pollute the same variable with different request results.