import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import db from "@/app/libs/db"
import bcrypt from "bcrypt"



const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "email", type: "text", placeholder: "jsmith" },
                password: { label: "password", type: "password" }
            },
            async authorize(credentials, req): Promise<any> {
                
                // Buscamos el usuario
                const userFound = await db.user.findUnique({
                    where: {
                        email: credentials?.email
                    }
                })

                if(!userFound) return null

                const matchPassword = credentials?.password ? await bcrypt.compare(credentials?.password, userFound.password) : false

                if(!matchPassword) return null

                return {
                    id: userFound.id,
                    name: userFound.firstname,
                    email: userFound.email
                }
            }
        })
    ]
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }