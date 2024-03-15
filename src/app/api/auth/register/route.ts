import { NextResponse } from "next/server"
import db from "@/app/libs/db"
import bcrypt from "bcrypt"


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
    try {
        const data = await request.json() 

    const userFound = await db.user.findUnique({
        where: {
            email: data.email
        }
    })
    //Verifico si e luser existe
    if(userFound) {
        return NextResponse.json({
            message: "Email alredy exist"
        },{
            status: 400
        })
    }

    // Si no existe, creo el usuario con contraseña hasheada
    const hashedPassword = await bcrypt.hash(data.password, 10)
    const newUser = await db.user.create({
        data: {
            firstname: data.firstname,
            lastname: data.lastname,
            email: data.email,
            password: hashedPassword
        }
    })

    // No devuelvo el password
    const {password: _, ...user} = newUser

    // Devuelvo el ok
    return NextResponse.json(newUser)

    } catch (error: any) {
        return NextResponse.json({
            message: error.message
        },
        {
            status: 500
        })
    }
}