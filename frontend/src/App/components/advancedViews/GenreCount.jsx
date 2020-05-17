import React from "react";
import { GET_GENRE_COUNT } from "../../../queries";
import { useQuery } from "@apollo/react-hooks";
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTooltip, VictoryLabel } from 'victory';
import Loader from "../../UI/Loader";

const GenreCount = () => {
  const { loading, error, data } = useQuery(GET_GENRE_COUNT);

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
          tickFormat={(x) => x}
          label="Genre"
          tickLabelComponent={<VictoryLabel dy={-5} dx={-10} />}
          axisLabelComponent={<VictoryLabel dy={10}/>}
          style={{
            axis: {stroke: "white"},
            axisLabel: {fill: "white"},
            tickLabels: {fill: "white", angle: "-90", fontSize: "7.5px"}
          }}
        />
        <VictoryAxis
          dependentAxis
          // tickFormat specifies how ticks should be displayed
          tickFormat={(x) => x}
          label="Movies"
          axisLabelComponent={<VictoryLabel dy={-10}/>}
          style={{
            axis: {stroke: "white"},
            axisLabel: {fill: "white"},
            tickLabels: {fill: "white"}
          }}
        />
        <VictoryBar
          data={data.genreCount}
          x="genre"
          y="count"
          labels={({ datum }) => `Genre: ${datum.genre}, Movies: ${datum.count}`}
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

export default GenreCount
