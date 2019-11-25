<!-- TABLE OF CONTENTS -->
## Table of Contents

* [About the Project](#about-the-project)
  * [Built With](#built-with)
* [Getting Started](#getting-started)
  * [Prerequisites](#prerequisites)
  * [Installation](#installation)
* [Usage](#usage)
* [Roadmap](#roadmap)


<!-- ABOUT THE PROJECT -->
## About The Project

A digital sales assistant application for Shopify. Ever find yourself purchasing something which you have absolutely no clue about? Maybe a dishwasher, rollerblades or a chick stick for that special someone. Vendy provides an interface to ask you questions about your purchasing decision to guide you to the best fit product! You find what you're looking for faster, and the retailer's conversion rate increases - win win!

### Built With
* [Nodejs](https://nodejs.org/en/)
* [React](https://reactjs.org/)
* [Nextjs](https://nextjs.org/)
* [GraphQL](https://graphql.org/)
* [Apollo](https://www.apollographql.com/)
* [Polaris](https://polaris.shopify.com/)
* [Shopify](https://partners.shopify.com/)



<!-- GETTING STARTED -->
## Getting Started

### Prerequisites

* npm
```sh
npm install npm@latest -g
```
* Shopify test development store - I've created one [here](https://fullstack-test.myshopify.com/)

### Installation

1. Clone the repo
```sh
git clone https://github.com/oreilm49/vendy.git
```
3. Install NPM packages
```sh
npm install
```
4. Follow steps [here](https://developers.shopify.com/tutorials/build-a-shopify-app-with-node-and-react/embed-your-app-in-shopify) to embed app in shopify



<!-- USAGE EXAMPLES -->
## Usage

1. Run the app
```sh
npm run dev
```
2. Open a new terminal and forward traffic from localhost to reverse proxy (you'll need ssh access to the server)
```sh
ssh -nN -R 8000:localhost:3000 USER@dev.markoreilly.xyz
```
3. Add the proxy url to Shopify. Go to the [app set up page for vendy](https://partners.shopify.com/991203/apps/3274991/edit) and paste the link into the App URL input and then into the Whitelisted redirection input with this format: https://dev.markoreilly.xyz/auth/callback and save. Full guide [here](https://developers.shopify.com/tutorials/build-a-shopify-app-with-node-and-react/embed-your-app-in-shopify#authenticate-and-test) This embeds the new instance of the app in shopify.

4. Once the above steps have been followed you should be able to see the app running at
```
https://fullstack-test.myshopify.com/admin/apps/vendy
```


<!-- USAGE EXAMPLES -->
## Roadmap

1. Build UI for adding questions
2. Build frontend