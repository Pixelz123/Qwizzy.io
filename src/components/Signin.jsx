"use client"
import React from 'react'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { setCookie } from 'cookies-next'
import { useRouter } from 'next/navigation'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

function Signin() {
    const router = useRouter()
    const [email, setemail] = useState('');
    const [pwd, setpwd] = useState('');


    const handleSubmit = (e) => {
        e.preventDefault();
        setemail(e.target[0].value);
        setpwd(e.target[1].value);
    }
    useEffect(() => {
        const data =
        {
            "Uname": email,
            "pwd": pwd
        }
        if (email != '' && pwd != '') {

            axios.post('api/auth/signin', JSON.stringify(data))

                .then((res) => {
                    if (res == null)
                        throw ("invalid user")
                    else {
                        console.log("received value"+res.data)
                        setCookie('accessToken',res.data)
                    }
                })
                .then(() => {
                    router.replace('/')
                })
                .catch((exception) => {
                    console.log(exception)
                    toast.error("No such user exists...")
                })

        }
    }, [email, pwd])
    return (
        <>
            <div className="container my-9">
                <ToastContainer/>
                <section className="vh-100">
                    <div className="container-fluid h-custom">
                        <div className="row d-flex justify-content-center align-items-center h-100">
                            <div className="col-md-9 col-lg-6 col-xl-5">
                                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                                    className="img-fluid" alt="Sample image" />
                            </div>
                            <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                                <form target="_blank" action="jms2" onSubmit={handleSubmit}>
                                    <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                                        <p className="lead fw-normal mb-0 me-3">Signin :</p>
                                      
                                    </div>

                                    

                                    {/* <!-- Email input --> */}
                                    <div className="form-floating form-outline mb-3">
                                        <input type="text" id="form3Example3" className="form-control form-control-lg-outline"
                                            placeholder="Enter a valid email address" />
                                        <label className="form-label" htmlFor="form3Example3">Email address</label>
                                    </div>

                                    {/* <!-- Password input --> */}
                                    <div className="form-floating form-outline mb-3">
                                        <input type="password" id="form3Example4" className="form-control form-control-lg"
                                            placeholder="Enter password" />
                                        <label className="form-label" htmlFor="form3Example4">Password</label>
                                    </div>

                                    <div className="d-flex justify-content-between align-items-center">
                                        {/* <!-- Checkbox --> */}
                                       
                                       
                                    </div>

                                    <div className="text-center text-lg-start mt-4 pt-2">
                                        <button type="submit" className="btn btn-primary btn-lg px-4">Register</button>

                                        <p className="small fw-bold mt-2 pt-1 mb-0">Dont have an account?
                                            <Link href="/signup">Signup</Link>
                                        </p>
                                    </div>

                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}

export default Signin