import React from 'react';
import { Text, Dimensions } from 'react-native';
import { GET_YEAR_COUNT, GET_GENRE_COUNT } from '../../queries/advancedViewQueries'
import styled from 'styled-components'
import { useQuery } from '@apollo/react-hooks'
import { BarChart } from 'react-native-chart-kit'

const Wrapper = styled.View`
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`

const ViewTitle = styled.Text`
  font-size: 26px;
  color: #b22222;
`

const AdvancedView = ({
}) => {
  const { loading, error, data } = useQuery(GET_YEAR_COUNT)

  if ( loading ) {
    return (
    <Text>Loading</Text>
    )
  }

  if (error) {
    return (
    <Text>Error</Text>
    )
  }

  const chart_data = data.yearCount.map((movie) => movie.count)
  const barData = {
    labels: ["1925", "1940", "1955", "1970", "1985", "2000", "2015"],
    datasets: [
      {
        data: chart_data,
      },
    ],
  }
  return (
    <Wrapper>
      <ViewTitle>Number of Movies vs. Year</ViewTitle>
        <BarChart
        data={barData}
        width={Dimensions.get("window").width - 5}
        height={220}
        withInnerLines={false}
        yAxisLabel={''}
        chartConfig={{
          backgroundColor: '#e26a00',
          backgroundGradientFrom: '#fb8c00',
          backgroundGradientTo: '#ffa726',
          decimalPlaces: 0, // optional, defaults to 2dp
          barPercentage: 0.05,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 1,
            padding: 1
          }
        }}
      />
    </Wrapper>
  )
}

export default AdvancedView;
