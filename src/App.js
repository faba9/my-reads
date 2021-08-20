import React from 'react';
import * as BooksAPI from './BooksAPI';
import './App.css';
import { Route, Link, BrowserRouter } from 'react-router-dom';
import Book from './components/Book';
import SearchBooks from './components/searchBooks';

class BooksApp extends React.Component {
  // books will contains all books from api.
  state = {
    books:[]
  }

  getAllData = () => {
    // get all books from api and update the state.
    BooksAPI.getAll().then(books => {
      this.setState({books})
   })
  }

  componentDidMount () {
    // call get data function to get data.
   this.getAllData();
  }

  UpdateShelf = (book, newShelf) => {
    
    // pass book and new shelf name to update the current shelf.
    BooksAPI.update(book, newShelf).then(() => {

      // call get data function to get data after updating the book shelf.
      this.getAllData();
    })
  }

  render() {

    // filter books by shelf name.
    const currentReading = this.state.books.filter(book => book.shelf === 'currentlyReading');
    const wantToRead = this.state.books.filter(book => book.shelf === 'wantToRead');
    const Read = this.state.books.filter(book => book.shelf === 'read');

    return (
      <BrowserRouter>
        <div className="app">
          {/* if path was /(main page) then render the main page */}
          <Route exact path="/" render={()=>
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
            <div className="list-books-content">
              
              <div className="bookshelf">
                <h2 className="bookshelf-title">Currently Reading</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                    {/* map through the books that have the same shelf name  */}
                    
                      {currentReading.map(book => {
                        // for each book pass the book info + updateshelf function to update the shelf + the name of shelf
                        return <li key={book.id}><Book book={book} updateShelf={this.UpdateShelf} /></li>
                      })}
                    
                  </ol>
                </div>
              </div>

              <div className="bookshelf">
                <h2 className="bookshelf-title">Want To Read</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                    {/* map through the books that have the same shelf name  */}
                    {wantToRead.map(book => {
                        return <li  key={book.id}><Book book={book} updateShelf={this.UpdateShelf}/></li>
                      })}
                  </ol>
                </div>
              </div>

              <div className="bookshelf">
                <h2 className="bookshelf-title">Read</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                    {/* map through the books that have the same shelf name  */}
                    {Read.map(book => {
                        return <li key={book.id}><Book book={book} updateShelf={this.UpdateShelf}/></li>
                      })}
                  </ol>
                </div>
              </div>
            </div>

            <div className="open-search">
              {/* if button clicked thenen go to the /search page */}
              <Link to="/search"><button>Add a book</button></Link>
              </div>
            </div>
          }/>


          {/* if path was /search then render the search page */}
          <Route exact path="/search" render={() =>
            <SearchBooks updateDate={this.UpdateShelf} />
          }/> 
        </div>
      </BrowserRouter>
    )
  }
}
export default BooksApp;