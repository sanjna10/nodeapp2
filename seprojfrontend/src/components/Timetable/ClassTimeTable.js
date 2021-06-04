import React from 'react';
import swal from 'sweetalert';

class ClassTimeTable extends React.Component {

    constructor(props){
        super(props);
        this.state={
            sub_array:{
                "MONDAY":[null,null,null,null,null,null],
                "TUESDAY":[null,null,null,null,null,null],
                "WEDNESDAY":[null,null,null,null,null,null],
                "THURSDAY":[null,null,null,null,null,null],
                "FRIDAY":[null,null,null,null,null,null]

            },
            prof_array:{
                "MONDAY":[null,null,null,null,null,null],
                "TUESDAY":[null,null,null,null,null,null],
                "WEDNESDAY":[null,null,null,null,null,null],
                "THURSDAY":[null,null,null,null,null,null],
                "FRIDAY":[null,null,null,null,null,null]

            },
            room_array:{
                "MONDAY":[null,null,null,null,null,null],
                "TUESDAY":[null,null,null,null,null,null],
                "WEDNESDAY":[null,null,null,null,null,null],
                "THURSDAY":[null,null,null,null,null,null],
                "FRIDAY":[null,null,null,null,null,null]

            }

        }
        
    }
    onGetClassTimeTable = () => {
        const secnumber=document.getElementById('chclass').value
        if(!secnumber)
            return alert("Choose a Class")
        fetch('http://localhost:2500/getClassTimetable',{
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            
            body: JSON.stringify({
              secnumber:secnumber
            })


        })
        .then(response=> response.json())
        .then(resp=> {
            if(resp.sub_array){

                
                this.setState({
                    sub_array:resp.sub_array,
                    prof_array:resp.prof_array,
                    room_array:resp.room_array
                })
                console.log(this.state)

            
            }
            else{
                return swal("Failed!","Failed getClasses","error")
            }
        })
    }
    render() {

        //let class_list = this.props.state.array_class;
        //let classOptionItems = class_list.map((item) =>
          //      <option value={item.secnumber}>{item.secnumber}</option>
            //);
        let class_list = this.props.data;
        let classOptionItems = class_list.map((item) =>
                <option value={item.secnumber}>{item.secnumber}</option>
            );
                
        return(
            
            <div >
                
                
                <h1 class="f3 f2-m f1-l fw6 black-90 mv3 b center" style={{marginTop:"2%",marginLeft:"3%"}}>
                    Check your class time table here:    
                </h1>

                <article class="center mw5 mw6-ns br3 hidden ba b--black-10 mv4">
                    <h1 class="f4 bg-near-white br3 br--top black-60 mv0 pv2 ph3">Choose the class here</h1>
                    <div class="pa3 bt b--black-10">
                        <select id="chclass" class="w-100 db h2 f6 bg-near-white ba b--sliver gray" name="" >
                            <option value="">Choose the class</option>
                            {classOptionItems}
                        </select>
                    </div>
                </article>

                <div className="" style={{textAlign:'center'}}>
                    <input
                        onClick={this.onGetClassTimeTable}
                        className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                        type="button"
                        id="reg"
                        value="Get timetable"

                    />
                </div>
                
                <div class="overflow-auto">
                <table class="f6 w-100 mw8 center" cellspacing="0" style={{marginTop:'2%',marginBottom:'2%'}}>
                <thead>
                    <tr class="stripe-dark">
                    <th class="fw6 tl pa3 bg-white" style={{textAlign:'center'}}>Day</th>
                    <th class="fw6 tl pa3 bg-white" style={{textAlign:'center'}}>Period 1</th>
                    <th class="fw6 tl pa3 bg-white" style={{textAlign:'center'}}>Period 2</th>
                    <th class="fw6 tl pa3 bg-white" style={{textAlign:'center'}}>Period 3</th>
                    <th class="fw6 tl pa3 bg-white" style={{textAlign:'center'}}>Period 4</th>
                    <th class="fw6 tl pa3 bg-white" style={{textAlign:'center'}}>Period 5</th>
                    <th class="fw6 tl pa3 bg-white" style={{textAlign:'center'}}>Period 6</th>

                    </tr>
                </thead>
                <tbody class="lh-copy">
                    <tr class="stripe-dark">
                    <td class="pa3 bg-white" >Monday</td>
                    <td class="pa3">
                        <div align="center" style={{color:this.state.sub_array["MONDAY"][0]==='Free'?"red":""}}>
                            <p>{this.state.sub_array["MONDAY"][0]}</p>
                            <p>{this.state.prof_array["MONDAY"][0]}</p>
                            <p>{this.state.room_array["MONDAY"][0]}</p>

                        </div>
                    </td>
                    <td class="pa3">
                        <div align="center" style={{color:this.state.sub_array["MONDAY"][1]==='Free'?"red":""}}> 
                            <p>{this.state.sub_array["MONDAY"][1]}</p>
                            <p>{this.state.prof_array["MONDAY"][1]}</p>
                            <p>{this.state.room_array["MONDAY"][1]}</p>
                          

                            </div>
                        </td>
                        <td class="pa3">
                        <div align="center" style={{color:this.state.sub_array["MONDAY"][2]==='Free'?"red":""}}>
                        <p>{this.state.sub_array["MONDAY"][2]}</p>
                            <p>{this.state.prof_array["MONDAY"][2]}</p>
                            <p>{this.state.room_array["MONDAY"][2]}</p>
                           

                            </div>
                        </td>
                        <td class="pa3">
                        <div align="center" style={{color:this.state.sub_array["MONDAY"][3]==='Free'?"red":""}}>
                        <p>{this.state.sub_array["MONDAY"][3]}</p>
                            <p>{this.state.prof_array["MONDAY"][3]}</p>
                            <p>{this.state.room_array["MONDAY"][3]}</p>
                          

                            </div>
                        </td>
                        <td class="pa3">
                        <div align="center" style={{color:this.state.sub_array["MONDAY"][4]==='Free'?"red":""}}>
                        <p>{this.state.sub_array["MONDAY"][4]}</p>
                            <p>{this.state.prof_array["MONDAY"][4]}</p>
                            <p>{this.state.room_array["MONDAY"][4]}</p>
                            
                            </div>
                        </td>
                        <td class="pa3">
                        <div align="center" style={{color:this.state.sub_array["MONDAY"][5]==='Free'?"red":""}}>
                        <p>{this.state.sub_array["MONDAY"][5]}</p>
                            <p>{this.state.prof_array["MONDAY"][5]}</p>
                            <p>{this.state.room_array["MONDAY"][5]}</p>

                            </div>
                        </td>
                    </tr>
                    <tr class="stripe-dark">
                    <td class="pa3 bg-white">Tuesday</td>
                    <td class="pa3">
                        <div align="center" style={{color:this.state.sub_array["TUESDAY"][0]==='Free'?"red":""}}>
                        <p>{this.state.sub_array["TUESDAY"][0]}</p>
                            <p>{this.state.prof_array["TUESDAY"][0]}</p>
                            <p>{this.state.room_array["TUESDAY"][0]}</p>

                            </div>
                        </td>
                        <td class="pa3">
                        <div align="center" style={{color:this.state.sub_array["TUESDAY"][1]==='Free'?"red":""}}>
                        <p>{this.state.sub_array["TUESDAY"][1]}</p>
                            <p>{this.state.prof_array["TUESDAY"][1]}</p>
                            <p>{this.state.room_array["TUESDAY"][1]}</p>
                            

                            </div>
                        </td>
                        <td class="pa3">
                        <div align="center" style={{color:this.state.sub_array["TUESDAY"][2]==='Free'?"red":""}}>
                            <p>{this.state.sub_array["TUESDAY"][2]}</p>
                            <p>{this.state.prof_array["TUESDAY"][2]}</p>
                            <p>{this.state.room_array["TUESDAY"][2]}</p>

                            </div>
                        </td>
                        <td class="pa3">
                        <div align="center" style={{color:this.state.sub_array["TUESDAY"][3]==='Free'?"red":""}}>
                            <p>{this.state.sub_array["TUESDAY"][3]}</p>
                            <p>{this.state.prof_array["TUESDAY"][3]}</p>
                            <p>{this.state.room_array["TUESDAY"][3]}</p>

                            </div>
                        </td>
                        <td class="pa3">
                        <div align="center" style={{color:this.state.sub_array["TUESDAY"][4]==='Free'?"red":""}}>
                        <p>{this.state.sub_array["TUESDAY"][4]}</p>
                            <p>{this.state.prof_array["TUESDAY"][4]}</p>
                            <p>{this.state.room_array["TUESDAY"][4]}</p>
                            </div>
                        </td>
                        <td class="pa3">
                        <div align="center" style={{color:this.state.sub_array["TUESDAY"][5]==='Free'?"red":""}}>
                            <p>{this.state.sub_array["TUESDAY"][5]}</p>
                            <p>{this.state.prof_array["TUESDAY"][5]}</p>
                            <p>{this.state.room_array["TUESDAY"][5]}</p>

                            </div>
                        </td>
                        
                    </tr>
                    <tr class="stripe-dark">
                    <td class="pa3 bg-white">Wednesday</td>
                    <td class="pa3">
                        <div align="center" style={{color:this.state.sub_array["WEDNESDAY"][0]==='Free'?"red":""}}>
                            <p>{this.state.sub_array["WEDNESDAY"][0]}</p>
                            <p>{this.state.prof_array["WEDNESDAY"][0]}</p>
                            <p>{this.state.room_array["WEDNESDAY"][0]}</p>

                        </div>
                        </td>
                        <td class="pa3">
                        <div align="center" style={{color:this.state.sub_array["WEDNESDAY"][1]==='Free'?"red":""}}>
                        <p>{this.state.sub_array["WEDNESDAY"][1]}</p>
                            <p>{this.state.prof_array["WEDNESDAY"][1]}</p>
                            <p>{this.state.room_array["WEDNESDAY"][1]}</p>

                            </div>
                        </td>
                        <td class="pa3">
                        <div align="center" style={{color:this.state.sub_array["WEDNESDAY"][2]==='Free'?"red":""}}>
                        <p>{this.state.sub_array["WEDNESDAY"][2]}</p>
                            <p>{this.state.prof_array["WEDNESDAY"][2]}</p>
                            <p>{this.state.room_array["WEDNESDAY"][2]}</p>

                            </div>
                        </td>
                        <td class="pa3">
                        <div align="center" style={{color:this.state.sub_array["WEDNESDAY"][3]==='Free'?"red":""}}>
                        <p>{this.state.sub_array["WEDNESDAY"][3]}</p>
                            <p>{this.state.prof_array["WEDNESDAY"][3]}</p>
                            <p>{this.state.room_array["WEDNESDAY"][3]}</p>

                            </div>
                        </td>
                        <td class="pa3">
                        <div align="center" style={{color:this.state.sub_array["WEDNESDAY"][4]==='Free'?"red":""}}>
                        <p>{this.state.sub_array["WEDNESDAY"][4]}</p>
                            <p>{this.state.prof_array["WEDNESDAY"][4]}</p>
                            <p>{this.state.room_array["WEDNESDAY"][4]}</p>
                            </div>
                        </td>
                        <td class="pa3">
                        <div align="center" style={{color:this.state.sub_array["WEDNESDAY"][5]==='Free'?"red":""}}>
                        <p>{this.state.sub_array["WEDNESDAY"][5]}</p>
                            <p>{this.state.prof_array["WEDNESDAY"][5]}</p>
                            <p>{this.state.room_array["WEDNESDAY"][5]}</p>

                            </div>
                        </td>
                    </tr>
                    <tr class="stripe-dark">
                    <td class="pa3 bg-white">Thursday</td>
                    <td class="pa3">
                        <div align="center" style={{color:this.state.sub_array["THURSDAY"][0]==='Free'?"red":""}}>
                        <p>{this.state.sub_array["THURSDAY"][0]}</p>
                            <p>{this.state.prof_array["THURSDAY"][0]}</p>
                            <p>{this.state.room_array["THURSDAY"][0]}</p>
                            
                            </div>
                        </td>
                        <td class="pa3">
                        <div align="center" style={{color:this.state.sub_array["THURSDAY"][1]==='Free'?"red":""}}>
                        <p>{this.state.sub_array["THURSDAY"][1]}</p>
                            <p>{this.state.prof_array["THURSDAY"][1]}</p>
                            <p>{this.state.room_array["THURSDAY"][1]}</p>

                            </div>
                        </td>
                        <td class="pa3">
                        <div align="center" style={{color:this.state.sub_array["THURSDAY"][2]==='Free'?"red":""}}>
                        <p>{this.state.sub_array["THURSDAY"][2]}</p>
                            <p>{this.state.prof_array["THURSDAY"][2]}</p>
                            <p>{this.state.room_array["THURSDAY"][2]}</p>

                            </div>
                        </td>
                        <td class="pa3">
                        <div align="center" style={{color:this.state.sub_array["THURSDAY"][3]==='Free'?"red":""}}>
                        <p>{this.state.sub_array["THURSDAY"][3]}</p>
                            <p>{this.state.prof_array["THURSDAY"][3]}</p>
                            <p>{this.state.room_array["THURSDAY"][3]}</p>
                            </div>
                        </td>
                        <td class="pa3">
                        <div align="center" style={{color:this.state.sub_array["THURSDAY"][4]==='Free'?"red":""}}>
                        <p>{this.state.sub_array["THURSDAY"][4]}</p>
                            <p>{this.state.prof_array["THURSDAY"][4]}</p>
                            <p>{this.state.room_array["THURSDAY"][4]}</p>
                            </div>
                        </td>
                        <td class="pa3">
                        <div align="center" style={{color:this.state.sub_array["THURSDAY"][5]==='Free'?"red":""}}>
                        <p>{this.state.sub_array["THURSDAY"][5]}</p>
                            <p>{this.state.prof_array["THURSDAY"][5]}</p>
                            <p>{this.state.room_array["THURSDAY"][5]}</p>

                            </div>
                        </td>
                    </tr>
                    <tr class="stripe-dark">
                    <td class="pa3 bg-white">Friday</td>
                    <td class="pa3">
                        <div align="center" style={{color:this.state.sub_array["FRIDAY"][0]==='Free'?"red":""}}>
                        <p>{this.state.sub_array["FRIDAY"][0]}</p>
                            <p>{this.state.prof_array["FRIDAY"][0]}</p>
                            <p>{this.state.room_array["FRIDAY"][0]}</p>
                            </div>
                        </td>
                        <td class="pa3">
                        <div align="center" style={{color:this.state.sub_array["FRIDAY"][1]==='Free'?"red":""}}>
                        <p>{this.state.sub_array["FRIDAY"][1]}</p>
                            <p>{this.state.prof_array["FRIDAY"][1]}</p>
                            <p>{this.state.room_array["FRIDAY"][1]}</p>

                            </div>
                        </td>
                        <td class="pa3">
                        <div align="center" style={{color:this.state.sub_array["FRIDAY"][2]==='Free'?"red":""}}>
                        <p>{this.state.sub_array["FRIDAY"][2]}</p>
                            <p>{this.state.prof_array["FRIDAY"][2]}</p>
                            <p>{this.state.room_array["FRIDAY"][2]}</p>

                            </div>
                        </td>
                        <td class="pa3">
                        <div align="center" style={{color:this.state.sub_array["FRIDAY"][3]==='Free'?"red":""}}>
                        <p>{this.state.sub_array["FRIDAY"][3]}</p>
                            <p>{this.state.prof_array["FRIDAY"][3]}</p>
                            <p>{this.state.room_array["FRIDAY"][3]}</p>
                            </div>
                        </td>
                        <td class="pa3">
                        <div align="center" style={{color:this.state.sub_array["FRIDAY"][4]==='Free'?"red":""}}>
                        <p>{this.state.sub_array["FRIDAY"][4]}</p>
                            <p>{this.state.prof_array["FRIDAY"][4]}</p>
                            <p>{this.state.room_array["FRIDAY"][4]}</p>

                            </div>
                        </td>
                        <td class="pa3">
                        <div align="center" style={{color:this.state.sub_array["FRIDAY"][5]==='Free'?"red":""}}>
                        <p>{this.state.sub_array["FRIDAY"][5]}</p>
                            <p>{this.state.prof_array["FRIDAY"][5]}</p>
                            <p>{this.state.room_array["FRIDAY"][5]}</p>

                            </div>
                        </td>
                    </tr>
                </tbody>
                </table>
            </div>
                <h4  style={{marginTop:"2%",marginLeft:"3%"}}>
                    Note: To print the table choose the print option from your browser and choose paper size as A2 or tabloid.
                </h4>

            </div>

        );



    }    






}



export default ClassTimeTable;