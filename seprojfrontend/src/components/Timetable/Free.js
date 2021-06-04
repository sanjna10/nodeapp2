import React from 'react';

class Free extends React.Component {

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
            class_array:{
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

            },
            block_array:{
                "MONDAY":[],
                "TUESDAY":[],
                "WEDNESDAY":[],
                "THURSDAY":[],
                "FRIDAY":[]
            }


        }
    }    
    onGetRoomTimeTable = () => {
        var free_array1={
            "MONDAY":[],
            "TUESDAY":[],
            "WEDNESDAY":[],
            "THURSDAY":[],
            "FRIDAY":[]

        }
        var block_array1={
            "MONDAY":[],
            "TUESDAY":[],
            "WEDNESDAY":[],
            "THURSDAY":[],
            "FRIDAY":[]

        }
        
        const roomnumber=document.getElementById('chroom').value
        if(!roomnumber)
            return alert("Choose a room")
        fetch('http://localhost:2500/getRoomOccchart',{
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            
            body: JSON.stringify({
              roomnumber:roomnumber
            })


        })
        .then(response=> response.json())
        .then(resp=> {
            if(resp.sub_array){
                
                
                this.setState({
                    sub_array:resp.sub_array,
                    prof_array:resp.prof_array,
                    class_array:resp.class_array
                })
                console.log(this.state)
                
                var flag=0;
                for(var i=0; i<7;i++){
                    if(this.state.sub_array["MONDAY"][i]==="Free"){
                        if(i<=6 && this.state.sub_array["MONDAY"][i+1]==="Free"){
                            flag=1
                        }
                        var k=i+1;
                        free_array1["MONDAY"].push("Period:"+k+"    ");
                        if(flag===1){
                            block_array1["MONDAY"].push("Period:"+k+"    ");
                            flag=0
                        }
                    }
                    if(this.state.sub_array["TUESDAY"][i]==="Free"){
                        if(i<=6 && this.state.sub_array["TUESDAY"][i+1]==="Free"){
                            flag=1
                        }
                        
                        var k=i+1;
                        free_array1["TUESDAY"].push("Period:"+k+"    ");
                        if(flag===1){
                            block_array1["TUESDAY"].push("Period:"+k+"    ");
                            flag=0
                        }
                    }
                    if(this.state.sub_array["WEDNESDAY"][i]==="Free"){

                        if(i<=6 && this.state.sub_array["WEDNESDAY"][i+1]==="Free"){
                            flag=1
                        }
                        var k=i+1;
                        free_array1["WEDNESDAY"].push("Period:"+k+"    ");
                        if(flag===1){
                            block_array1["WEDNESDAY"].push("Period:"+k+"    ");
                            flag=0
                        }
                    }
                    if(this.state.sub_array["THURSDAY"][i]==="Free"){
                        if(i<=6 && this.state.sub_array["THURSDAY"][i+1]==="Free"){
                            flag=1
                        }
                        var k=i+1;
                        free_array1["THURSDAY"].push("Period:"+k+"    ");
                        if(flag===1){
                            block_array1["THURSDAY"].push("Period:"+k+"    ");
                            flag=0
                        }
                    }
                    if(this.state.sub_array["FRIDAY"][i]==="Free"){
                        if(i<=6 && this.state.sub_array["FRIDAY"][i+1]==="Free"){
                            flag=1
                        }
                        var k=i+1;
                        free_array1["FRIDAY"].push("Period:"+k+"    ");
                        if(flag===1){
                            block_array1["FRIDAY"].push("Period:"+k+"    ");
                            flag=0
                        }
                    }

                    this.setState({
                        free_array:free_array1,
                        block_array:block_array1
                    })


                }
                console.log(block_array1["MONDAY"])
            }
            else{
                return alert("Failed getRoom")
            }
        })
    }

    render() {
        let room_list = this.props.data;
        let roomOptionItems = room_list.map((item) =>
                <option value={item.roomnumber}>{item.roomnumber}</option>
            ); 
        //let class_list = this.props.state.array_class;
        //let classOptionItems = class_list.map((item) =>
          //      <option value={item.secnumber}>{item.secnumber}</option>
            //);
        return(
            <div>
                <h1 class="f3 f2-m f1-l fw6 black-90 mv3 b center" style={{marginTop:"2%",marginLeft:"3%"}}>
                    Choose room number to see free periods
                </h1>

                <article class="center mw5 mw6-ns br3 hidden ba b--black-10 mv4">
                    <h1 class="f4 bg-near-white br3 br--top black-60 mv0 pv2 ph3">Choose room number from the list below</h1>
                    <div class="pa3 bt b--black-10">
                        <select id="chroom" class="w-100 db h2 f6 bg-near-white ba b--sliver gray" name="" >
                            <option value="">Choose room number</option>
                            {roomOptionItems}
                        </select>
                    </div>
                </article>
                <div className="" style={{textAlign:'center'}}>
                    <input
                        onClick={this.onGetRoomTimeTable}
                        className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                        type="button"
                        id="reg"
                        value="View free periods"

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


            <div class="overflow-auto">
                <table class="f6 w-50 mw8 center" cellspacing="0" style={{marginTop:'2%',marginBottom:'2%'}}>
                <thead>
                    <tr class="stripe-dark">
                    <th class="fw6 tl pa3 bg-white" style={{textAlign:'center'}}>Day</th>
                    <th class="fw6 tl pa3 bg-white" style={{textAlign:'center'}}>Consecutive Free Periods</th>
                    </tr>
                </thead>
                <tbody class="lh-copy">
                    <tr class="stripe-dark">
                    <td class="pa3 bg-white" align="center">Monday</td>
                    <td class="pa3">
                        <div align="center">
                            <p>{this.state.block_array["MONDAY"]}</p>

                        </div>
                    </td>

                    </tr>
                    <tr class="stripe-dark">
                    <td class="pa3 bg-white" align="center">Tuesday</td>
                    <td class="pa3">
                        <div align="center">
                            <p>{this.state.block_array["TUESDAY"]}</p>

                        </div>
                    </td>
                        
                    </tr>
                    <tr class="stripe-dark">
                    <td class="pa3 bg-white" align="center">Wednesday</td>
                    <td class="pa3">
                        <div align="center">
                            <p>{this.state.block_array["WEDNESDAY"]}</p>

                        </div>
                    </td>
                    </tr>
                    <tr class="stripe-dark">
                    <td class="pa3 bg-white" align="center">Thursday</td>
                    <td class="pa3">
                        <div align="center">
                            <p>{this.state.block_array["THURSDAY"]}</p>

                        </div>
                    </td>
                    </tr>
                    <tr class="stripe-dark">
                    <td class="pa3 bg-white" align="center">Friday</td>
                    <td class="pa3">
                        <div align="center">
                            <p>{this.state.block_array["FRIDAY"]}</p>

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



export default Free;