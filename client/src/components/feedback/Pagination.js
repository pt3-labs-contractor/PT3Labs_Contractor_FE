import React from 'react';
import './Paginations.css';

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <h3 className="page-total">Total Reviews: {totalPosts}</h3>
      <ul className="pagination">
        <div>
          <p>Pages:</p>
        </div>
        <div className="page-numbers">
          {pageNumbers.map(number => (
            <li key={number} className="page-item">
              <a onClick={() => paginate(number)} className="page-link">
                {number}
              </a>
            </li>
          ))}
        </div>
      </ul>
    </nav>
  );
};

export default Pagination;