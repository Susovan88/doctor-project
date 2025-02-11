import jwt from "jsonwebtoken";

const authAdmin=async(req,res,next)=>{
    try{
        const {atoken}=req.headers;
        if(!atoken){
            return res.json({success:true,message:"Not Authorized Login Again !!!"});
        }
        else{
            const token_decode=jwt.verify(atoken,process.env.JWT_SECRET);
            if(token_decode!==process.env.ADMIN_EMAIL+process.env.ADMIN_PASSWORD){
                return res.json({success:true,message:"Not Authorized Login Again !!!"});
            }
            next();
        }
    }catch(err){
        console.log(err);
        res.json({success:false,message:err.message});
    }
}

export default authAdmin;