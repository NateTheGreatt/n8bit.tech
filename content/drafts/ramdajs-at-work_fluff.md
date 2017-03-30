---
title: Ramda.js at Work
date: 3/28/2017
tags: [javascript, ramda.js, math, functional programming]
---

Recently I've been learning a lot about functional programming. To my delight I found it to be a very deep and profound subject, but I will save those diving sessions for log entries to come. This entry will contain a practical example of a fairly new functional library, [Ramda.js](http://ramdajs.com), which I just recently started to learn about.

If you aren't familiar with Ramda.js yet, it is very similar to the Underscore and Lodash libraries in that it contians many of the same function implementations. However, Ramda differs greatly in its design philosophy. Purity is emphasized, all functions are automatically curried, and the data operated on is supplied as the last argument to a function. These are powerful features, which make it easy to create functional pipelines and helps wrangle complex data structures.

Today I wanted to share how I had the opportunity to use it at work. It made me feel really awesome, because I turned ~20 lines of imperative code into **one single line** of delcarative code. As I don't want to go too far into detail, I will give a brief summary of my data's shape.

Basically, I had a collection of documents per user. Each document had a collection of user-added notes. The collection of notes inside of each document was unordered, and each note had a page property. The goal was to re-construct the document's data structure so that the notes were grouped by their page.

An imperative solution to this problem might look something like this:
```
function groupNotesByPage(documents) {
  for(var i = 0; i < documents.length; i++) {
    var document = documents[i];
    var notes = document.notes;
    for(var j = 0; j < notes.length; j++) {
      var note = notes[i];
      var page = note.page;

    }
  }
}
```
