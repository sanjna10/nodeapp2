const handleGetTeachers =(req,res,db) => {
    const {choice} = req.body;
    if(!(choice)){
        
        return res.status(400).json("Invalid Input. Please enter again")
    }
    if(choice==="teachers"){
        db.select('email','name').from('teachers')
        .then(data =>{
            console.log(data)
            res.json(data)
        })
        .catch(err => res.status(400).json('Error while getting choice'))

    }
    else if(choice==="classes"){
        db.select('secnumber').from('classname')
        .then(data =>{
            console.log(data)
            res.json(data)
        })
        .catch(err => {
            console.log("hide")
            res.status(400).json('Error while getting choice')
        })


    }
    else if(choice==="rooms"){
        db.select('roomnumber').from('classroom')
        .then(data =>{
            console.log(data)
            res.json(data)
        })
        .catch(err => {
            console.log("hide")
            res.status(400).json('Error while getting choice')
        })


    }



}
    


module.exports = {
    handleGetTeachers: handleGetTeachers
}