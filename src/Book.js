import React from 'react';
import PropTypes from 'prop-types';
import * as BooksAPI from './BooksAPI';

export default class Book extends React.Component {
  static propTypes = {
    info: PropTypes.object.isRequired
  };

  state = {
    disable: "none"
  }

  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.updateBook = this.updateBook.bind(this);
  }

  cleanData(data) {
    if (!data) {
      return false;
    }

    const book = {
      "id": "",
      "title": "",
      "thumbnail": "",
      "authors": ""
    };

    book.id = data.id;
    book.title = data.title || "";
    book.shelf = data.shelf || "none";

    if (data.imageLinks && data.imageLinks.thumbnail) {
      book.thumbnail = data.imageLinks.thumbnail;
    }
    
    if (data.authors && data.authors instanceof Array) {
      book.authors = data.authors.join(", ");
    } else if (data.authors && typeof data.authors === "string") {
      book.authors = data.authors;
    }

    return book;
  }

  handleChange(e) {
    const newShelf = e.target.value;
    const book = this.props.info;
    if (typeof this.props.updateType === "function") {
      this.setState({
        disable: "block"
      });
      BooksAPI.update(book, newShelf).then(result => {
        this.setState({
          disable: "none"
        });
        console.log(result);
        // get()
        this.props.updateType(result);
      }).catch(err => console.log(err));
    } else {
      console.log("no props.updateType", newShelf, book);
    }
  }

  updateBook(book, shelf) {

  }

  render() {
    const info = this.cleanData(this.props.info);
    // console.log("info cleanto", info);
    if (!info) {
      return "";
    }

    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url("' + info.thumbnail + '")' }}></div>
          <div className="book-shelf-changer">
            <select value={info.shelf} onChange={this.handleChange}>
              <option value="none" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{info.title}</div>
        <div className="book-authors">{info.authors}</div>
        <div style={{ display: this.state.disable, position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0, 0, 0, .3)", zIndex: 100}}></div>
      </div>
    );
  }
}