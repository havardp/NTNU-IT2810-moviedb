import React from "react";
import { GET_YEAR_COUNT } from "../../../queries";
import { useQuery } from "@apollo/react-hooks";
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTooltip } from 'victory';
import Loader from "../../UI/Loader";

const YearCount = () => {
  const { loading, error, data } = useQuery(GET_YEAR_COUNT);

  if (loading) {
    return <Loader />
  }

  if (error) {
    console.log("error");
    return <div>Error</div>
  }

  return (
    <>
      <VictoryChart
        domainPadding={20}
        style={{ parent: { maxWidth: "145vh" } }}>
        <VictoryAxis
          // tickValues specifies both the number of ticks and where
          // they are placed on the axis
          tickValues={[1925, 1940, 1955, 1970, 1985, 2000, 2015]}
          tickFormat={(x) => x}
          label="Year"
          style={{
            axis: {stroke: "white"},
            axisLabel: {fill: "white"},
            tickLabels: {fill: "white"}
          }}
        />
        <VictoryAxis
          dependentAxis
          // tickFormat specifies how ticks should be displayed
          tickFormat={(x) => x}
          label="Movies"
          style={{
            axis: {stroke: "white"},
            axisLabel: {fill: "white"},
            tickLabels: {fill: "white"}
          }}
        />
        <VictoryBar
          data={data.yearCount}
          x="year"
          y="count"
          labels={({ datum }) => `Year: ${datum.year}, Movies: ${datum.count}`}
          style={{ data: { fill: "#c43a31" } }}
          labelComponent={
            <VictoryTooltip
              dy={0}
              centerOffset={{ x: 0 }}
              style={{ fontSize: "7.5px" }} />
          }
          animate={{
            duration: 2000,
            onLoad: { duration: 1000 }
          }}
        />
      </VictoryChart>
    </>
  );
}

export default YearCount
