import React from 'react';
import Search from './Search';
import Book from './Book';
import _ from 'underscore';
import PropTypes from 'prop-types';
import * as BooksAPI from './BooksAPI';

export default class Findbook extends React.Component {
  static propTypes = {
    findResult: PropTypes.array,
    query: PropTypes.string
  }

  state = {
    findResult: [],
    query: ""
  }

  constructor() {
    super();
    this.updateQuery = this.updateQuery.bind(this);
    this.updateBook = this.updateBook.bind(this);
  }

  updateBook() {
    console.log("updateBook", arguments);
  }

  componentDidMount() {
    // 在此处获取数据
    BooksAPI.getAll().then(result => this.setState({ "findResult": result }));
  }

  updateQuery(query) {
    const val = query.trim();
    this.setState({ query: val });
    this.searchBook(val);
  }

  searchBook = _.debounce((query) => {
    if (query) {
      BooksAPI.search(query).then(result => {
        console.log(result);
        if (result.error) {
          this.setState(preVal => ({ "findResult": [] }))
        } else {
          this.setState(preVal => {
            return ({ "findResult": result });
          });
        }
      });
    } else {
      BooksAPI.getAll().then(result => {
        this.setState(preVal => {
          console.log(result);
          return ({ "findResult": result });
        });
      });
    }
  }, 300)

  render() {
    return (
      <div className="search-books">
        <Search updateQuery={this.updateQuery} query={this.state.query} />
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.findResult.map((book, index) => (<li key={book.id}><Book info={book} updateType={this.updateBook} /></li>))}
          </ol>
        </div>
      </div>
    );
  }
}