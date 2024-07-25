const jwt = requre('jsonewebtoken')
module.exports - function(req,res, next){
    const token = req.header('x-auth-token');
    if(!token){
        return res.status(401).json({
            msg:"No token, authorisation denied"
        })
    }

    try {
        const decoded = jwt.verify (token, 'jwtsecret');
        req.user = decoded.user;
        next();
    } catch (error) {
        res.status(401).json({
            msg: 'Token is not valid'
        })
    }
}