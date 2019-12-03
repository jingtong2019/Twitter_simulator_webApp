// https://stackoverflow.com/questions/23293082/mongodb-group-by-hour
import React, { Component } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { Dialog, DialogActionsBar } from "@progress/kendo-react-dialogs";
import { Input } from "@progress/kendo-react-inputs";
import { Button } from "@progress/kendo-react-buttons";
import { Ripple } from "@progress/kendo-react-ripple";
import { savePDF } from "@progress/kendo-react-pdf";
import { Link } from "react-router-dom";
// import { DonutChartContainer } from "./components/DonutChartContainer";
import "@progress/kendo-theme-material/dist/all.css";
import "./Analytics.css";
import "bootstrap-4-grid/css/grid.min.css";
import {
  Chart,
  ChartSeries,
  ChartSeriesItem,
  ChartCategoryAxis,
  ChartCategoryAxisItem,
  ChartLegend,
  ChartValueAxis,
  ChartValueAxisItem
} from "@progress/kendo-react-charts";

class AnalyticsPage extends React.Component {
  constructor(props) {
    super(props);
    this.routeChange = this.routeChange.bind(this);
    this.appContainer = React.createRef();
    this.state = {
      showDialog: false
    };
  }
  routeChange() {
    let path = "/profile";
    this.props.history.push(path);
  }
  handlePDFExport = () => {
    this.props.dispatch({ type: "handlePDFExport" });
    savePDF(ReactDOM.findDOMNode(this.appContainer), { paperSize: "auto" });
  };
  handleShare = () => {
    this.props.dispatch({ type: "handleShare" });
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

                  <Button
                    color="primary"
                    className="px-4"
                    onClick={this.routeChange}
                  >
                    Home
                  </Button>
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
                    <BarChartWeeklyContainer />
                  </div>
                </div>
                <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                  <p>
                    Your tweet volume over this <strong>28 day</strong> period
                  </p>
                  <BarChartDailyContainer />
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
class BarChartTopViews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      top10Views: [],
      top10ViewsNum: [],
      list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    };
  }
  componentDidMount() {
    axios
      .get(
        "http://ec2-13-52-238-151.us-west-1.compute.amazonaws.com:4010/api/getTopViewTweet",
        {
          params: {
            userId: 1
          }
        }
      )
      .then(response => {
        this.setState({
          top10Views: this.state.top10Views.concat(response.data.result._id),
          top10ViewsNum: this.state.top10ViewsNum.concat(
            response.data.result.views
          )
        });
        console.log("top10ViewsNum");
        console.log(this.state.top10ViewsNum);
      });
  }
  render() {
    return (
      <Chart style={{ height: 288 }} zoomable={false}>
        <ChartLegend visible={false} />
        <ChartCategoryAxis>
          <ChartCategoryAxisItem categories={this.state.list} startAngle={45} />
        </ChartCategoryAxis>

        <ChartSeries>
          <ChartSeriesItem
            type="column"
            data={this.state.top10ViewsNum}
            gap={0.5}
            color="rgb(135,188,232)"
            opacity={0.8}
          />
        </ChartSeries>
        <ChartValueAxis skip={4}>
          <ChartValueAxisItem color="#888" skip={2} />
        </ChartValueAxis>
      </Chart>
    );
  }
}

class BarChartTopLikes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      top10Likes: [],
      top10LikesNum: [],
      list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    };
    console.log("top10LikesNum");
    console.log(this.state.top10LikesNum);
  }
  componentDidMount() {
    axios
      .get(
        "http://ec2-13-52-238-151.us-west-1.compute.amazonaws.com:4010/api/getTopLikeTweet",
        {
          params: {
            userId: 1
          }
        }
      )
      .then(response => {
        console.log("response");
        console.log(response);
        this.setState({
          top10Likes: this.state.top10Likes.concat(response.data.result._id),
          top10LikesNum: this.state.top10LikesNum.concat(
            response.data.result.num_likes
          )
        });
      });
  }
  render() {
    return (
      <Chart style={{ height: 288 }} zoomable={false}>
        <ChartLegend visible={false} />
        <ChartCategoryAxis>
          <ChartCategoryAxisItem categories={this.state.list} startAngle={45} />
        </ChartCategoryAxis>

        <ChartSeries>
          <ChartSeriesItem
            type="column"
            data={this.state.top10LikesNum}
            gap={0.5}
            color="rgb(135,188,232)"
            opacity={0.8}
          />
        </ChartSeries>
        <ChartValueAxis skip={4}>
          <ChartValueAxisItem color="#888" skip={2} />
        </ChartValueAxis>
      </Chart>
    );
  }
}

class BarChartTopRetweets extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      top5Retweets: [],
      top5RetweetsNum: [],
      list: [1, 2, 3, 4, 5]
    };
    console.log("top5RetweetsNum");
    console.log(this.state.top5RetweetsNum);
  }
  componentDidMount() {
    axios
      .get(
        "http://ec2-13-52-238-151.us-west-1.compute.amazonaws.com:4010/api/getTopRetweetTweet",
        {
          params: {
            userId: 1
          }
        }
      )
      .then(response => {
        this.setState({
          top5Retweets: this.state.top5Retweets.concat(
            response.data.result._id
          ),
          top5RetweetsNum: this.state.top5RetweetsNum.concat(
            response.data.result.retweets
          )
        });
      });
  }
  render() {
    return (
      <Chart style={{ height: 288 }} zoomable={false}>
        <ChartLegend visible={false} />
        <ChartCategoryAxis>
          <ChartCategoryAxisItem categories={this.state.list} startAngle={45} />
        </ChartCategoryAxis>

        <ChartSeries>
          <ChartSeriesItem
            type="column"
            data={this.state.top5RetweetsNum}
            gap={0.5}
            color="rgb(135,188,232)"
            opacity={0.8}
          />
        </ChartSeries>
        <ChartValueAxis skip={4}>
          <ChartValueAxisItem color="#888" skip={2} />
        </ChartValueAxis>
      </Chart>
    );
  }
}

class BarChartHourlyContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hourOfDay: [],
      value: []
    };
    console.log("HourlyContainer");
    console.log(this.state);
  }
  componentDidMount() {
    console.log("if executed");
    axios
      .get(
        "http://ec2-13-52-238-151.us-west-1.compute.amazonaws.com:4010/api/getTweetByHour",
        {
          params: {
            userId: 1
          }
        }
      )
      .then(response => {
        console.log("in reponse hour");
        console.log(response);
        this.setState({
          hourOfDay: this.state.hourOfDay.concat(
            response.data.result.hourOfDay
          ),
          value: this.state.value.concat(response.data.result.value)
        });
      });
  }
  render() {
    return (
      <Chart style={{ height: 288 }} zoomable={false}>
        <ChartLegend visible={false} />
        <ChartCategoryAxis>
          <ChartCategoryAxisItem
            categories={this.state.hourOfDay}
            startAngle={45}
          />
        </ChartCategoryAxis>

        <ChartSeries>
          <ChartSeriesItem
            type="column"
            data={this.state.value}
            gap={0.5}
            color="rgb(135,188,232)"
            opacity={0.8}
          />
        </ChartSeries>
        <ChartValueAxis skip={4}>
          <ChartValueAxisItem color="#888" skip={2} />
        </ChartValueAxis>
      </Chart>
    );
  }
}

class BarChartWeeklyContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dayOfWeek: [],
      value: []
    };
    console.log("top5RetweeBarChartHourlyContainertsNum");
    console.log(this.state);
  }
  componentDidMount() {
    axios
      .get(
        "http://ec2-13-52-238-151.us-west-1.compute.amazonaws.com:4010/api/getTweetByWeek",
        {
          params: {
            userId: 1
          }
        }
      )
      .then(response => {
        this.setState({
          dayOfWeek: this.state.dayOfWeek.concat(
            response.data.result.dayOfWeek
          ),
          value: this.state.value.concat(response.data.result.value)
        });
      });
  }
  render() {
    return (
      <Chart style={{ height: 288 }} zoomable={false}>
        <ChartLegend visible={true} />
        <ChartCategoryAxis>
          <ChartCategoryAxisItem
            categories={this.state.dayOfWeek}
            startAngle={45}
          />
        </ChartCategoryAxis>

        <ChartSeries>
          <ChartSeriesItem
            type="column"
            data={this.state.value}
            gap={0.5}
            color="rgb(135,188,232)"
            opacity={0.8}
          />
        </ChartSeries>
        <ChartValueAxis skip={4}>
          <ChartValueAxisItem color="#888" skip={2} />
        </ChartValueAxis>
      </Chart>
    );
  }
}

class BarChartDailyContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dayOfMonth: [],
      value: []
    };
    console.log("top5RetweeBarChartHourlyContainertsNum");
    console.log(this.state);
  }
  componentDidMount() {
    axios
      .get(
        "http://ec2-13-52-238-151.us-west-1.compute.amazonaws.com:4010/api/getTweetByDay",
        {
          params: {
            userId: 1
          }
        }
      )
      .then(response => {
        console.log("response ss");
        console.log(response);
        this.setState({
          dayOfMonth: this.state.dayOfMonth.concat(
            response.data.result.dayOfMonth
          ),
          value: this.state.value.concat(response.data.result.value)
        });
      });
  }
  render() {
    return (
      <Chart style={{ height: 288 }} zoomable={false}>
        <ChartLegend visible={true} />
        <ChartCategoryAxis>
          <ChartCategoryAxisItem
            categories={this.state.dayOfWeek}
            startAngle={45}
          />
        </ChartCategoryAxis>

        <ChartSeries>
          <ChartSeriesItem
            type="column"
            width="1"
            data={this.state.value}
            gap={0.5}
            color="rgb(135,188,232)"
            opacity={0.8}
          />
        </ChartSeries>
        <ChartValueAxis skip={4}>
          <ChartValueAxisItem color="#888" skip={2} />
        </ChartValueAxis>
      </Chart>
    );
  }
}

class BarChartViewsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dayOfMonth: [],
      value: []
    };
    console.log("BarChartViewsContainer");
    console.log(this.state);
  }
  componentDidMount() {
    axios
      .get(
        "http://ec2-35-161-86-90.us-west-2.compute.amazonaws.com:4010/api/profileViews/1/28",
        {
          params: {
            userId: 1
          }
        }
      )

      .then(response => {
        let values = [];
        let daysOfMonth = [];
        console.log("response char");
        // for (const items in response.data) {
        for (let i = response.data.length - 1; i > 0; i--) {
          values.push(response.data[i].views);
          daysOfMonth.push(response.data[i].ts.toString().substr(8, 2));
        }
        console.log(response.data[0].views);
        console.log("values");
        console.log(values);
        this.setState({
          dayOfMonth: this.state.dayOfMonth.concat(daysOfMonth),
          value: this.state.value.concat(values)
        });
      });
  }
  render() {
    return (
      <Chart style={({ height: 288 }, { width: 1000 })} zoomable={false}>
        <ChartLegend visible={false} />
        <ChartCategoryAxis>
          <ChartCategoryAxisItem
            categories={this.state.dayOfMonth}
            // categories={this.state.list}
            startAngle={45}
          />
        </ChartCategoryAxis>

        <ChartSeries>
          <ChartSeriesItem
            type="line"
            style="normal"
            width="1"
            data={this.state.value}
            gap={0.5}
            color="rgb(135,188,232)"
            opacity={0.8}
          />
        </ChartSeries>
        <ChartValueAxis skip={4}>
          <ChartValueAxisItem color="#888" skip={2} />
        </ChartValueAxis>
      </Chart>
    );
  }
}
// export default Analytics;
// const connectedAnalytics = connect()(AnalyticsPage);
// export { connectedAnalytics as AnalyticsPage };
export default AnalyticsPage;
