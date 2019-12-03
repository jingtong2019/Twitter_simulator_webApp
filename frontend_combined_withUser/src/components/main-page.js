import React from "react";
import FeedsComponent from './feeds';
import TweetComponent from './tweet';

export class MainPage extends React.Component {
  state = {
  };

  render() {
    return (
      <div class="col-md-5 border">
        <div class="row ml-4 mt-2">
            <h3>Home</h3>
        </div>
        <hr />
        <TweetComponent />
        <hr />
        <FeedsComponent />
      </div>
    );
  }
}

export default MainPage;
