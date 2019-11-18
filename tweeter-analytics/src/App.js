import React, { Component } from "react";
import ReactDOM from "react-dom";

import { Dialog, DialogActionsBar } from "@progress/kendo-react-dialogs";
import { Input } from "@progress/kendo-react-inputs";
import { Button } from "@progress/kendo-react-buttons";
import { Ripple } from "@progress/kendo-react-ripple";
import { savePDF } from "@progress/kendo-react-pdf";

import { DonutChartContainer } from "./components/DonutChartContainer";
import {
  BarChartContainer,
  BarChartWeeklyContainer,
  BarChartHourlyContainer,
  BarChartViewsContainer,
  BarChartTopRetweets,
  BarChartTopLikes,
  BarChartTopViews
} from "./components/BarChartContainer";

import "@progress/kendo-theme-material/dist/all.css";
import "./App.css";
import "bootstrap-4-grid/css/grid.min.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.appContainer = React.createRef();
    this.state = {
      showDialog: false
    };
  }
  handlePDFExport = () => {
    savePDF(ReactDOM.findDOMNode(this.appContainer), { paperSize: "auto" });
  };
  handleShare = () => {
    this.setState(
      {
        showDialog: !this.state.showDialog
      },
      () => console.log(this.state)
    );
  };
  render() {
    return (
      <Ripple>
        <div className="bootstrap-wrapper">
          <div
            className="app-container container"
            ref={el => (this.appContainer = el)}
          >
            <hr width="100%" size="3" align="center" color="#d3d3d3"></hr>
            <div id="bannerimage">
              <div className="row">
                <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                  <h1>Tweet activity</h1>
                </div>
                <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 buttons-right">
                  <Button primary={true} onClick={this.handleShare}>
                    Share
                  </Button>
                  <Button onClick={this.handlePDFExport}>Export to PDF</Button>
                </div>
              </div>
            </div>
            <hr width="100%" size="3" align="center" color="#d3d3d3"></hr>
            <div className="row">
              <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                <p>
                  Your profile views over this <strong>28 day</strong> period
                </p>
                <BarChartViewsContainer />
                <hr width="200%" size="3" align="center" color="#d3d3d3"></hr>
              </div>
              <div className="col-xs-9 col-sm-9 col-md-9 col-lg-9 col-xl-9">
                <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                  <p>
                    Your tweet volume over this <strong>24 hour</strong> period
                  </p>
                  <BarChartHourlyContainer />
                </div>
                <div className="row">
                  <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                    <p>
                      Your tweet volume over this <strong>week</strong>
                    </p>
                    {/* <BarChartWeeklyContainer /> */}
                    <DonutChartContainer />
                  </div>

                  {/* <div className="col-xs-6 col-sm-6 col-md-4 col-lg-4 col-xl-4">
                    <DonutChartContainer />
                  </div> */}
                </div>
                <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                  <p>
                    Your tweet volume over this <strong>28 day</strong> period
                  </p>
                  <BarChartContainer />
                  <hr width="280%" size="3" align="center" color="#d3d3d3"></hr>
                </div>

                <div className="row">
                  <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                    <p>Top 10 View Tweets</p>
                    <BarChartTopViews />
                  </div>
                  <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                    <p>Top 10 Like Tweets</p>
                    <BarChartTopLikes />
                  </div>
                  <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                    <p>Top 5 Retweet Tweets</p>
                    <BarChartTopRetweets />
                  </div>
                </div>
              </div>
            </div>
            {this.state.showDialog && (
              <Dialog title={"Share this report"} onClose={this.handleShare}>
                <p>Please enter the email address/es of the recipient/s.</p>
                <Input placeholder="example@progress.com" />
                <DialogActionsBar>
                  <Button primary={true} onClick={this.handleShare}>
                    Share
                  </Button>
                  <Button onClick={this.handleShare}>Cancel</Button>
                </DialogActionsBar>
              </Dialog>
            )}
          </div>
        </div>
      </Ripple>
    );
  }
}

export default App;
