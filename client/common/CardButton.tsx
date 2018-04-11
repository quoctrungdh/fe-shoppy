import * as React from 'react';
import { Link } from 'react-router-dom';

export default class CardButton extends React.Component<{}, {}> {
  render() {
    return (
      <Link to="/" className="card-button">
        <div className="card-button__icon"></div>
        <div className="card-button__quantity">3</div>
      </Link>
    );
  }
}