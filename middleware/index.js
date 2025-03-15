module.exports = {
    loginAdmin:(req, res, next)=>{
        if(req.user.type == 2){
            return next()
        }else{
            return res.status(403).send({
                message:" access to the requested resource is forbidden"
            })
        }
    },
    loginManager:(req, res, next)=>{
        if(req.user.type == 1){
            return next()
        }else{
            return res.status(403).send({
                message:" access to the requested resource is forbidden"
            })
        }
    },
    loginCastomer:(req, res, next)=>{
        if(req.user.type == 0){
            return next()
        }else{
            return res.status(403).send({
                message:" access to the requested resource is forbidden"
            })
        }
    }
}