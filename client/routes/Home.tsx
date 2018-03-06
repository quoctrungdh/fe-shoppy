import * as React from 'react';
import SmallText from '../common/SmallText';

export default class Home extends React.Component<{}, {}> {
  render() {
    return (
      <div>
        <h1>Home</h1>
        <SmallText text="Hello World" id={1} />
      </div>
    );
  }
}
