import * as React from 'react';

export default class ProductListControl extends React.Component<ProductListControlProps, {}> {
  render() {
    return(
      <p className="text-right">
        <button
          type="button"
          className={`btn-product-display ${this.props.isShowGrid ? '': 'active'}`}
          onClick={this.props.onControlClick}
        >List</button>
        <button
          type="button"
          className={`btn-product-display ${this.props.isShowGrid ? 'active': ''}`}
          onClick={this.props.onControlClick}
        >Grid</button>
      </p>
    )
  }
}

interface ProductListControlProps {
  isShowGrid: boolean;
  onControlClick: () => void;
}