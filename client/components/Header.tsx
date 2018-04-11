import * as React from 'react';
import MenuButton from '../common/MenuButton';
import Logo from '../common/Logo';
import CardButton from '../common/CardButton';

export default class Header extends React.Component<{}, {}> {
  render() {
    return (
      <header className="header">
        <MenuButton />
        <Logo />
        <CardButton />
      </header>
    );
  }
}