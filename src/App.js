import React from 'react';
import { Route, Link } from 'react-router-dom';
// import PropTypes from 'prop-types';
import * as BooksAPI from './BooksAPI'
import './App.css';
import Findbook from './Findbook';
import MyShelf from './MyShelf';

class BooksApp extends React.Component {

  constructor(props) {
    super(props);
    this.getBooks = this.getBooks.bind(this);
  }

  state = {
    books: []
  }

  componentDidMount() {
    // 在此处获取数据
    this.getBooks();
  }

  getBooks() {
    BooksAPI.getAll().then(result => {
      if (result.error) {
        console.log(result.error);
      } else {
        this.setState({
          books: result
        });
      }
    });
  }

  render() {
    return (
      <div className="app">
        <Route path="/" exact render={() =>
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <MyShelf books={this.state.books} updateBook={this.getBooks}/>
            </div>
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>
        } />

        <Route path="/search" exact render={() =>
          <div>
            <Findbook updateBook={this.getBooks} books={this.state.books} />
          </div>
        } />
      </div>
    )
  }
}

export default BooksApp