"use client"
import { useForm } from 'react-hook-form'
import { PostUser } from '@/app/api/auth/register/route'

type FormValues = {
    firstname: string
    lastname: string
    email: string
    password: string
    confirmPassword: string
}

export default function RegisterPage () {

    const { register, handleSubmit, formState: { errors}, watch } = useForm<FormValues>()

    const onSubmit = handleSubmit(async (data) => {
        console.log("Inicio HandleSubmit", data)
        const formData = {
            firstname: data.firstname,
            lastname: data.lastname,
            email: data.email,
            password: data.password,
        }
        console.log("Mitad HandleSubmit", formData)
        const res = await PostUser(formData)
        //const resJSON = await res.json()
        console.log(res)
    })

    console.log(errors)

    return(
        <section className=' h-[calc(100vh-7rem)] flex justify-center items-center ' >
            <form onSubmit={onSubmit} className='w-full sm:w-1/4 p-7 ' noValidate >
                <h1 className=' text-slate-200 font-bold text-4xl mb-4 ' >Register</h1>

                <label htmlFor="firstname" className=' text-slate-500 mb-2 block text-sm ' > Firstname </label>
                <input type="text" 
                placeholder='Will'
                className=' p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full '
                    { ...register("firstname", {required: {
                        value: true,
                        message: "Firstname is required"
                    }, minLength: 2} ) }
                />

                { errors.firstname && (
                    <span className=' text-red-500 text-xs  ' >
                        { errors.firstname.message }
                    </span>
                ) }

                <label htmlFor="lastname" className=' text-slate-500 mb-2 block text-sm ' > Lastname</label>
                <input type="text"
                placeholder='Smith'
                className=' p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full '
                    { ...register("lastname", {required: {
                        value: true,
                        message: "Lastname is required"
                    }, minLength: 2} ) }
                />

                { errors.lastname && (
                    <span className=' text-red-500 text-xs  ' >
                        { errors.lastname.message }
                    </span>
                ) }

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
                        message: "Password min length is 6"
                    }, minLength: 6} ) }
                />

                { errors.password && (
                    <span className=' text-red-500 text-xs ' >
                        { errors.password.message }
                    </span>
                ) }

                <label htmlFor="confirmPassword" className=' text-slate-500 mb-2 block text-sm ' > Confirm Password </label>
                <input type="password" 
                placeholder='******'
                className=' p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full '
                    { ...register("confirmPassword", {required: {
                        value: true,
                        message: "Please, confirm password"
                    }, validate: (val: string)=> {
                        if(watch("password") != val) {
                            return "Your passwords don't match"
                        }
                    } } ) }
                />

                { errors.confirmPassword && (
                    <span className=' text-red-500 text-xs  ' >
                        { errors.confirmPassword.message }
                    </span>
                ) }

                <button className=' w-full bg-blue-500 text-white p-3 rounded-lg mt-2 ' >
                    Register
                </button>
            </form>
        </section>
    )
}