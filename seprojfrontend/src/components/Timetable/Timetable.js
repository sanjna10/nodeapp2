import React from 'react';
import swal from 'sweetalert';

//for (var l=0;l<20;l++){
//    obj.array[l] = l+1;
//}

//var flg=false; 

class Timetable extends React.Component {
    constructor(props){
        super(props);
        //super()
        //this.state={
           // array: [],
            ///optionItems:[]
        //}
        


    }
    redirectToAfterReserve = () => {
        const { history } = this.props;
        if(history){
            history.push('/dispcltimetable');
            console.log("sss")
        } 
        //window.location.reload();
    }    


    onSubmitTimetable = () =>{
        console.log(localStorage.getItem('usermail'))
        var secnumber=document.getElementById("chclass").value

        if(secnumber===""){
            return alert("Select the class and section")
        }

        var sub="s"
        var fac="f"
        var week={
            1:"m",
            2:"t",
            3:"w",
            4:"th",
            5:"f"
        }
        var week_full={
            1:"MONDAY",
            2:"TUESDAY",
            3:"WEDNESDAY",
            4:"THURSDAY",
            5:"FRIDAY"
        }
        var sub_table={
            "MONDAY":[],
            "TUESDAY":[],
            "WEDNESDAY":[],
            "THURSDAY":[],
            "FRIDAY":[]


        }
        var fac_table={
            "MONDAY":[],
            "TUESDAY":[],
            "WEDNESDAY":[],
            "THURSDAY":[],
            "FRIDAY":[]


        }
        for(var i=1;i<=5;i++){
            var temps=`${sub}${week[i]}`
            var tempf=`${fac}${week[i]}`

            for(var j=1;j<=6;j++){
                var final_sub=`${temps}${j}`
                var final_fac=`${tempf}${j}`

                //console.log(final_sub)

                var sub_val=document.getElementById(final_sub).value
                var fac_val=document.getElementById(final_fac).value


                sub_table[week_full[i]].push(sub_val)
                fac_table[week_full[i]].push(fac_val)
                
            }

        }
        var cnt=0

        for(var i=1;i<=5;i++){
            for(var j=0;j<6;j++){
                if((sub_table[week_full[i]][j]==="Free")||(fac_table[week_full[i]][j]==="Free")){
                    if (!((sub_table[week_full[i]][j]==="Free")&&(fac_table[week_full[i]][j]==="Free")))
                        return alert(`${week_full[i]} ${j+1}th period: Invalid entry`)
                    cnt+=1

                }   


            }
        }
        if(cnt===30){
            return alert("empty table")
        }

        fetch('http://localhost:2500/storeTimetable',{
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              secnumber:secnumber,
              sub_table:sub_table,
              fac_table:fac_table
            })
        })
        .then(response => response.json())
        .then(resp => {
            if(resp.status){
                if(resp.status==="Success"){
                  //alert("Time Table Stored Successfully");
                  swal("Success!", "Time Table Stored Successfully", "success");
                  //this.redirectToAfterReserve()
                }
                else{
                    swal("Failed!","Table Store unsuccessful","error")
                }
            }
            else{
                
                swal("Failed!","Table Store unsuccessful","error")
            }
        })

        
        console.log(sub_table)
        console.log(fac_table)
        
    }
   



    render() {
        let teacher_list = this.props.state.array;
        let optionItems = teacher_list.map((item) =>
                <option value={item.email}>{item.name} - {item.email}</option>
            );
        

        let class_list = this.props.state.array_class;
        let classOptionItems = class_list.map((item) =>
                <option value={item.secnumber}>{item.secnumber}</option>
            );
        
        let subject_list= ["Computer Organisation and Architecture","Theory of Computation","Machine Learning"]
        console.log(subject_list)
        console.log(teacher_list)
        let subOptionItems =  subject_list.map((item) =>
        <option key={item}>{item}</option>
    );
        return (
            <div class="pa4"> 
                
                <h1 class="f3 f2-m f1-l fw6 black-90 mv3 b center" style={{marginTop:"2%"}}>
                    Input the class timetable in this window:      
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

            <div class="overflow-auto">
                <table class="f6 w-100 mw8 center" cellspacing="0">
                <thead>
                    <tr class="stripe-dark">
                    <th class="fw6 tl pa3 bg-white">Day</th>
                    <th class="fw6 tl pa3 bg-white">Period 1</th>
                    <th class="fw6 tl pa3 bg-white">Period 2</th>
                    <th class="fw6 tl pa3 bg-white">Period 3</th>
                    <th class="fw6 tl pa3 bg-white">Period 4</th>
                    <th class="fw6 tl pa3 bg-white">Period 5</th>
                    <th class="fw6 tl pa3 bg-white">Period 6</th>

                    </tr>
                </thead>
                <tbody class="lh-copy">
                    <tr class="stripe-dark">
                    <td class="pa3 bg-white" >Monday</td>
                    <td class="pa3"><div>
                        <select id="sm1" class="w-100 db h2 f6 bg-near-white ba b--sliver gray" name="" >
                        <option value="Free">Choose subject</option>
                        {subOptionItems}
                        </select>
                        <select id="fm1" class="w-100 db h2 f6 bg-near-white ba b--sliver gray" name="" style={{marginTop:"2%"}}>
                        <option value="Free">Choose faculty</option>
                        {optionItems}
                        </select>

                        </div>
                    </td>
                    <td class="pa3">
                        <div>
                            <select id="sm2" class="w-100 db h2 f6 bg-near-white ba b--sliver gray" name="" >
                            <option value="Free">Choose subject</option>
                            {subOptionItems}
                            </select>
                            <select id="fm2" class="w-100 db h2 f6 bg-near-white ba b--sliver gray" name="" style={{marginTop:"2%"}}>
                            <option value="Free">Choose faculty</option>
                            {optionItems}
                            </select>

                            </div>
                        </td>
                        <td class="pa3">
                        <div>
                            <select id="sm3" class="w-100 db h2 f6 bg-near-white ba b--sliver gray" name="" >
                            <option value="Free">Choose subject</option>
                            {subOptionItems}
                            </select>
                            <select id="fm3" class="w-100 db h2 f6 bg-near-white ba b--sliver gray" name="" style={{marginTop:"2%"}}>
                            <option value="Free">Choose faculty</option>
                            {optionItems}
                            </select>

                            </div>
                        </td>
                        <td class="pa3">
                        <div>
                            <select id="sm4" class="w-100 db h2 f6 bg-near-white ba b--sliver gray" name="" >
                            <option value="Free">Choose subject</option>
                            {subOptionItems}
                            </select>
                            <select id="fm4" class="w-100 db h2 f6 bg-near-white ba b--sliver gray" name="" style={{marginTop:"2%"}}>
                            <option value="Free">Choose faculty</option>
                            {optionItems}
                            </select>

                            </div>
                        </td>
                        <td class="pa3">
                        <div>
                            <select id="sm5" class="w-100 db h2 f6 bg-near-white ba b--sliver gray" name="" >
                            <option value="Free">Choose subject</option>
                            {subOptionItems}
                            </select>
                            <select id="fm5" class="w-100 db h2 f6 bg-near-white ba b--sliver gray" name="" style={{marginTop:"2%"}}>
                            <option value="Free">Choose faculty</option>
                            {optionItems}
                            </select>

                            </div>
                        </td>
                        <td class="pa3">
                        <div>
                            <select id="sm6" class="w-100 db h2 f6 bg-near-white ba b--sliver gray" name="" >
                            <option value="Free">Choose subject</option>
                            {subOptionItems}
                            </select>
                            <select id="fm6" class="w-100 db h2 f6 bg-near-white ba b--sliver gray" name="" style={{marginTop:"2%"}}>
                            <option value="Free">Choose faculty</option>
                            {optionItems}
                            </select>

                            </div>
                        </td>
                    </tr>
                    <tr class="stripe-dark">
                    <td class="pa3 bg-white">Tuesday</td>
                    <td class="pa3">
                        <div>
                            <select id="st1" class="w-100 db h2 f6 bg-near-white ba b--sliver gray" name="" >
                            <option value="Free">Choose subject 1</option>
                            {subOptionItems}
                            </select>
                            <select id="ft1" class="w-100 db h2 f6 bg-near-white ba b--sliver gray" name="" style={{marginTop:"2%"}}>
                            <option value="Free">Choose faculty</option>
                            {optionItems}
                            </select>

                            </div>
                        </td>
                        <td class="pa3">
                        <div>
                            <select id="st2" class="w-100 db h2 f6 bg-near-white ba b--sliver gray" name="" >
                            <option value="Free">Choose subject</option>
                            {subOptionItems}
                            </select>
                            <select id="ft2" class="w-100 db h2 f6 bg-near-white ba b--sliver gray" name="" style={{marginTop:"2%"}}>
                            <option value="Free">Choose faculty</option>
                            {optionItems}
                            </select>

                            </div>
                        </td>
                        <td class="pa3">
                        <div>
                            <select id="st3" class="w-100 db h2 f6 bg-near-white ba b--sliver gray" name="" >
                            <option value="Free">Choose subject</option>
                            {subOptionItems}
                            </select>
                            <select id="ft3" class="w-100 db h2 f6 bg-near-white ba b--sliver gray" name="" style={{marginTop:"2%"}}>
                            <option value="Free">Choose faculty</option>
                            {optionItems}
                            </select>

                            </div>
                        </td>
                        <td class="pa3">
                        <div>
                            <select id="st4" class="w-100 db h2 f6 bg-near-white ba b--sliver gray" name="" >
                            <option value="Free">Choose subject</option>
                            {subOptionItems}
                            </select>
                            <select id="ft4" class="w-100 db h2 f6 bg-near-white ba b--sliver gray" name="" style={{marginTop:"2%"}}>
                            <option value="Free">Choose faculty</option>
                            {optionItems}
                            </select>

                            </div>
                        </td>
                        <td class="pa3">
                        <div>
                            <select id="st5" class="w-100 db h2 f6 bg-near-white ba b--sliver gray" name="" >
                            <option value="Free">Choose subject</option>
                            {subOptionItems}
                            </select>
                            <select id="ft5" class="w-100 db h2 f6 bg-near-white ba b--sliver gray" name="" style={{marginTop:"2%"}}>
                            <option value="Free">Choose faculty</option>
                            {optionItems}
                            </select>

                            </div>
                        </td>
                        <td class="pa3">
                        <div>
                            <select id="st6" class="w-100 db h2 f6 bg-near-white ba b--sliver gray" name="" >
                            <option value="Free">Choose subject</option>
                            {subOptionItems}
                            </select>
                            <select id="ft6" class="w-100 db h2 f6 bg-near-white ba b--sliver gray" name="" style={{marginTop:"2%"}}>
                            <option value="Free">Choose faculty</option>
                            {optionItems}
                            </select>

                            </div>
                        </td>
                        
                    </tr>
                    <tr class="stripe-dark">
                    <td class="pa3 bg-white">Wednesday</td>
                    <td class="pa3">
                        <div>
                            <select id="sw1" class="w-100 db h2 f6 bg-near-white ba b--sliver gray" name="" >
                            <option value="Free">Choose subject</option>
                            {subOptionItems}
                            </select>
                            <select id="fw1" class="w-100 db h2 f6 bg-near-white ba b--sliver gray" name="" style={{marginTop:"2%"}}>
                            <option value="Free">Choose faculty</option>
                            {optionItems}
                            </select>

                            </div>
                        </td>
                        <td class="pa3">
                        <div>
                            <select id="sw2" class="w-100 db h2 f6 bg-near-white ba b--sliver gray" name="" >
                            <option value="Free">Choose subject</option>
                            {subOptionItems}
                            </select>
                            <select id="fw2" class="w-100 db h2 f6 bg-near-white ba b--sliver gray" name="" style={{marginTop:"2%"}}>
                            <option value="Free">Choose faculty</option>
                            {optionItems}
                            </select>

                            </div>
                        </td>
                        <td class="pa3">
                        <div>
                            <select id="sw3" class="w-100 db h2 f6 bg-near-white ba b--sliver gray" name="" >
                            <option value="Free">Choose subject</option>
                            {subOptionItems}
                            <option label="Co-Working" value="72">Space Type
                            </option>
                            </select>
                            <select id="fw3" class="w-100 db h2 f6 bg-near-white ba b--sliver gray" name="" style={{marginTop:"2%"}}>
                            <option value="Free">Choose faculty</option>
                            {optionItems}
                            </select>

                            </div>
                        </td>
                        <td class="pa3">
                        <div>
                            <select id="sw4" class="w-100 db h2 f6 bg-near-white ba b--sliver gray" name="" >
                            <option value="Free">Choose subject</option>
                            {subOptionItems}
                            </select>
                            <select id="fw4" class="w-100 db h2 f6 bg-near-white ba b--sliver gray" name="" style={{marginTop:"2%"}}>
                            <option value="Free">Choose faculty</option>
                            {optionItems}
                            </select>

                            </div>
                        </td>
                        <td class="pa3">
                        <div>
                            <select id="sw5" class="w-100 db h2 f6 bg-near-white ba b--sliver gray" name="" >
                            <option value="Free">Choose subject</option>
                            {subOptionItems}
                            </select>
                            <select id="fw5" class="w-100 db h2 f6 bg-near-white ba b--sliver gray" name="" style={{marginTop:"2%"}}>
                            <option value="Free">Choose faculty</option>
                            {optionItems}
                            </select>

                            </div>
                        </td>
                        <td class="pa3">
                        <div>
                            <select id="sw6" class="w-100 db h2 f6 bg-near-white ba b--sliver gray" name="" >
                            <option value="Free">Choose subject</option>
                            {subOptionItems}
                            </select>
                            <select id="fw6" class="w-100 db h2 f6 bg-near-white ba b--sliver gray" name="" style={{marginTop:"2%"}}>
                            <option value="Free">Choose faculty</option>
                            {optionItems}
                            </select>

                            </div>
                        </td>
                    </tr>
                    <tr class="stripe-dark">
                    <td class="pa3 bg-white">Thursday</td>
                    <td class="pa3">
                        <div>
                            <select id="sth1" class="w-100 db h2 f6 bg-near-white ba b--sliver gray" name="" >
                            <option value="Free">Choose subject</option>
                            {subOptionItems}
                            </select>
                            <select id="fth1" class="w-100 db h2 f6 bg-near-white ba b--sliver gray" name="" style={{marginTop:"2%"}}>
                            <option value="Free">Choose faculty</option>
                            {optionItems}
                            </select>

                            </div>
                        </td>
                        <td class="pa3">
                        <div>
                            <select id="sth2" class="w-100 db h2 f6 bg-near-white ba b--sliver gray" name="" >
                            <option value="Free">Choose subject</option>
                            {subOptionItems}
                            </select>
                            <select id="fth2" class="w-100 db h2 f6 bg-near-white ba b--sliver gray" name="" style={{marginTop:"2%"}}>
                            <option value="Free">Choose faculty</option>
                            {optionItems}
                            </select>

                            </div>
                        </td>
                        <td class="pa3">
                        <div>
                            <select id="sth3" class="w-100 db h2 f6 bg-near-white ba b--sliver gray" name="" >
                            <option value="Free">Choose subject</option>
                            {subOptionItems}
                            </select>
                            <select id="fth3" class="w-100 db h2 f6 bg-near-white ba b--sliver gray" name="" style={{marginTop:"2%"}}>
                            <option value="Free">Choose faculty</option>
                            {optionItems}
                            </select>

                            </div>
                        </td>
                        <td class="pa3">
                        <div>
                            <select id="sth4" class="w-100 db h2 f6 bg-near-white ba b--sliver gray" name="" >
                            <option value="Free">Choose subject</option>
                            {subOptionItems}
                            </select>
                            <select id="fth4" class="w-100 db h2 f6 bg-near-white ba b--sliver gray" name="" style={{marginTop:"2%"}}>
                            <option value="Free">Choose faculty</option>
                            {optionItems}
                            </select>

                            </div>
                        </td>
                        <td class="pa3">
                        <div>
                            <select id="sth5" class="w-100 db h2 f6 bg-near-white ba b--sliver gray" name="" >
                            <option value="Free">Choose subject</option>
                            {subOptionItems}
                            </select>
                            <select id="fth5" class="w-100 db h2 f6 bg-near-white ba b--sliver gray" name="" style={{marginTop:"2%"}}>
                            <option value="Free">Choose faculty</option>
                            {optionItems}
                            </select>

                            </div>
                        </td>
                        <td class="pa3">
                        <div>
                            <select id="sth6" class="w-100 db h2 f6 bg-near-white ba b--sliver gray" name="" >
                            <option value="Free">Choose subject</option>
                            {subOptionItems}
                            </select>
                            <select id="fth6" class="w-100 db h2 f6 bg-near-white ba b--sliver gray" name="" style={{marginTop:"2%"}}>
                            <option value="Free">Choose faculty</option>
                            {optionItems}
                            </select>

                            </div>
                        </td>
                    </tr>
                    <tr class="stripe-dark">
                    <td class="pa3 bg-white">Friday</td>
                    <td class="pa3">
                        <div>
                            <select id="sf1" class="w-100 db h2 f6 bg-near-white ba b--sliver gray" name="" >
                            <option value="Free">Choose subject</option>
                            {subOptionItems}
                            </select>
                            <select id="ff1" class="w-100 db h2 f6 bg-near-white ba b--sliver gray" name="" style={{marginTop:"2%"}}>
                            <option value="Free">Choose faculty</option>
                            {optionItems}
                            </select>

                            </div>
                        </td>
                        <td class="pa3">
                        <div>
                            <select id="sf2" class="w-100 db h2 f6 bg-near-white ba b--sliver gray" name="" >
                            <option value="Free">Choose subject</option>
                            {subOptionItems}
                            </select>
                            <select id="ff2" class="w-100 db h2 f6 bg-near-white ba b--sliver gray" name="" style={{marginTop:"2%"}}>
                            <option value="Free">Choose faculty</option>
                            {optionItems}
                            </select>

                            </div>
                        </td>
                        <td class="pa3">
                        <div>
                            <select id="sf3" class="w-100 db h2 f6 bg-near-white ba b--sliver gray" name="" >
                            <option value="Free">Choose subject</option>
                            {subOptionItems}
                            </select>
                            <select id="ff3" class="w-100 db h2 f6 bg-near-white ba b--sliver gray" name="" style={{marginTop:"2%"}}>
                            <option value="Free">Choose faculty</option>
                            {optionItems}
                            </select>

                            </div>
                        </td>
                        <td class="pa3">
                        <div>
                            <select id="sf4" class="w-100 db h2 f6 bg-near-white ba b--sliver gray" name="" >
                            <option value="Free">Choose subject</option>
                            {subOptionItems}
                            </select>
                            <select id="ff4" class="w-100 db h2 f6 bg-near-white ba b--sliver gray" name="" style={{marginTop:"2%"}}>
                            <option value="Free">Choose faculty</option>
                            {optionItems}
                            </select>

                            </div>
                        </td>
                        <td class="pa3">
                        <div>
                            <select id="sf5" class="w-100 db h2 f6 bg-near-white ba b--sliver gray" name="" >
                            <option value="Free">Choose subject</option>
                            {subOptionItems}
                            </select>
                            <select id="ff5" class="w-100 db h2 f6 bg-near-white ba b--sliver gray" name="" style={{marginTop:"2%"}}>
                            <option value="Free">Choose faculty</option>
                            {optionItems}
                            </select>

                            </div>
                        </td>
                        <td class="pa3">
                        <div>
                            <select id="sf6" class="w-100 db h2 f6 bg-near-white ba b--sliver gray" name="" >
                            <option value="Free">Choose subject</option>
                            {subOptionItems}
                            </select>
                            <select id="ff6" class="w-100 db h2 f6 bg-near-white ba b--sliver gray" name="" style={{marginTop:"2%"}}>
                            <option value="Free">Choose faculty</option>
                            {optionItems}
                            </select>

                            </div>
                        </td>
                    </tr>
                </tbody>
                </table>
            </div>

            <div class="ph3" style={{marginTop:'4%',marginLeft:'44%'}}>
            <a class="f6 link dim br-pill ph3 pv2 mb2 dib white bg-navy" href="#0" onClick={this.onSubmitTimetable}>Submit timetable</a>
            </div>    
        </div>

        );

    }    


}    

export default Timetable;