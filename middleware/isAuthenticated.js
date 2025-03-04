import jwt from 'jsonwebtoken'

const isAuthenticated = async(req, res, next)=>{
    try{
        // console.log(req.cookies)
        const token = req.cookies.token;
        // console.log(token);
        if(!token){
            console.log("checking.....vin.....")
            return res.status(401).json({
                message:"token does not exit!"
            }) 
        }
        const decode = await jwt.verify(token, process.env.JWT_SECRET_KEY);
        if(!decode){
            return res.status(401).json({
                message:"Invalid token"
            })
        }
        req.id = decode.userId;
        next();
    }catch(error){
        console.log(error)
        return res.json({
            message:"some error in try!"
        })
    }
}

export default isAuthenticated;