import UserModel from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

class UserController {
  constructor() {
    this.model = UserModel;
  }

  //* sign up
  signup({ name, email, password }) {
    return new Promise(async (res, rej) => {
      try {
        if (name != "" && email != "" && password != "") {
          if (email.includes("@")) {
            const user = await this.model.findOne({ email });
            if (user) {
              rej({
                msg: "User already exists",
                status: 0,
              });
            } else {
              // generate salt
              const salt = await bcrypt.genSalt(10);

              // hash password
              const hashedPassword = await bcrypt.hash(password, salt);

              // save data into database
              const newUser = await this.model({
                name,
                email,
                password: hashedPassword,
              });

              newUser
                .save()
                .then(() => {
                  res({
                    msg: "user signup successfully",
                    status: 1,
                  });
                })
                .catch(() => {
                  rej({
                    msg: "Internal server error",
                    status: 0,
                  });
                });
            }
          } else {
            rej({
              msg: "please enter correct email",
              status: 0,
            });
          }
        } else {
          rej({
            msg: "all fealds are required",
            status: 0,
          });
        }
      } catch (error) {
        
        console.log(error);
      }
    });
  }

 //* login
 login({email,password}){
    return new Promise(
      async  (res,rej)=>{
            try {
                if(email != '' && password != ''){
                    if(email?.includes('@')){

                        const user = await this.model.findOne({email})

                        if(!user){
                            rej(
                                {
                                    msg:"User Not exist",
                                    status:0
                                }
                            )
                        }else{
                            // matching user password to hash password with bcrypt.compare()

                            const passMatch = await bcrypt.compare(password,user.password)

                            // if match password then generate token
                            if(passMatch){
                                const token = jwt.sign({userId:user.id,},process.env.JWT_SECRET)

                                res(
                                  {
                                    msg:"Login successful",
                                    status:1,
                                    token
                                  }
                                    
                                )
                            }else{
                                rej(
                                    {
                                      msg:"Unable to login",
                                      status:0,
                                      
                                    }
                                      
                                  )
                            }
                        }
                    }else{
                        rej(
                            {
                                msg:"Please enter correct email",
                                status:0
                            }
                        )
                    }
                }else{
                    rej(
                        {
                            msg:"all fields are required",
                            status:0
                        }
                    )
                }
            } catch (error) {
                console.log(error)
            }
        }
    )
 }   
}

export default UserController;
