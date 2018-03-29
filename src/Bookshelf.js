import React from 'react';
import Book from './Book';

const Bookshelf = (props) => {
  return (
    <div className="bookshelf">
        <h2 className="bookshelf-title">{props.shelftitle}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {props.books.map((book, index) => (
              <li key={index}>
                <Book info={book} updateType={props.updateType} />
              </li>
            ))}
          </ol>
          {props.books.length || <div>no book</div>}
        </div>
      </div>
  )
}

export default Bookshelf;