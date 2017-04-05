---
title: Ramda.js at Work
date: 3/31/2017
tags: [javascript, ramda.js, functional programming, partial application]
---

I've been learning a lot about functional programming (FP) lately. I found it rather difficult to grasp at first, being so accustomed to object-oriented programming. For this reason, I am sharing an illuminating experience I had recently.

This entry will contain a practical, albeit simple, example of a relatively new functional library, [Ramda.js](http://ramdajs.com), which I'm only just starting to learn about. If you're familiar with Ramda.js or FP in general, you might find some of this to be elementary. If not, read on!

Last week I had the opportunity to use it at work. It blew my mind because I was able to turn dozens of lines of [imperative code](https://en.wikipedia.org/wiki/Imperative_programming) into **one single line** of [declarative code](https://en.wikipedia.org/wiki/Declarative_programming). On top of that, it was more generic and reusable.

First, let me give a simplified overview of the data's shape: We shall start with a collection of documents per user. Each document has a collection of notes. The collection of notes inside of each document is unordered, and each note has a page, value, and color property.

The objective is to reconstruct a document's data structure so that the notes are grouped by the page they reside on.

An imperative solution to this problem might look something like this:
```
function groupNotesByPage(document) {
  var pages = {};
  var notes = document.notes;

  for(var i = 0; i < notes.length; i++) {
    var note = notes[i];
    var page = note.page;
    if(pages[page]) pages[page].push(note);
    else pages[page] = [note];
  }

  return pages;
}
```

Great! Now the notes of our supplied document can be grouped by the page that they reside on. But wait -- what if I get a hypothetical requirement to group by color, too? I would have to modify our function to do so. This time, it can be more generic than the last:

```
function groupNotesByProperty(document, property) {
  var result = {};
  var notes = document.notes;

  for(var i = 0; i < notes.length; i++) {
    var note = notes[i];
    var propValue = note[property];
    if(result[propValue]) result[propValue].push(note);
    else result[propValue] = [note];
  }

  return result;
}
```

Hooray! Now we can group our notes together using any of their properties. Oh no! What's that? Another hypothetical requirement? Boss says we are adding a bookmarks array to the document. Bookmarks will have the same structure as notes do and we need to have all of the same grouping functionality, too.

It's time to refactor the function to take a generic type into consideration (which will be either `notes` or `bookmarks` in this context), as well as replacing the imperative for-loop with a declarative iterator. Let's make the data we're working on agnostic while we're at it:

```
function groupTypeByProperty(object, type, property) {
  var result = {};
  var types = object[type];

  types.forEach(function(typeObject) {
    var propValue = typeObject[property];
    if(result[propValue]) result[propValue].push(note);
    else result[propValue] = [note];
  })

  return result;
}
```

Nice. Now all arguments are generic, and the for-loop has been successfully refactored out!

This code works nicely for the situation where you need to reach two levels deep into a supplied object, expecting the `type` argument's eventual value to be an array. But what if we needed to reach three, four, or even five levels in? What if notes get pages of their own? You can see where I'm going with this.

While I can certainly continue to refactor this function to be more and more imperatively generic, I'm going to stop here with the imperative style, and switch over to more of a declarative style. This is where things get fun :).

Okay Ramda, you can come out now. Come on... don't be shy.

```
import R from 'ramda'
```

There he is! Watch this... Ramda, go fetch the new bookmarks property from this supplied document! ***ARF ARF!***

```
var bookmarks = R.prop('bookmarks', document)
```

Good boy! But... so what? Well, here's a fun fact: in Ramda (and FP in general), we can "curry" our functions, which means they can be **partially applied**. Partial application is probably one of the most, if not the most, powerful feature in Ramda and FP.

Okay now check this out: Ramda, go fetch me a function that, when supplied a property name, **returns another function**. This returned function should **accept the data object that contains the property**, and effectively **return the value of that property**:

```
var getBookmarks = R.prop('bookmarks')
```

Did you see that? All I had to do was leave the last parameter out of the function call, and the function was automatically curried. We can now use `getBookmarks` like this:

```
var bookmarks = getBookmarks(document)
```

We pass in our hypothetical document, which, under the hood, is equivalent to passing a second parameter to the `R.prop` function. We're only half done, though! We still need to group by a specific property. Again, Ramda has our back. Meet `R.groupBy` and it's documented definition:

`Splits a list into sub-lists stored in an object, based on the result of calling a String-returning function on each element, and grouping the results according to values returned.`

Uh... what? Hard to grok out of context. Let's see this in action. I'm going to create a partially applied function that will group by the page property of a future-supplied document:

```
var groupByPage = R.groupBy(function(type) {
  return type.page
})
```

Easy enough. However, we should swap out `type.page` with `R.prop('page',type)`:

```
var groupByPage = R.groupBy(function(type) {
  return R.prop('page',type)
})
```

Why? Well, thanks to currying, it allows us to take this one step further:

```
var groupByPage = R.groupBy(R.prop('page'))
```

`R.groupBy` was not given all of the arguments it requires, and neither was `R.prop`. Partially applied functions are returned from both of these Ramda functions, which allows us to use `groupByPage` like this:

```
groupByPage(document.bookmarks)
```

And BAM. The same result we got from our imperative approach, except much more succinct, reusable, and easier to reason about. All neatly composed with two little generic functions provided by Ramda.

We can continue creating higher-order functions as needed:

```
var groupBookmarksByPage = groupByPage(R.prop('bookmarks'))
var bookmarksGroupedByPage = groupBookmarksByPage(document)
```

There you have it! One practical example of how two functions from Ramda can save you many lines of code, and many more points of sanity! If you want to learn more about what Ramda is capable of, [check out the docs](http://ramdajs.com/docs/)! There are a lot of these little functions that can be composed into larger functional piplines, which helps to wrangle complex data structures and tackle complicated logic in a sussinct and reasonable manner.

I hope this experience was as illuminating for you as it initially was for me. Something tells me that Ramda is going to be quite the faithful companion on my journey forward.
