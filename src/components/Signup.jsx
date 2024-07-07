"use client"
import React from 'react'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { setCookie } from 'cookies-next'
import { useRouter } from 'next/navigation'
import { toast, ToastContainer } from 'react-toastify'
import axios from 'axios'
import 'react-toastify/dist/ReactToastify.css';

function createRandomString(length) {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

function Signup() {
    const router = useRouter()
    const [email, setemail] = useState('');
    const [pwd, setpwd] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();// aborts the native behavior of form (HTML)
        setemail(e.target[0].value);
        setpwd(e.target[1].value);
    }

    useEffect(() => {
        const data =
        {
            Uname: email,
            Uid: createRandomString(12),
            pwd: pwd
        }
        if (email != '' && pwd != '') {
            axios.post('api/auth/signup', JSON.stringify(data))
                .then((res) => {
                    setCookie('accessToken', res.data)
                    router.replace('/')
                })
                .catch((exception) => {
                    toast.error("Invalid credentials...")
                })
        }
    }, [email, pwd])
    return (
        <>
            <div className="container my-9">
                <ToastContainer />
                <section className="vh-100">
                    <div className="container-fluid h-custom">
                        <div className="row d-flex justify-content-center align-items-center h-100">
                            <div className="col-md-9 col-lg-6 col-xl-5">
                                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                                    className="img-fluid" alt="Sample image" />
                            </div>
                            <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                                <form action="#" onSubmit={handleSubmit}>
                                    <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                                        <p className="lead fw-normal mb-0 me-3">Signup:</p>
                                      
                                    </div>

                                    

                                    {/* <!-- Email input --> */}
                                    <div className="form-floating form-outline mb-3">
                                        <input type="text" id="form3Example3" className="form-control form-control-lg"
                                            placeholder="Enter a valid email address" />
                                        <label className="form-label" htmlFor="form3Example3">Username</label>
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
                                        <input type="submit" value="Register" className="btn btn-primary btn-lg px-4" />

                                        <p className="small fw-bold mt-2 pt-1 mb-0">Already registerd?
                                            <Link href="/signin">Signin</Link>
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

export default Signup