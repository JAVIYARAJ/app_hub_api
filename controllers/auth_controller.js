const {PrismaClient}=require("@prisma/client")
const client=new PrismaClient()
const Joi = require('joi');
const bcrypt =require("bcrypt")
const {ErrorHandler,SuccessHandler}=require("../helpers/response-handler")
class AuthController{
    static login=async(req,res)=>{
        var response=await client.user.findFirst({
            where:{
                email:"raj@gmail.com"
            }
        })
        console.log(response);
    }

    static register=async(req,res)=>{

        const validation=Joi.object({
            email:Joi.string().email().required(),
            username:Joi.string().required(),
            password:Joi.string().min(5).max(10).required(),
            firstName:Joi.string().required(),
            lastName:Joi.string().required()
        })

        const {error}=validation.validate(req.body)
        if(error){
            ErrorHandler(res,error.message)
        }else{
            const {email,username,password,firstName,lastName}=req.body;
            const isEmailExists=await client.user.count({where:{
                email:email
            }})
            if(isEmailExists){
                ErrorHandler(res,"email already exists")
            }else{
                const salt = await bcrypt.genSalt(10)

                const bcryptPassword = await bcrypt.hash(password, salt)

                const createUser=await client.user.create({
                    data:{
                        email:email,
                        password:bcryptPassword,
                        firstName:firstName,
                        lastName:lastName,
                        username:username
                    }
                })

                if(createUser){
                    SuccessHandler(res,{"data":createUser},"Account create successfully")
                }else{
                    ErrorHandler(res,"Registration failed")
                }
            }
        }
    }

}

module.exports={AuthController}