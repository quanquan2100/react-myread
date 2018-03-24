import React from 'react';
import PropTypes from 'prop-types';

export default class Book extends React.Component {
  static propTypes = {
    info: PropTypes.object.isRequired
  };

  state = {}

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
            <select>
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
      </div>
    );
  }
}