import React, { useContext } from "react";
import styled from "styled-components";
import YearCount from "../components/advancedViews/YearCount";
import GenreCount from "../components/advancedViews/GenreCount";
import { observer } from 'mobx-react-lite'
import AdvancedViewStatus from '../store/SwitchStore'

const AdvancedViewWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media only screen and (max-width: 600px) {
    padding-top: 6em;
  }
`

const AdvancedView = observer(() => {

  const advancedViewStatus = useContext(AdvancedViewStatus);

  const advancedViewOptions = {
    yearCount: (<YearCount />),
    genreCount: (<GenreCount />)
  };

  return (
    <>
      <AdvancedViewWrapper>
        {advancedViewOptions[advancedViewStatus.option]}
      </AdvancedViewWrapper>
    </>
  );
});

export default AdvancedView
