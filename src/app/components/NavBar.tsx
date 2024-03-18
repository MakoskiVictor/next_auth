import Link from "next/link"
import {getServerSession} from "next-auth/next"
import {authOptions} from "@/app/api/auth/[...nextauth]/route"


export async function NavBar () {

    const session = await getServerSession(authOptions)

    return(
        <nav className="flex justify-between items-center bg-gray-950 text-white px-24 py-3">
            <h2 className="text-xl font-bold"><Link href="/">NextGatekeeper</Link></h2>

            <ul className="flex gap-x-2">
                {
                    !session?.user ? (
                        <>
                            <li><Link href="/">Home</Link></li>
                            <li><Link href="/auth/login" >LogIn</Link></li>
                            <li><Link href="/auth/register">Register</Link></li>
                        </>
                    ) :
                    (
                        <>
                        <li><Link href="/dashboard" >Dashboard</Link></li>
                        <li><Link href="/api/auth/signout">Sign out</Link></li>
                        </>
                    )
                }
            </ul>
        </nav>
    )
}