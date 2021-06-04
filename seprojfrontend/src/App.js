import React, {Component} from 'react';
//import logo from './logo.svg';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import Navigation from './components/Navigation/Navigation';
//import Timetable from './components/Timetable/Timetable';
import Getdata from './components/Timetable/Getdata';
//import ClassTimeTable from './components/Timetable/ClassTimeTable';
//import ProfessorTimetable from './components/Timetable/ProfessorTimetable';
//import OccupancyChart from './components/Timetable/OccupancyChart';
import Home from './components/Home/Home';
import Aftersignin from './components/Signin/aftersignin'
import Forgotpass from './components/Forgotpass/Forgotpass';

import swal from 'sweetalert';
import {
  BrowserRouter as Router,
  Switch, 
  Route,
  Link
} from "react-router-dom";

import './App.css';
import 'tachyons'; 
import View from './components/View/View';
import ReserveParticular from './components/Timetable/ReserveParticular';
import CancelParticular from './components/Timetable/Cancel';
import TransferReservation from './components/Timetable/TransferReservation';
const initialState={
  input:'',
  route:'home',
  isSignedIn: false,
  
}

class App extends Component{
  constructor(){ 
    super();
    this.state=initialState;

  }
  onRouteChange = (route) => {
    
    this.setState({route: route});
  }
  render() {
    const {route} = this.state;
    
    return (
      
      <Router>
        <div>
          
           <Navigation/>
            
          
            <Route exact path="/" component={Home}/>
            <Route path="/reservecancel" component={Register}/>
            <Route path="/view" component={View}/>
            <Route path="/signin" component={Signin}/>
            <Route path="/aftersignin" component={Aftersignin}/>
            <Route path="/forgotpass" component={Forgotpass}/>
            <Route path="/settimetable" component={Getdata}/>
            <Route path="/dispcltimetable" component={Getdata}/>
            <Route path="/disproomtimetable" component={Getdata}/>
            <Route path="/free" component={Getdata}/>
            <Route path="/freeclass" component={Getdata}/>
            <Route path="/dispproftimetable" component={Getdata}/>
            <Route path="/reservepartic" component={Getdata}/>
            <Route path="/cancelpartic" component={Getdata}/>
            <Route path="/transferreservation" component={Getdata}/>
            <Route path="/subsetclass" component={Getdata}/>
          {/* <OccupancyChart onRouteChange={this.onRouteChange}/>
          
            {  route === 'home'
              ? 
                <Home onRouteChange={this.onRouteChange}/>

              : route==='view'
                ?
                  <View onRouteChange={this.onRouteChange}/>
                  : route === 'register'
                    ? 
                      <Register onRouteChange={this.onRouteChange}/>
                    : route === 'signin'
                      ?
                        <Signin onRouteChange={this.onRouteChange}/>
                      : route === 'aftersignin'
                        ?
                        <Aftersignin onRouteChange={this.onRouteChange}/>
                        : route==='forgotpass'
                          ?
                          <Forgotpass onRouteChange={this.onRouteChange}/>
                          :route==='settimetable'
                            ?
                            <Getdata choice={'restimetable'} onRouteChange={this.onRouteChange}/>
                            :route==='dispcltimetable'
                              ?
                              <Getdata choice={'dispcltimetable'} onRouteChange={this.onRouteChange}/>
                              :route==='disproomtimetable'
                                ?
                                <Getdata choice={'disproomtimetable'} onRouteChange={this.onRouteChange}/>
                                :route==='dispproftimetable'
                                  ?
                                  <Getdata choice={'dispproftimetable'} onRouteChange={this.onRouteChange}/>
                                  :<Getdata choice={'disproomtimetable'} onRouteChange={this.onRouteChange}/>


                            
                
            } */}
        </div>
      </Router>
    );
  }  
}  


export default App;
