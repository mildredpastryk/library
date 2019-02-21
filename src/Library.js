

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

export default Library 