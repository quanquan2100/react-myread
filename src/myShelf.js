import React from 'react';
import * as BooksAPI from './BooksAPI'
import './App.css';
import Bookshelf from './Bookshelf';
import { Link } from 'react-router-dom';


export default class myShelf extends React.Component {

  constructor(props) {
    super(props);
    this.updateBook = this.updateBook.bind(this);
  }

  state = {
    currentlyReading: [],
    wantToRead: [],
    read: []
  }

  componentDidMount() {
    // 在此处获取数据
    this.updateBook()
  }

  updateBook() {
    BooksAPI.getAll().then(result => {
      if (result.error) {
        console.log(result.error);
      } else {
        this.setState({
          currentlyReading: result.filter(book => book.shelf === "currentlyReading"),
          read: result.filter(book => book.shelf === "read"),
          wantToRead: result.filter(book => book.shelf === "wantToRead"),
        });
      }
    });    
  }

  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <Bookshelf shelftitle="Currently Reading" books={this.state.currentlyReading} updateType={this.updateBook} />
            <Bookshelf shelftitle="Want to Read" books={this.state.wantToRead} updateType={this.updateBook} />
            <Bookshelf shelftitle="Read" books={this.state.read} updateType={this.updateBook}/>
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    );
  }
}
