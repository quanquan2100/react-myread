import React from 'react';
import { Route } from 'react-router-dom';
// import PropTypes from 'prop-types';
// import * as BooksAPI from './BooksAPI'
import './App.css';
// import Bookshelf from './Bookshelf';
import Findbook from './Findbook';
import myShelf from './myShelf';

class BooksApp extends React.Component {
  state = {
    currentlyReading: [],
    wantToRead: [],
    read: []
  }

  // componentDidMount() {
  //   // 在此处获取数据
  //   BooksAPI.getAll().then(result => {
  //     console.log(result)
  //     if (result.error) {
  //       console.log(result.error);
  //     } else {
  //       console.log({
  //         currentlyReading: result.filter(book => book.shelf === "currentlyReading"),
  //         read: result.filter(book => book.shelf === "read"),
  //         wantToRead: result.filter(book => book.shelf === "wantToRead"),
  //       })
  //       this.setState({
  //         currentlyReading: result.filter(book => book.shelf === "currentlyReading"),
  //         read: result.filter(book => book.shelf === "read"),
  //         wantToRead: result.filter(book => book.shelf === "wantToRead"),
  //       });
  //     }
  //   });
  // }

  render() {
    return (
      <div className="app">
        <Route path="/search" exact component={Findbook} />
        <Route path="/" exact component={myShelf} />
      </div>
    )
  }
}

export default BooksApp