---
title: Practical Pipelines
date: 4/6/2017
tags: [javascript, ramda.js, functional programming, functional pipelines]
---

In my [previous log entry](/log/ramdajs-at-work) I shared a simple, yet practical approach to partial function application using Ramda.js. In this entry I will also be using Ramda.js, this time to compose **functional pipelines**, otherwise known as **functional compositions**. As usual, I will attempt to maintain practicality by using realistic data models.

The concept of function composition lies at the very heart of functional programming, and can help manage and transform complex data structures in digestable ways. Pipelines/compositions are built up by *composing* or *piping* smaller, simpler partially applied functions together into a linear sequence of transformations. This makes code more readable, easier to reason about, and extremely reusable.

Let's start with a collection of songs. Each `song` has an `id`, `url`, and `metadata` property. The `metadata` property contains `genres`, `artist`, `album`, and `title` as properties. For example:

```
let song = {
  id: 42,
  url: 'http://mrcoolguy.music/coolsong.mp3',
  metadata: {
    genres: ['jazz','hiphop','triphop'],
    artist: 'mr cool guy',
    album: 'coolest album',
    title: 'cool song'
  }
}
```

I want to create some pipelines for sorting and filtering through this hypothetical collection of `songs`. To start, how about a pipeline that gets all unique genres from this `song` collection? That sounds pretty useful.

Last entry I introduced `R.prop`, which reaches into an object and returns the value of the supplied property name. That only reaches one layer in, however, so we won't be able to access the nested `genres` property with it.

Meet `R.path`:

```
let getGenres = R.path(['metadata','genres'])
getGenres(song) // ['jazz','hiphop','triphop']
```

This handy little function reaches as many levels into an object as you want, and returns the value at that "address" (the *path* to the desired value).

Combined with `R.map`, it can be used to extract all of the genres from every `song` in the whole collection:

```
let getAllUniqueGenres = R.map(getGenres)
getAllGenres(songs) // [['jazz','hiphop','triphop'],['rock','indie'],['dubstep'],['rock','alternative']]
```

Pretty neat! But not ideal because a nested array is returned with duplicate genres. Luckily, Ramda can help clean this up.

First I have to introduce the bread and butter of functional pipelines: `R.pipe` and `R.compose`. Basically, they both pass data through a chain (pipeline/composition) of functions. It's really that simple. The only difference? **Direction**.

Allow me to demonstrate. In this case, the data being passed through the pipeline is our `songs` collection:

```
let getAllUniqueGenresPiped = R.pipe(getAllGenres, R.flatten, R.uniq)
let allGenresPiped = getAllUniqueGenresPiped(songs) // ['jazz','hiphop','triphop','rock','indie','dubstep','alternative']
```

Breakdown:
- The `songs` collection is *piped* into `getAllGenres`, which returns an array of arrays:
  - `[['jazz','hiphop','triphop'],['rock','indie'],['dubstep'],['rock','alternative']]`

- This tranformed output is piped into `R.flatten`, which flattens the nested arrays into one array (containing duplicates):
  - `['jazz','hiphop','triphop','rock','indie','dubstep','rock','alternative']`

- That output is then piped into `R.uniq`, removing all duplicates from the array:
  - `['jazz','hiphop','triphop','rock','indie','dubstep','alternative']`

Illustration:
`songs -> getAllGenres(songs) -> R.flatten(getAllGenres(songs)) -> R.uniq(R.flatten(getAllGenres(songs))))`

It's literally just like a pipeline! `R.pipe` passes the data from left-to-right, as if each of the functions were directly connected input-to-output.

Each function in the pipeline acts like a [blackbox](https://en.wikipedia.org/wiki/Black_box), which is anything that "can be viewed in terms of its inputs and outputs, without any knowledge of its internal workings." We are unaware of the inner workings of `R.flatten` and `R.uniq`, other than the function names themselves. The idea is that *we don't need that awareness*. These "blackbox" functions are aptly named so that it is easy to infer how they treat data passing through. In this way, writing functional code is practically self-documenting.

Opposite of `R.pipe`, `R.compose` passes the data from right-to-left:

```
let getAllUniqueGenresComposed = R.compose(R.uniq, R.flatten, getAllGenres)
let allGenresComposed = getAllUniqueGenresComposed(songs) // ['jazz','hiphop','triphop','rock','indie','dubstep','alternative']

R.equals(allGenresPiped, allGenresComposed) // true
```

`R.equals` can be used to check if arrays are equal, which in this case they are.

Did you notice that the `getAllUniqueGenresComposed` function definition looks identical to the end of the `getAllUniqueGenresPiped` illustration?

```
// returns true
R.equals(
  R.compose(R.uniq, R.flatten, getAllGenres))(songs), // getAllGenresComposed definition
  R.uniq(R.flatten(getAllGenres(songs)))) // getAllGenresPiped illustration
)
```

:)

Essentially, `R.pipe` and `R.compose` are both used to string together function calls by abstracting out the nesting behavior. There is no right or wrong choice between the two, other than what makes the most sense to you.

Here's the best part: pipelines are *totally **nestable***. This is where the idea really starts to flourish.

Weilding this newfound knowledge, let's construct a new pipeline that **filters songs by a genre**, *and* **sorts them alphabetically** by **artist name**. I prefer using `R.pipe`, so that's what I'm going to build this next pipeline with:

```
// constants
let genresPath = ['metadata','genres']
let artistPath = ['metadata','artist']

// partially applied "getters"
let getGenres = R.path(genresPath)
let getArtist = R.path(artistPath)

// partially applied functions
let containsGenre = (genre) => R.pipe(getGenres, R.contains(genre)) // checks if a song has a specific genre
let filterSongsByGenre = (genre) => R.filter(containsGenre(genre)) // returns songs of a specififed genre
let rejectSongsByGenre = (genre) => R.reject(containsGenre(genre)) // inverse of filter, returns songs that are not of a specified genre

let byArtist = (artist) => R.pathEq(artistPath, artist) // R.pathEq checks if a path's value is equal to the given value
let filterSongsByArtist = (artist) => R.filter(isByArtist(artist))
let sortByArtistAscending = R.sortBy(getArtist)
let sortByArtistDescending = R.pipe(R.sortBy(getArtist), R.reverse)

// pipe them together to create higher-order, still partially applied, functions
let filterRockSongsSortedByArtist = R.pipe(filterSongsByGenre('rock'), sortByArtistAscending)
let rejectRockSongsSortedByArtist = R.pipe(rejectSongsByGenre('rock'), sortByArtistDescending)

// invoke our pipeline(s) with some data
let allRockSongsSortedByArtist = filterRockSongsSortedByArtist(songs)
let allMrCoolGuyJazzSongs = R.pipe(filterSongsByArtist('mr cool guy'), filterSongsByGenre('jazz'))(songs)

```

Very nice.

As you can see, piping and composing allows data to be processed through a deep, intricate nest of function calls, all the while remaining readable and maintainable. This allows higher-order functions to be woven together into complicated functional pipelines, that are also easy to reason about.

I have found Ramda.js to be a fantastic introduction to the world of functional programming. This is mainly because of how well it adheres to the true nature of functional programming itself: [Lambda Calculus]().
