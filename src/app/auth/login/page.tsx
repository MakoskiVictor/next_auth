"use client"
import { useForm } from "react-hook-form"

type FormValues = {
    email: string
    password: string
}

export default function LoginPage () {

    const {register, formState: {errors}, handleSubmit} = useForm<FormValues>()

    const onSubmit = handleSubmit(data => {
        console.log(data)
    })

    return(
        <section className=' h-[calc(100vh-7rem)] flex justify-center items-center '>
            <form onSubmit={onSubmit} className='w-full sm:w-1/4 p-7 ' noValidate >
                <h1 className=' text-slate-200 font-bold text-4xl mb-4 ' >LogIn</h1>

                <label htmlFor="email" className=' text-slate-500 mb-2 block text-sm ' > Email </label>
                <input type="email"
                placeholder='willsmith@mail.com'
                className=' p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full '
                    { ...register("email", {required: {
                        value: true,
                        message: "Email is required"
                    }, pattern: {
                        value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                        message: 'Invalid email address',
                      }} ) }
                />

                    { errors.email && (
                    <span className=' text-red-500 text-xs  ' >
                        { errors.email.message }
                    </span>
                ) }

                <label htmlFor="password" className=' text-slate-500 mb-2 block text-sm ' > Password </label>
                <input type="password" 
                placeholder='******'
                className=' p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full '
                    { ...register("password", {required: {
                        value: true,
                        message: "Password is required"
                    }} ) }
                />

                { errors.password && (
                    <span className=' text-red-500 text-xs ' >
                        { errors.password.message }
                    </span>
                ) }

            <button className=' w-full bg-blue-500 text-white p-3 rounded-lg mt-2 ' >
                    Register
                </button>
            </form>
        </section>
    )
}