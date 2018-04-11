import * as React from 'react';
import './MenuButton.scss';

export default class MenuButton extends React.Component<{}, {}> {
  render() {
    return (
      <div className="menu-button">
        <div className="menu-button__bar menu-button__bar--1"></div>
        <div className="menu-button__bar menu-button__bar--2"></div>
        <div className="menu-button__bar menu-button__bar--3"></div>
      </div>
    );
  }
}