import React from 'react';
import Signin from '../Signin/Signin';
import ClassTimeTable from './ClassTimeTable';
import OccupancyChart from './OccupancyChart';
import ProfessorTimetable from './ProfessorTimetable';
import Free from './Free';
import swal from 'sweetalert';

import Timetable from './Timetable';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import FreeClass from './FreeClass';
import SubsetClass from './SubsetClass';
import ReserveParticular from './ReserveParticular';
import TransferReservation from './TransferReservation';
import Cancel from './Cancel';
var percentArray = [];


//for (var l=0;l<20;l++){
//    obj.array[l] = l+1;
//}

//var flg=false;



class Getdata extends React.Component {
    constructor(){
        super()
        this.state={
            array:[],
            array_class:[],
            array_room:[]
        }
        


    }
    componentDidMount(){
        
        fetch('http://localhost:2500/getTeachers',{
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            
            body: JSON.stringify({
              choice:"teachers"
            })


        })
        .then(response=> response.json())
        .then(resp=> {
            if(resp[0].name){

                var teacher_list = [];

                for(var teacher of resp){
                    teacher_list.push({
                        name:teacher.name,
                        email:teacher.email
                    });
                }
                this.setState({
                    array:teacher_list,
                    array_class:this.state.array_class,
                    array_room:this.state.array_room
                })
                console.log(this.state.array)

            
            }
            else{
                return swal("Failed!","Failed getTeachers","error")
            }
        })


        fetch('http://localhost:2500/getTeachers',{
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            
            body: JSON.stringify({
              choice:"classes"
            })


        })
        .then(response=> response.json())
        .then(resp=> {
            if(resp[0].secnumber){

                
                this.setState({
                    array:this.state.array,
                    array_class:resp,
                    array_room:this.state.array_room
                })
                console.log(this.state.array_class)

            
            }
            else{
                return swal("Failed!","Failed getClasses","error")
            }
        })
        


        fetch('http://localhost:2500/getTeachers',{
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            
            body: JSON.stringify({
              choice:"rooms"
            })


        })
        .then(response=> response.json())
        .then(resp=> {
            if(resp[0].roomnumber){

                
                this.setState({
                    array:this.state.array,
                    array_class:this.state.array_class,
                    array_room:resp
                })
                console.log(this.state.array_room)

            
            }
            else{
                return swal("Failed!","Failed getRooms","error")
            }
        })
        
    }




    render() {
        const choice=this.props.choice;
        console.log(choice)
        return(
            //<Signin />
            <Router>
                <div>
                <Route path="/settimetable"><Timetable state={this.state}/></Route>
                <Route path="/dispcltimetable"><ClassTimeTable data={this.state.array_class}/></Route>
                <Route path="/disproomtimetable"><OccupancyChart data={this.state.array_room}/></Route>
                <Route path="/dispproftimetable"><ProfessorTimetable data={this.state.array}/></Route>
                <Route path="/free"><Free data={this.state.array_room}/></Route>
                <Route path="/freeclass"><FreeClass data={this.state.array_class}/></Route>
                <Route path="/subsetclass"><SubsetClass data={this.state.array_class}/></Route>
                
                <Route path="/reservepartic"><ReserveParticular data={this.state.array_class}/></Route> 
                <Route path="/cancelpartic"><Cancel data={this.state.array_class} /></Route> 
                <Route path="/transferreservation"><TransferReservation data={this.state.array_class} data2={this.state.array_room}/></Route>
                    {/* {

                        choice==='restimetable'
                        ?
                        <Timetable state={this.state}/>
                        :
                        choice==='dispcltimetable'
                        ?
                        <ClassTimeTable data={this.state.array_class}/>
                        :
                        choice==='dispproftimetable'
                        ?
                        <ProfessorTimetable data={this.state.array}/>
                        :
                        choice==='disproomtimetable'
                        ?
                        <OccupancyChart data={this.state.array_room}/>
                        :
                        <OccupancyChart data={this.state.array_room}/>

                    } */}
                    
                </div>
            </Router>
            
            )
    
    }
}

export default Getdata;