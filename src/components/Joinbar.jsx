"use client"
import React, { useState, useEffect, useMemo } from 'react'
import { socket } from '@/io_client'
import { getCookie, hasCookie } from 'cookies-next'
import { useRouter } from 'next/navigation'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
function Joinbar() {

    const router = useRouter()
    const [user, getUser] = useState(null)
    const [qid, setqid] = useState('')
    useEffect(() => {

        if (hasCookie('accessToken')) {
            const accessData = {
                "accessToken": getCookie('accessToken')
            }
            axios.post('/api/auth/middlwware', accessData)
                .then((user) => {
                    getUser({
                        Uname: user.data.UNAME,
                        Uid: user.data.UID
                    })
                })
        }
        else {
            getUser(null)
        }
    }, [])
    const handleSubmit = (event) => {
        if (user == null) {

            toast("Login to join quizzes")

        }
        event.preventDefault()
        setqid(event.target[0].value)
    }
    useEffect(() => {
        var user_data = null
        if (user == null) {


        }
        else {
            socket.emit('joinQ', qid)
            socket.on('chk_join', (data) => {
                console.log(data)
                user_data = {
                    qid: qid,
                    name: user.Uname,
                    uid: user.Uid,
                    socid: socket.id

                }
                console.log("user_data" + user_data)
                const usr = JSON.stringify(user_data)
                socket.emit('addUser', usr)
                socket.off('chk_join')
                router.push('/quiz')
            })
            socket.on('bad_join', (data) => {
                toast.error("No such quiz exist !!")
                socket.off('chk_join')
            })
        }
    }, [qid])


    return (
        <>
            <div className="flex my-10 justify-center"  >
                <form id="joining" onSubmit={handleSubmit} >
                    <div className="input-group w-100 justify-center ">

                        <ToastContainer />
                        <input
                            id="Qid"
                            type="text"
                            className="form-control"
                            placeholder="Enter Quiz Code"
                            aria-label="Enter Quiz Code"
                            aria-describedby="button-addon2"
                        />

                        <button className="btn btn-secondary"
                        style={{backgroundColor:'rgb( 243, 192, 33 )',color:'black'}}
                            type="submit"
                            id="submit" data-mdb-ripple-init data-mdb-ripple-color="dark"
                        >
                            Join
                        </button>

                    </div>
                </form>

            </div>
        </>
    )
}

export default Joinbar