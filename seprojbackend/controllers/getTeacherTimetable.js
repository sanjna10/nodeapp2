const handleGetTeacherTimetable= (req,res,db)=>{
    const{email}=req.body;
    
    if(!(email)){
        console.log("sss")
        return res.status(400).json("Invalid Input. Please enter again")
    }
    var sub_array={
        "MONDAY":["Free","Free","Free","Free","Free","Free"],
        "TUESDAY":["Free","Free","Free","Free","Free","Free"],
        "WEDNESDAY":["Free","Free","Free","Free","Free","Free"],
        "THURSDAY":["Free","Free","Free","Free","Free","Free"],
        "FRIDAY":["Free","Free","Free","Free","Free","Free"]
    }
    var room_array={
        "MONDAY":[null,null,null,null,null,null],
        "TUESDAY":[null,null,null,null,null,null],
        "WEDNESDAY":[null,null,null,null,null,null],
        "THURSDAY":[null,null,null,null,null,null],
        "FRIDAY":[null,null,null,null,null,null]
    }
    var class_array={
        "MONDAY":[null,null,null,null,null,null],
        "TUESDAY":[null,null,null,null,null,null],
        "WEDNESDAY":[null,null,null,null,null,null],
        "THURSDAY":[null,null,null,null,null,null],
        "FRIDAY":[null,null,null,null,null,null]
    }
    
    
    db.select('*')
    .from('professor_timetable_temp')
    .where('email','=',email)
    .then(data =>{
        //console.log(data)
        for(var i=0;i<data.length;i++){
            if (!(data[i].secnumber))
                continue;
            //console.log(data[i])
            sub_array[data[i].day][data[i].period-1]=data[i].subject
            
            class_array[data[i].day][data[i].period-1]=data[i].secnumber

            room_array[data[i].day][data[i].period-1]=data[i].roomnumber

            
        }
        res.json({
            sub_array:sub_array,
            room_array:room_array,
            class_array:class_array
        })

    })
    .catch(err=>{
        console.log(err)
        res.status(400).json("Invalid Input. Please enter again")
    })

            
            
    



}




module.exports = {
    handleGetTeacherTimetable: handleGetTeacherTimetable
}