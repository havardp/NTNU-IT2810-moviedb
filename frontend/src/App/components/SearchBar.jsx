import React, { useContext } from "react";
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'
import QueryVariableStore from "../store/QueryVariableStore"
import AdvancedView from "../store/SwitchStore"

const Wrapper = styled.div`
  margin-right: 50px;
  @media only screen and (max-width: 600px) {
    margin-right: 25px;
  }
  input{
    width: 40px;
    height: 40px;
    font-size: 16px;
    background-color: #222222;
    border: 0px
    color: #E50914
    font-size: 14px;
    background-image: url('http://www.clker.com/cliparts/D/k/0/U/i/k/search-icon-red-md.png') ;
    background-size: 30px 30px;
    background-position: 10px 0px;
    background-repeat: no-repeat;
    -webkit-transition: width 0.4s ease-in-out;
    transition: width 0.4s ease-in-out;
    outline: none
    cursor: pointer
    ::placeholder{
      font-size: 0px;
    }
    &:focus{
      width: 300px;
      background-image:none;
      background-color: #414141
      padding-left: 10px
      cursor: text;
      ::placeholder{
        font-size: 12px;
      }
      @media only screen and (max-width: 600px) {
        width: 150px;
      }
    }

    ${({ input }) => input && `
      width:300px;
      background-image:none;
      background-color: #414141
      padding-left: 10px
      @media only screen and (max-width: 600px) {
        width: 150px;
      }
    `}
`

const SearchBar = observer(() => {
  const store = useContext(QueryVariableStore)
  const advancedView = useContext(AdvancedView)
  return (
    <>
      {!advancedView.toggled && <Wrapper input={store.search !== ""}>
        <input
          type="text"
          name="searchBar"
          autoComplete="off"
          placeholder="Movie Title"
          data-cy="searchBar"
          onChange={(e) => {
            store.search = e.target.value
          }} />
      </Wrapper>}
    </>
  );
})

export default SearchBar
