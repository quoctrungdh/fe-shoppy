import * as React from 'react';

export default class Pagination extends React.Component<PaginationProps, {}> {
  render() {
    return(
      <nav className="product__pagination">
        <ul>
          {
            (new Array(this.props.pageCounts).map((number) => (
              <li className="product__pagination-item" key={number}>
                <a className="product__pagination-link">{number}</a>
              </li>
            )))
          }
        </ul>
      </nav>
    )
  }
}

interface PaginationProps {
  pageCounts: number;
}