import React from "react";
import FeedsComponent from './feeds';
import TweetComponent from './tweet';

export class MainPage extends React.Component {
  state = {
  };

  render() {
    return (
        <div class="container-fluid w-87">
            <div class="row">
                
                <div class="col-md-5 border bg-dark text-white">
                  <div class="row">
                      <TweetComponent />
                      <FeedsComponent />
                  </div>
                </div>
                
            </div>
        </div>
    );
  }
}

export default MainPage;
