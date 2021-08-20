import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { search } from '../BooksAPI';
import Book from './Book';

class SearchBooks extends Component {

    state = {
        // books will contains all books from search function.
        books : [],
        value:''
    }

    handleChange = (e) => {
        // set query to the current value of target.
        const query = e.target.value;
        search(query).then(resBooks=> {
            
            // then update the value with query value and books with result books.
            this.setState({value:query, books:resBooks})
        });
    }

    render() {
        const books = this.state.books;
       
        return (
            <div>
                <div className="search-books">
                    <div className="search-books-bar">
                    <Link to='/'><button className="close-search">Close</button></Link>
                    <div className="search-books-input-wrapper">
                        {/* set the iput value to the value in state which contains the traking value of current target. */}
                        <input type="text" value={this.state.value} placeholder="Search by title or author" onChange={this.handleChange}/>
                    </div>
                    </div>
                    <div className="search-books-results">
                        {/* use codition if value was empty then render the message down here. */}
                        {this.state.value.length === 0 ? (
                        <p className='message'>There is no book has been typed .. <span>Search for Something</span></p>
                        ) : (
                            // else check the length of books which contains the result
                            this.state.books.length > 0 ? (
                                <ol className="books-grid">
                                {/* if not empty render the books to book component */}
                                {books.map(book => {
                                    book.shelf = 'none';
                                    return <li key={book.id}><Book book={book} updateShelf={this.props.updateDate} /></li>
                                })}
                                </ol>
                            ) : (
                                // else render the message down here.
                                <p className='message'>There is no book with this name <span >({this.state.value})!</span></p>
                            )
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

export default SearchBooks;