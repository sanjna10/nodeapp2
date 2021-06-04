const handleChangePassword =(req,res,db) => {
    const {password,phonenumber} = req.body;
    if(!(password,phonenumber)){
        console.log("begin")
        return res.status(400).json("Invalid Input. Please enter again")
    }
    db('teachers')
    .where('phonenumber','=',phonenumber)
    .update({
        password:password
    })
    .then(dt=>{
        res.json({
            status:"Success"
        })
    })
    .catch(err=>{
        res.json({
            status:"Failure"
        })
    })
}

module.exports = {
    handleChangePassword: handleChangePassword
}