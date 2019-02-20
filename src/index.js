import React from 'react'
import { render } from 'react-dom'
import './App.css';

let bookList = [
	{"title": "Business at the Speed of Thought", "author": "Bill Gates", "pages": 496},
	{"title": "Buffett's Bites", "author": "Warren Buffet", "pages": 224},
	{"title": "My Life & Work", "author": "Henry Ford", "pages": 188},
	{"title": "The 7 Habits of Highly Effective People", "author": "Stephen R. Covey", "pages": 432},
    {"title": "High Performance Habits", "author": "Brendon Burchard", "pages": 400}
]

const Book = ({title, author, pages}) => {
	return (
		<section>
			<h2>{title}</h2>
			<p>by: {author}</p>
			<p>Pages: {pages} pages</p>
		</section>
	)
}

class Library extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            open: true
        }
        this.toggleOpenClosed = this.toggleOpenClosed.bind(this)
    }
    toggleOpenClosed() {
        this.setState(prevState => ({
            open:  !prevState.open
        }))
    }
    render () {
        console.log(this.state)
        const {books} = this.props
	    return (
		 <div>
            <h1 className="App-title">My Library</h1>
            <h2>We are {this.state.open ? 'open' : 'closed'}</h2>
            <button onClick={this.toggleOpenClosed}>Change</button>
            {books.map (
                (book, i) => 
                    <Book 
                        key={i}
                        title={book.title} 
                        author={book.author} 
                        pages={book.pages}/>
            )}
		 </div>
	    )
    }
}

render(
    <Library books={bookList} />, 
	document.getElementById('root')
)
