import React from 'react';
import Search from './Search';
import Book from './Book';
import _ from 'underscore';
import PropTypes from 'prop-types';
import * as BooksAPI from './BooksAPI';
import MyShelf from './MyShelf';

export default class Findbook extends React.Component {
  constructor() {
    super();
    this.updateQuery = this.updateQuery.bind(this);
    this.updateBook = this.updateBook.bind(this);
  }

  static propTypes = {
    findResult: PropTypes.array,
    query: PropTypes.string
  }

  state = {
    findResult: [],
    query: ""
  }

  updateBook() {
    console.log("updateBook", arguments);
  }

  updateQuery(query) {
    const val = query.trim();
    this.setState({ query: val });
    this.searchBook(val);
  }

  searchBook = _.debounce((query) => {
    if (query) {
      BooksAPI.search(query).then(result => {
        console.log("搜索结果", result);
        if (result.error) {
          this.setState(preVal => ({ "findResult": [] }))
        } else {
          this.setState(preVal => {
            return ({ "findResult": result });
          });
        }
      });
    } else {
      this.setState({
        findResult: this.props.books
      })
    }
  }, 300)

  render() {
    let typeNone, typeOther, bookId;
    if (this.state.findResult.length === 0 && this.state.query === "") {
      typeNone = [];
      typeOther = this.props.books;
    } else {
      bookId = this.props.books.reduce((idArr, book) => {
        idArr[book.id] = book.shelf;
        return idArr;
      }, {});
      typeNone = this.state.findResult.filter(book => !bookId[book.id]);
      typeOther = this.state.findResult.filter(book => !!bookId[book.id]);
      typeOther.forEach(book => book.shelf = bookId[book.id]);
    }
    return (
      <div>
        <div className="search-books">
          <Search updateQuery={this.updateQuery} query={this.state.query} />
          <div className="search-books-results">
            <ol className="books-grid">
              {typeNone.map((book, index) => (<li key={book.id}><Book info={book} updateType={this.props.updateBook} /></li>))}
            </ol>
          </div>
        </div>
        <div className="list-books-content">
          <MyShelf books={typeOther} updateBook={this.getBooks}/>
        </div>
      </div>
    );
  }
}