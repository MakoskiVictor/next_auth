import { NextResponse } from "next/server"

interface RegisterData {
    firstname: string
    lastname: string
    email: string
    password: string
}

export async function PostUser (request : RegisterData) {
    //const data = await request.json() 
    console.log("Inicio postUser", request)
    const data = await fetch('https://metropolitan-k7ev.vercel.app/api/v1/auth/register', {
        method: "POST",
        headers: {
            "Content-Type": "aplication/json"
        },
        body: JSON.stringify(request)
    })
    console.log("Final postUser", data)
    //return NextResponse.json("registering...")
    return data
}