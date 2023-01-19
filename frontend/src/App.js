import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import CreateForm from "./components/Spots/CreateSpots/CreateSpotsForm";
import MySpot from './components/Spots/SpotById/SpotById'
import GetAllSpots from "./components/Spots/GetAllSpots/GetSpots";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && 
      <Switch>
        <Route exact path='/'>
        <GetAllSpots />
        </Route>
        <Route exact path='/spots/:spotId'>
        <MySpot />
        </Route>
      <Route path='/new'>
        <CreateForm />
      </Route>
        </Switch>}
    </>
  );
}

export default App;
