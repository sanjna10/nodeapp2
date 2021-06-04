const handleLogin =(req,res,db) => {
    const {email,password} = req.body;
    if(!(email && password)){
        return res.status(400).json("Invalid Input. Please enter again")
    }
    db.select('*').from('teachers')
    .where('email', '=', email)
    .then(data =>{
        if(password == data[0].password){
            //console.log(data)
            res.json(data[0])
        } else{
            res.status(400).json('Wrong Pw')
        }
    })
    .catch(err => res.status(400).json('Wrong credentials'))
}

module.exports = {
    handleLogin: handleLogin
}