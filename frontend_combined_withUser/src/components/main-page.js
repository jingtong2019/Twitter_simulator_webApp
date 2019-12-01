import React from "react";
import FeedsComponent from './feeds';
import TweetComponent from './tweet';

export class MainPage extends React.Component {
  state = {
  };

  render() {
    return (
      <div class="col-md-5 border">
        <TweetComponent />
        <FeedsComponent />
      </div>
    );
  }
}

export default MainPage;
