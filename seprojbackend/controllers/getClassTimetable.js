const handleGetClassTimetable = (req,res,db)=>{
    const{secnumber}=req.body;
    
    if(!(secnumber)){
        return res.status(400).json("Invalid Input. Please enter again")
    }
    var sub_array={
        "MONDAY":["Free","Free","Free","Free","Free","Free"],
        "TUESDAY":["Free","Free","Free","Free","Free","Free"],
        "WEDNESDAY":["Free","Free","Free","Free","Free","Free"],
        "THURSDAY":["Free","Free","Free","Free","Free","Free"],
        "FRIDAY":["Free","Free","Free","Free","Free","Free"]
    }
    var prof_array={
        "MONDAY":[null,null,null,null,null,null],
        "TUESDAY":[null,null,null,null,null,null],
        "WEDNESDAY":[null,null,null,null,null,null],
        "THURSDAY":[null,null,null,null,null,null],
        "FRIDAY":[null,null,null,null,null,null]
    }
    var room_array={
        "MONDAY":[null,null,null,null,null,null],
        "TUESDAY":[null,null,null,null,null,null],
        "WEDNESDAY":[null,null,null,null,null,null],
        "THURSDAY":[null,null,null,null,null,null],
        "FRIDAY":[null,null,null,null,null,null]
    }
    var prof_ref={}
    db.select('email','name')
    .from('teachers')
    .then(nd=>{
        for(var j=0;j<nd.length;j++){
            prof_ref[nd[j].email]=nd[j].name
        }

        db.select('*')
    .from('class_timetable_temp')
    .where('secnumber','=',secnumber)
    .then(data =>{
        //console.log(data)
        for(var i=0;i<data.length;i++){
            if (!(data[i].email))
                continue;
            //console.log(data[i])
            sub_array[data[i].day][data[i].period-1]=data[i].subject
            
            room_array[data[i].day][data[i].period-1]=data[i].roomnumber

            prof_array[data[i].day][data[i].period-1]=prof_ref[data[i].email].concat(" - ",data[i].email)

            
        }
        res.json({
            sub_array:sub_array,
            prof_array:prof_array,
            room_array:room_array
        })

    })
    .catch(err=>{
        console.log(err)
        res.status(400).json("Invalid Input. Please enter again")
    })

    })
    .catch(err=>{
        console.log(err)
        res.status(400).json("Invalid Input. Please enter again")
    })
    



}




module.exports = {
    handleGetClassTimetable: handleGetClassTimetable
}