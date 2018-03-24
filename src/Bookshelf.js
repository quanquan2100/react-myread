import React from 'react';
import PropTypes from 'prop-types';
import Book from './Book';

export default class Bookshelf extends React.Component {
  static propTypes = {
    shelftitle: PropTypes.string.isRequired,
    books: PropTypes.array.isRequired
  };

  // constructor(props) {
  //   super(props);
  // }

  render() {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.shelftitle}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {this.props.books.map((book, index) => (
              <li key={index}>
                <Book info={book} />
              </li>
            ))}
          </ol>
        </div>
      </div>
    );
  }
}
