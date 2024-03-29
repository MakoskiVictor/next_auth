"use client"
import { useForm } from 'react-hook-form'
import { useRouter } from "next/navigation"
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

type FormValues = {
    firstname: string
    lastname: string
    email: string
    password: string
    confirmPassword: string
}

export default function RegisterPage () {

    // Avisos
    const notify = () => toast("Email already exist!");

    const router = useRouter()

    const { register, handleSubmit, formState: { errors}, watch } = useForm<FormValues>()

    const onSubmit = handleSubmit(async (data) => {

        const formData = {
            firstname: data.firstname,
            lastname: data.lastname,
            email: data.email,
            password: data.password,
        }

        const res = await fetch('/api/auth/register', {
            method: "POST",
            headers: {
                "Content-Type": "aplication/json"
            },
            body: JSON.stringify(formData)
        })

        if(res.ok) {
            router.push("/auth/login")
        } else {
            notify()
        }
    })

    return(
        <section className=' h-[calc(100vh-7rem)] flex justify-center items-center ' >
            <form onSubmit={onSubmit} className='w-full sm:w-1/4 p-7 ' noValidate >
                <h1 className=' text-slate-200 font-bold text-4xl mb-4 ' >Register</h1>
                <ToastContainer theme='dark' />

                <label htmlFor="firstname" className=' text-slate-500 mb-2 block text-sm ' > Firstname </label>
                <input type="text" 
                placeholder='Will'
                className=' p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full '
                    { ...register("firstname", {required: {
                        value: true,
                        message: "Firstname is required"
                    }, minLength: 2, pattern: {
                        value: /^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\s]+$/,
                        message: "Please, don't use numbers or special characters"
                    }} ) }
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
                    }, minLength: 2, pattern: {
                        value: /^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\s]+$/,
                        message: "Please, don't use numbers or special characters"
                    }} ) }
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