import { connect } from "@/dbConfig/dbConfig";
import User from '@/models/userModel'
import { NextResponse,NextRequest } from "next/server";
import bcryptjs from 'bcryptjs';
import { sendEmail } from "@/helpers/mailer";

connect();

export async function POST(request:NextRequest){
    try {
        const reqBody = await request.json();
        const {username,email,password} = reqBody;
        console.log(reqBody);

        const user =await User.findOne({email});

        if(user){
            return NextResponse.json({error:"User already Exits"},{
                status:400
            })
        }

        //hash password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await   bcryptjs.hash(password,salt);

        //getting user info
        const newUser = {
            username,
            email,
            password:hashedPassword
        }
        
        //saving the data to mongodb

        const savedUser = await User.create(newUser);
        console.log(savedUser);


        // send a verification mail
        await sendEmail({email,emailType:"VERIFY",userId:savedUser._id})
        return NextResponse.json({
            message:"User created successfully",
            success:true,
            savedUser
        })
        
    } catch (error:any) {
        return NextResponse.json({error:error.message},{
            status:500
        })
    }
}