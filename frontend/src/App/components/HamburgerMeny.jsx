import React, { useContext } from "react";
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'
import Switch from "react-input-switch";
import QueryVariableStore from "../store/QueryVariableStore"
import HamburgerStatus from '../store/HamburgerStore'
import AdvancedViewStatus from '../store/SwitchStore'
import Collapse from 'react-bootstrap/Collapse'

const SideBar = styled.div`
  height: 100%;
  width: ${props => props.width}; /* 0 width - change this with JavaScript */
  position: fixed; /* Stay in place */
  z-index: 1; /* Stay on top */
  top: 0;
  right: 0;
  background-color: #2C2C2C; /* Black*/
  color:
  overflow-x: hidden; /* Disable horizontal scroll */
  padding-top: 60px; /* Place content 60px from the top */
  transition: 0.5s; /* 0.5 second transition effect to slide in the sidebar */
  margin-top: 80px;
  color: white;
  padding-top: 10px;

  select{
    background-color: #222222;
    border: none
  }

  input{
    width: 38px;
    border: none
    background-color: #222222;
    margin: 5px;
    padding: 2px;
  }

  span{
    padding-top: 0px;
    padding-left: 10px;
  }
`

const Row = styled.div`
  margin: 20px;
  padding-left: 10px;
`

const RadioButtonRow = styled.div`
  margin: 5px;
  padding-left: 30px;
`

const RedHorizontalRule = styled.hr`
  color: red;
  background-color: red;
  border-color: red;
  height: 0.5;
`

const HamburgerMeny = observer(() => {
  const store = useContext(QueryVariableStore)
  const burger = useContext(HamburgerStatus)
  const advancedView = useContext(AdvancedViewStatus)
  //using this object to map through give user posibility to select what to sort by
  const sortingFields = {columnName: ["originalTitle", "year"], order: ["asc", "desc"]}
  //ues this object to map the fields from what the database uses, to something more readable by the user
  const userFriendlyField = {originalTitle: "Movie Title", year: "Release Year", asc:"Ascending", desc: "Descending"}
  //use this array to map the genres the user can sort by
  const genres = ["Comedy", "Drama", "Animation", "Action", "Crime", "Horror", "Sci-Fi"]

  const advancedOptions = ["yearCount", "genreCount"];
  const userFriendlyAdvancedOptions = {yearCount: "Movies per year", genreCount: "Movies per genre"};

  return (
    <>
      <SideBar width={burger.show ? "350px" : "0px"} data-cy={"hamburgerMeny"}>
      <Collapse in={!advancedView.toggled} timeout={1000}>
        <div>
          <Row>
            Sort by: {" "}
            {Object.keys(sortingFields).map(field => (
              <select key={field} onChange={e => store.sort[field] = e.target.value}>
              {sortingFields[field].map(data => (
                <option key={data} value={data}>{userFriendlyField[data]}</option>
              ))}
              </select>
            ))}
          </Row>
          <Row>
            Year from <input placeholder="1950" onChange={e => store.year.from = e.target.value} /> to <input placeholder="2050" onInput={e => store.year.to = e.target.value} />
          </Row>
          <Row>
            Sort by popular genres:
          </Row>
          <RadioButtonRow>
            <input
              type='radio'
              name="genre"
              checked={""===store.genres}
              value={""}
              onChange={() => store.genres = ""} />
              No genre specified
          </RadioButtonRow>
          {genres.map(genre => (
            <RadioButtonRow key={genre}>
              <input
                type='radio'
                name="genre"
                checked={genre===store.genres}
                value={genre}
                onChange={() => store.genres = genre} />
                {genre}
            </RadioButtonRow>
            ))}
          </div>
        </Collapse>
        <Row>
          <RedHorizontalRule />
        </Row>
        <Row>
          <Switch value={advancedView.toggled ? 1 : 0} onChange={() => advancedView.toggled = !advancedView.toggled} styles={{
            track: {
              backgroundColor: 'white'
            },
            trackChecked: {
              backgroundColor: '#E50914'
            },
            button: {
              backgroundColor: '#414141'
            }
          }}/>
          <span>Toggle advanced view</span>
        </Row>
        <Collapse in={advancedView.toggled}>
          <div>
            <Row>
              Advanced view:
            </Row>
            {advancedOptions.map(option => (
              <RadioButtonRow key={option}>
                <input
                  type='radio'
                  name="advancedOption"
                  checked={option===advancedView.option}
                  value={option}
                  onChange={() => advancedView.option = option} />
                  {userFriendlyAdvancedOptions[option]}
              </RadioButtonRow>
            ))}
          </div>
        </Collapse>
      </SideBar>
    </>
  );
})

export default HamburgerMeny
