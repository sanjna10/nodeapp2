import React from 'react';
import swal from 'sweetalert';
class Cancel extends React.Component {

    onClickCancel=() =>{
        var secnumber=document.getElementById("class").value;
        var day=document.getElementById("day").value;
        var period=document.getElementById("period").value;
        var email=localStorage.getItem("usermail");
        var perm=document.getElementById("cancelperm").checked;
        //console.log(secnumber,email,perm)
        if(perm===true){
            fetch('http://localhost:2500/cancelPermanent', {
                method:'post',
                headers: {'Content-Type':'application/json',
                'Accept': 'application/json'
                },
                body: JSON.stringify({
                    secnumber:secnumber,
                    day:day,
                    period:period,
                    email:email
                })
                })
                .then(response => response.json())
                .then(status=>{
                    if(status.status==="Success"){
                        //alert("Successfully Reserved a Room Permanently")
                        swal("Success!", " Cancelled the room", "success");
                        
                      }
                      else{

                        swal("Failed!",status.status,"error")
                      }

                  })
        }
        else{
            fetch('http://localhost:2500/cancelTemp', {
                method:'post',
                headers: {'Content-Type':'application/json',
                'Accept': 'application/json'
                },
                body: JSON.stringify({
                    secnumber:secnumber, 
                    day:day,
                    period:period,
                    email:email
                })
                })
                .then(response => response.json())
                .then(status=>{
                    if(status.status==="Success"){
                        //alert("Successfully Reserved a Room Permanently")
                        swal("Success!", " Cancelled a Room Temporarily", "success");
                        
                      }
                      else{

                        swal("Failed!",status.status,"error")
                      }

                  })

        }


    }

    render() {
        let class_list = this.props.data;
        let classOptionItems = class_list.map((item) =>
                <option value={item.secnumber}>{item.secnumber}</option>
            );

        
        return (

            <div>
                <h2 class="f6 f2-m f2-l fw6 black-90 mv3 b center" style={{marginTop:"2%",marginLeft:"2%"}}>
                    You can cancel room for a particular period in this window:      
                </h2>

                <article class="mw6 center bg-white br3   mv3 ba b--black-10" style={{marginTop:"5%"}}>
                    <div class="tc">
                        <h1 class="f4">Fill in these details</h1>

                        <hr class="mw3 bb bw1 b--black-10"></hr>
                    </div>
                    
                    <form class="pa4 black-80">
                        <label  class="f6 b db mb2">Class</label>
                        <select id="class" class="w-100 db h2 f6 bg-near-white ba b--sliver gray" name="" >
                            <option value="">Choose the class</option>
                            {classOptionItems}
                        </select>
                        <label  class="f6 b db mb2">Day</label>
                        <select id="day" class="w-100 db h2 f6 bg-near-white ba b--sliver gray" name="" >
                                    <option value="">Choose the day</option>
                                    <option value="MONDAY">MONDAY</option>
                                    <option value="TUESDAY">TUESDAY</option>
                                    <option value="WEDNESDAY">WEDNESDAY</option>
                                    <option value="THURSDAY">THURSDAY</option>
                                    <option value="FRIDAY">FRIDAY</option>
                        </select>
                        <label  class="f6 b db mb2">Period</label>
                        <select id="period" class="w-100 db h2 f6 bg-near-white ba b--sliver gray" name="" >
                                    <option value="">Choose the period here</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                </select>
                        <div class="flex items-center mb2">
                            <input class="mr2" type="checkbox" id="cancelperm" />
                            <label for="cancelperm" class="lh-copy f6 b">Cancel Permanently</label>
                        </div>
                    
                    </form>
                    <div align="center">
                        <input
                            
                            className="f6 link dim br3 ph3 pv2 mb2 dib white bg-light-red b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                            type="submit"
                            value="Cancel Room"
                            onClick={this.onClickCancel}
                            style={{marginBottom:"10%"}}

                        />
                    </div>
                    
                </article>



            </div>



        );

    }






}

export default Cancel;