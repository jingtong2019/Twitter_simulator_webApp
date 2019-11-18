import React from "react";
import "hammerjs";

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

import {
  barChartMonths,
  barChartDailyPercentages,
  barChartWeek,
  barChartDailyWeekPercentages,
  barChartViews,
  barChartViewsPercentages,
  barChartHours,
  barChartHourlyPercentages,
  top10Views,
  top10ViewsNum,
  top5Retweets,
  top5RetweetsNum,
  top10Likes,
  top10LikesNum
} from "../data/appData";

export const BarChartContainer = () => (
  <Chart style={({ height: 288 }, { width: 1000 })}>
    <ChartLegend visible={false} />
    <ChartCategoryAxis>
      <ChartCategoryAxisItem categories={barChartMonths} startAngle={45} />
    </ChartCategoryAxis>

    <ChartSeries>
      {barChartDailyPercentages.map((item, idx) => (
        <ChartSeriesItem
          key={idx}
          type="column"
          data={item.data}
          name={item.name}
          gap={0.5}
          color="rgb(135,188,232)"
        />
      ))}
    </ChartSeries>
    <ChartValueAxis skip={4}>
      <ChartValueAxisItem color="#888" skip={2} />
    </ChartValueAxis>
  </Chart>
);
export const BarChartWeeklyContainer = () => (
  <Chart style={{ height: 288 }}>
    <ChartLegend visible={false} />
    <ChartCategoryAxis>
      <ChartCategoryAxisItem categories={barChartWeek} startAngle={45} />
    </ChartCategoryAxis>

    <ChartSeries>
      {barChartDailyWeekPercentages.map((item, idx) => (
        <ChartSeriesItem
          key={idx}
          type="column"
          data={item.data}
          name={item.name}
          gap={0.5}
          color="#5DBCD2"
        />
      ))}
    </ChartSeries>
    <ChartValueAxis skip={4}>
      <ChartValueAxisItem color="#888" skip={2} />
    </ChartValueAxis>
  </Chart>
);
export const BarChartViewsContainer = () => (
  <Chart style={({ height: 288 }, { width: 1000 })}>
    <ChartLegend visible={false} />
    <ChartCategoryAxis>
      <ChartCategoryAxisItem categories={barChartViews} startAngle={45} />
    </ChartCategoryAxis>

    <ChartSeries>
      {barChartViewsPercentages.map((item, idx) => (
        <ChartSeriesItem
          key={idx}
          type="line"
          style="normal"
          data={item.data}
          name={item.name}
          gap={0.5}
          color="rgb(135,188,232)"
        />
      ))}
    </ChartSeries>
    <ChartValueAxis skip={4}>
      <ChartValueAxisItem color="#888" skip={2} />
    </ChartValueAxis>
  </Chart>
);

export const BarChartHourlyContainer = () => (
  <Chart style={({ height: 288 }, { width: 1000 })}>
    <ChartLegend visible={false} />
    <ChartCategoryAxis>
      <ChartCategoryAxisItem categories={barChartHours} startAngle={45} />
    </ChartCategoryAxis>

    <ChartSeries>
      {barChartHourlyPercentages.map((item, idx) => (
        <ChartSeriesItem
          key={idx}
          type="column"
          data={item.data}
          name={item.name}
          gap={0.5}
          color="rgb(135,188,232)"
        />
      ))}
    </ChartSeries>
    <ChartValueAxis skip={4}>
      <ChartValueAxisItem color="#888" skip={2} />
    </ChartValueAxis>
  </Chart>
);

export const BarChartTopViews = () => (
  <Chart style={{ height: 288 }}>
    <ChartLegend visible={false} />
    <ChartCategoryAxis>
      <ChartCategoryAxisItem categories={top10Views} startAngle={45} />
    </ChartCategoryAxis>

    <ChartSeries>
      {top10ViewsNum.map((item, idx) => (
        <ChartSeriesItem
          key={idx}
          type="column"
          data={item.data}
          name={item.name}
          gap={0.5}
          color="rgb(135,188,232)"
        />
      ))}
    </ChartSeries>
    <ChartValueAxis skip={4}>
      <ChartValueAxisItem color="#888" skip={2} />
    </ChartValueAxis>
  </Chart>
);
export const BarChartTopLikes = () => (
  <Chart style={{ height: 288 }}>
    <ChartLegend visible={false} />
    <ChartCategoryAxis>
      <ChartCategoryAxisItem categories={top10Likes} startAngle={45} />
    </ChartCategoryAxis>

    <ChartSeries>
      {top10LikesNum.map((item, idx) => (
        <ChartSeriesItem
          key={idx}
          type="column"
          data={item.data}
          name={item.name}
          gap={0.5}
          color="rgb(135,188,232)"
        />
      ))}
    </ChartSeries>
    <ChartValueAxis skip={4}>
      <ChartValueAxisItem color="#888" skip={2} />
    </ChartValueAxis>
  </Chart>
);
export const BarChartTopRetweets = () => (
  <Chart style={{ height: 288 }}>
    <ChartLegend visible={false} />
    <ChartCategoryAxis>
      <ChartCategoryAxisItem categories={top5Retweets} startAngle={45} />
    </ChartCategoryAxis>

    <ChartSeries>
      {top5RetweetsNum.map((item, idx) => (
        <ChartSeriesItem
          key={idx}
          type="column"
          data={item.data}
          name={item.name}
          gap={0.5}
          color="rgb(135,188,232)"
        />
      ))}
    </ChartSeries>
    <ChartValueAxis skip={4}>
      <ChartValueAxisItem color="#888" skip={2} />
    </ChartValueAxis>
  </Chart>
);
