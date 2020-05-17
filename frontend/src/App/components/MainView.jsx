import React, { useContext } from "react";
import { observer } from 'mobx-react-lite'
import MovieGallery from "./MovieGallery.jsx"
import AdvancedView from './AdvancedView.jsx'
import AdvancedViewStatus from '../store/SwitchStore'

const MainView = observer(() => {
  const advancedView = useContext(AdvancedViewStatus)
  return (
    <>
      {advancedView.toggled ? <AdvancedView /> : <MovieGallery/>}
    </>
  );
})

export default MainView
