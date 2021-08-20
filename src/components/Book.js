import React, { Component } from 'react';

class Book extends Component {

    handleChange = (e) => {
        const func = this.props.updateShelf;
        const book = this.props.book;
        // pass the book info and the pressed option value to the update function
        
        func(book, e.target.value);
    }

    render() {
        const books = this.props.book;
        return (
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${books.imageLinks? books.imageLinks.smallThumbnail: ''})`}}></div>
                    <div className="book-shelf-changer">
                        {/* set the current shelf value to the value attribute and change it by handleChange */}
                        <select value={books.shelf} onChange={this.handleChange}>
                            <option value="move" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{books.title}</div>
                <div className="book-authors">{books.authors ? books.authors[0] : books.authors}</div>
            </div>
        );
    }
}

export default Book;