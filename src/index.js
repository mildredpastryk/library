import React from 'react'
import { render } from 'react-dom'
import './App.css';
import PropTypes from 'prop-types'

let bookList = [
	{"title": "Business at the Speed of Thought", "author": "Bill Gates", "pages": 496},
	{"title": "Buffett's Bites", "author": "Warren Buffet", "pages": 224},
	{"title": "My Life & Work", "author": "Henry Ford", "pages": 188},
	{"title": "The 7 Habits of Highly Effective People", "author": "Stephen R. Covey", "pages": 432},
    {"title": "High Performance Habits", "author": "Brendon Burchard", "pages": 400}
]

const Book = ({title="No Title Provided", author="No Author", pages=0, freeBookmark}) => {
	return (
		<section>
			<h2>{title}</h2>
			<p>by: {author}</p>
			<p>Pages: {pages} pages</p>
            <p>Free Bookmark Today: {freeBookmark ? 'yes': 'no'}</p>
		</section>
	)
}

const Hiring = () =>
    <div>
        <p>We are hiring. Go to www.library.com/jobs for more.</p>
    </div>

const notHiring = () =>
    <div>
        <p>We are not hiring. Check back later for more info.</p>
    </div>

class Library extends React.Component {
    
    static defaultProps = {
       books: [
           {"title": "Success Through A Positive Mental Attitude", "author": "Napoleon Hill", "pages": 384 }
       ] 
    }
     
    
    state = { 
        open: true,
        freeBookmark: true,
        hiring: true,
        data: [],
        loading: false
    }

    componentDidMount() {
        this.setState({loading: true})
        fetch('https://hplussport.com/api/products/order/price/sort/asc/qty/1')
			.then(data => data.json())
			.then(data => this.setState({data, loading: false}))
	}
  
    componentDidUpdate() {
        console.log('The component just updated')
    }

    toggleOpenClosed = () => {
        this.setState(prevState => ({
            open:  !prevState.open
        }))
    }
    
    render () {
        const {books} = this.props
	    return (
		 <div>
            <h1 className="App-title">My Great Library</h1>
            <h2>We are {this.state.open ? 'open' : 'closed'} !</h2>
            <button onClick={this.toggleOpenClosed}>Change</button>
            {this.state.hiring ? <Hiring /> : <notHiring />}
            {this.state.loading
                 ? "loading..."
					: <div>
						{this.state.data.map(product => {
							return (
								<div key={product.id}>
									<h3>Library Product of the Week!</h3>
									<h4>{product.name}</h4>
                                    <p>€ {product.price}</p>
									<img alt={product.name} src={product.image} height={100}/>
								</div>
							)
						})}
						
					</div>
				}
            
            {books.map (
                (book, i) => 
                    <Book 
                        key={i}
                        title={book.title} 
                        author={book.author} 
                        pages={book.pages}
                        freeBookmark={this.state.freeBookmark}/>
            )}
		 </div>
	    )
    }
}

Library.propTypes = {
	books: PropTypes.array
}

Book.propTypes = {
	title: PropTypes.string,
	author: PropTypes.string,
	pages: PropTypes.number,
	freeBookmark: PropTypes.bool
}

render(
    <Library books={bookList} />, 
	document.getElementById('root')
)
