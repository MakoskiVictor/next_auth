import { NextResponse } from "next/server"
import db from "@/app/libs/db"

interface RegisterData {
    firstname: string
    lastname: string
    email: string
    password: string
}

interface RegisterDataJson {
    json(): RegisterData
}

export async function POST (request : RegisterDataJson) {
    const data = await request.json() 

    const userFound = await db.user.findUnique({
        where: {
            email: data.email
        }
    })

    if(userFound) {
        return NextResponse.json({
            message: "Email alredy exist"
        },{
            status: 400
        })
    }

    const newUser = await db.user.create({
        data
    })
    
    return NextResponse.json(newUser)
}