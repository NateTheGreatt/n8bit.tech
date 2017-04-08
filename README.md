# n8bit.tech

> Fully static, personal blog

In this project, Webpack's [`require.context`](https://webpack.github.io/docs/context.html) is utilized to create a collection of posts that are parsed from a directory of .md files (see `/content`). A `PostService` exists (see `/services`) that uses [`Ramda.js`](http://ramdajs.com) to filter and sort through the collection of posts. This service is used within page components (see `/pages`) in order to retrieve relevant post data.

A Nuxt.js template is in the works that mimics this setup.

## Build Setup

``` bash
# install dependencies
$ npm install # Or yarn install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, checkout the [Nuxt.js docs](https://github.com/nuxt/nuxt.js).
