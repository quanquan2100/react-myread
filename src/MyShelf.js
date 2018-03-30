import React from 'react';
import Bookshelf from './Bookshelf';

const MyShelf = (props) => {
  const currentlyReading = props.books.filter(book => book.shelf === "currentlyReading");
  const read = props.books.filter(book => book.shelf === "read");
  const wantToRead = props.books.filter(book => book.shelf === "wantToRead");

  return (
    <div>
      <Bookshelf shelftitle="Currently Reading" books={currentlyReading} updateType={props.updateBook} />
      <Bookshelf shelftitle="Want to Read" books={wantToRead} updateType={props.updateBook} />
      <Bookshelf shelftitle="Read" books={read} updateType={props.updateBook}/>
    </div>
  );
}

export default MyShelf;
