function authorize(req,res,next){
    let {user} = req.query;
    if(user.toLowerCase() === "john"){
        req.user = {name: 'John', id: 3};
        next();
    }
    else{
        res.status(401).send("Unauthorize");
    }
}

module.exports = authorize;