import Link from "next/link"

export function NavBar () {
    return(
        <nav className=" flex space-x-10 " >
            <h2 className="text-slate-300 ">NextRegister</h2>
            <ul className="text-slate-300 ">
                <li><Link href="/auth/login" >LogIn</Link></li>
                <li><Link href="/auth/register">Register</Link></li>
                <li></li>
            </ul>
        </nav>
    )
}