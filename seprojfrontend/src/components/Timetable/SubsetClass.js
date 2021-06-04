import React from 'react';
import swal from 'sweetalert';
class subsetclass extends React.Component {

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
            day:"MONDAY",
            period:"1"

        }
        
    }
    onGetClassTimeTable = () => {
        
        const secnumber=document.getElementById('chclass').value
        const day=document.getElementById('day').value
        const period=document.getElementById('period').value
        if(!(secnumber && day && period))
            return alert("Choose values in dropdowns correctly")
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
                this.setState({
                    day:day,
                    period:period

                })
            
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
                    Check specific periods of class time table here:    
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

                <div class="mw9 center ph3-ns">
                    <div class="cf ph2-ns">
                        <div class="fl w-100 w-50-ns pa2">
                        <article class="center mw5 mw6-ns br3 hidden ba b--black-10 mv4">
                            <h1 class="f4 bg-near-white br3 br--top black-60 mv0 pv2 ph3">Choose the day here</h1>
                            <div class="pa3 bt b--black-10">
                                <select id="day" class="w-100 db h2 f6 bg-near-white ba b--sliver gray" name="" >
                                    <option value="">Choose the day</option>
                                    <option value="MONDAY">MONDAY</option>
                                    <option value="TUESDAY">TUESDAY</option>
                                    <option value="WEDNESDAY">WEDNESDAY</option>
                                    <option value="THURSDAY">THURSDAY</option>
                                    <option value="FRIDAY">FRIDAY</option>
                                </select>
                            </div>
                        </article>
                        
                        </div>
                        <div class="fl w-100 w-50-ns pa2">
                        <article class="center mw5 mw6-ns br3 hidden ba b--black-10 mv4">
                            <h1 class="f4 bg-near-white br3 br--top black-60 mv0 pv2 ph3">Choose the period here</h1>
                            <div class="pa3 bt b--black-10">
                                <select id="period" class="w-100 db h2 f6 bg-near-white ba b--sliver gray" name="" >
                                    <option value="">Choose the period here</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                </select>
                            </div>
                        </article>
                        </div>
                    </div>
                </div>

                <div className="" style={{textAlign:'center'}}>
                    <input
                        onClick={this.onGetClassTimeTable}
                        className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                        type="button"
                        id="reg"
                        value="Get details"

                    />
                </div>
                <article class="center mw5 mw6-ns hidden ba mv4">
                    <h1 class="f4 bg-near-black white mv0 pv2 ph3">Class Details</h1>
                    <div class="pa3 bt">
                        <p class="f6 f5-ns lh-copy measure mv0">
                            {console.log(this.state.day)}
                            <p>{this.state.sub_array[this.state.day][this.state.period-1]}</p>
                            <p>{this.state.prof_array[this.state.day][this.state.period-1]}</p>
                            <p>{this.state.room_array[this.state.day][this.state.period-1]}</p>
                        </p>
                    </div>
                </article>
                
                
                

            </div>

        );



    }    






}



export default subsetclass;