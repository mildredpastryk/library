import React from 'react'
import { render } from 'react-dom'
import Library from './Library'

let bookList = [
	{"title": "Business at the Speed of Thought", "author": "Bill Gates", "pages": 496},
	{"title": "Buffett's Bites", "author": "Warren Buffet", "pages": 224},
	{"title": "My Life & Work", "author": "Henry Ford", "pages": 188},
	{"title": "The 7 Habits of Highly Effective People", "author": "Stephen R. Covey", "pages": 432},
    {"title": "High Performance Habits", "author": "Brendon Burchard", "pages": 400}
]

render(
    <Library books={bookList} />, 
	document.getElementById('root')
)
