import React from 'react';

class FreeClass extends React.Component {

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

            },
            free_array:{
                "MONDAY":[],
                "TUESDAY":[],
                "WEDNESDAY":[],
                "THURSDAY":[],
                "FRIDAY":[]

            }

        }
        
    }
    onGetClassTimeTable = () => {
        var free_array1={
            "MONDAY":[],
            "TUESDAY":[],
            "WEDNESDAY":[],
            "THURSDAY":[],
            "FRIDAY":[]

        }
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

                for(var i=0; i<7;i++){
                    if(this.state.sub_array["MONDAY"][i]==="Free"){
                        var k=i+1;
                        free_array1["MONDAY"].push("Period:"+k+"    ");
                    }
                    if(this.state.sub_array["TUESDAY"][i]==="Free"){
                        var k=i+1;
                        free_array1["TUESDAY"].push("Period:"+k+"    ");
                    }
                    if(this.state.sub_array["WEDNESDAY"][i]==="Free"){
                        var k=i+1;
                        free_array1["WEDNESDAY"].push("Period:"+k+"    ");
                    }
                    if(this.state.sub_array["THURSDAY"][i]==="Free"){
                        var k=i+1;
                        free_array1["THURSDAY"].push("Period:"+k+"    ");
                    }
                    if(this.state.sub_array["FRIDAY"][i]==="Free"){
                        var k=i+1;
                        free_array1["FRIDAY"].push("Period:"+k+"    ");
                    }

                    this.setState({
                        free_array:free_array1
                    })


                }

            
            }
            else{
                return alert("Failed getClasses")
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
                    Check free periods for a class here:    
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
                <table class="f6 w-50 mw8 center" cellspacing="0" style={{marginTop:'2%',marginBottom:'2%'}}>
                <thead>
                    <tr class="stripe-dark">
                    <th class="fw6 tl pa3 bg-white" style={{textAlign:'center'}}>Day</th>
                    <th class="fw6 tl pa3 bg-white" style={{textAlign:'center'}}>Free Periods</th>
                    </tr>
                </thead>
                <tbody class="lh-copy">
                    <tr class="stripe-dark">
                    <td class="pa3 bg-white" align="center">Monday</td>
                    <td class="pa3">
                        <div align="center">
                            <p>{this.state.free_array["MONDAY"]}</p>

                        </div>
                    </td>

                    </tr>
                    <tr class="stripe-dark">
                    <td class="pa3 bg-white" align="center">Tuesday</td>
                    <td class="pa3">
                        <div align="center">
                            <p>{this.state.free_array["TUESDAY"]}</p>

                        </div>
                    </td>
                        
                    </tr>
                    <tr class="stripe-dark">
                    <td class="pa3 bg-white" align="center">Wednesday</td>
                    <td class="pa3">
                        <div align="center">
                            <p>{this.state.free_array["WEDNESDAY"]}</p>

                        </div>
                    </td>
                    </tr>
                    <tr class="stripe-dark">
                    <td class="pa3 bg-white" align="center">Thursday</td>
                    <td class="pa3">
                        <div align="center">
                            <p>{this.state.free_array["THURSDAY"]}</p>

                        </div>
                    </td>
                    </tr>
                    <tr class="stripe-dark">
                    <td class="pa3 bg-white" align="center">Friday</td>
                    <td class="pa3">
                        <div align="center">
                            <p>{this.state.free_array["FRIDAY"]}</p>

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



export default FreeClass;