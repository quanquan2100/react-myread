import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import React from 'react';

export default class Search extends React.Component {
  static propTypes = {
    query: PropTypes.string,
    updateQuery: PropTypes.func
  };

  handleChange(e) {
    this.props.updateQuery(e.target.value);
  }

  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
  }

  render() {
    return (
      <div className="search-books-bar">
        <Link className="close-search" to="/" >Close</Link>
        <div className="search-books-input-wrapper">
          {/*
            NOTES: The search from BooksAPI is limited to a particular set of search terms.
            You can find these search terms here:
            https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

            However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
            you don't find a specific author or title. Every search is limited by search terms.
          */}
          <input type="text" placeholder="Search by title or author" value={this.props.query} onChange={this.handleChange} />
        </div>
      </div>
    );
  }
}
