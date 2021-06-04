const handleGetRoomOccchart = (req,res,db)=>{
    const{roomnumber}=req.body;
    
    if(!(roomnumber)){
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
    var class_array={
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
            .from('room_occ_chart_temp')
            .where('roomnumber','=',roomnumber)
            .then(data =>{
                //console.log(data)
                for(var i=0;i<data.length;i++){
                    if (!(data[i].email))
                        continue;
                    //console.log(data[i])
                    sub_array[data[i].day][data[i].period-1]=data[i].subject
                    
                    class_array[data[i].day][data[i].period-1]=data[i].secnumber

                    prof_array[data[i].day][data[i].period-1]=prof_ref[data[i].email].concat(" - ",data[i].email)

                    
                }
                res.json({
                    sub_array:sub_array,
                    prof_array:prof_array,
                    class_array:class_array
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
    handleGetRoomOccchart: handleGetRoomOccchart
}