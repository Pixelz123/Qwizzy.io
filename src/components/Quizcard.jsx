import React, { useEffect, useState } from 'react'
import { socket } from '@/io_client'
import { Roboto } from 'next/font/google'
import { getCookie } from 'cookies-next'
import { useTimer } from 'use-timer'
import axios from 'axios'

const roboto = Roboto({
    path: './Roboto-Regular.woff2',
    subsets: ['latin'],
    weight: '900',
    style: 'normal',
})
function Quizcard() {
    const [uid, getUser] = useState('')
    const [score, setScore] = useState(0)
    const [question, setData] = useState({Options:["a","b","c","d"]})// test change 2
    const [selectedindex, setid] = useState('')
    const [status, setStatus] = useState('Not Live')
    const { time, start, reset } = useTimer({
        initialTime: 10,
        endTime: 0,
        timerType: 'DECREMENTAL',
        onTimeOver: () => {
            console.log("fire event")
            console.log(submission)
            setScore(score + (selectedindex == 'choice' + question.Correct_answer) * 5)
            const btn = document.getElementById('choice' + question.Correct_answer)
            btn.style.backgroundColor = 'rgb( 111, 230, 36 )'
            const submsn = JSON.stringify(submission)
            socket.emit("submit", submsn)
        }
    })

    const [submission, setSubmit] = useState(
        {
            "qid": question.qid,
            "uid": uid,
            "pid": question.Pid,
            "sub": '#'
        }
    )




    useEffect(() => {
        const accessData = {
            "accessToken": getCookie('accessToken')
        }
        axios.post('/api/auth/middlwware', accessData)
            .then((user) => {
                getUser(user.data.UID)
            })

        socket.on("showQuestion", (data) => {
            setid(0)

            setStatus('Live')
            reset();
            start();
            setData(data)
            setSubmit({
                "qid": question.qid,
                "uid": uid,
                "pid": question.Pid,
                "sub": '#'
            })
            const btn1 = document.getElementById('choice0')
            if (btn1) {
                btn1.style.backgroundColor = 'rgb(   40, 155, 178  )'
                btn1.style.color = 'black'
            }
            const btn2 = document.getElementById('choice1')
            if (btn2) {
                btn2.style.backgroundColor = 'rgb(   40, 155, 178  )'
                btn2.style.color = 'black'
            }
            const btn3 = document.getElementById('choice2')
            if (btn3) {
                btn3.style.backgroundColor = 'rgb(   40, 155, 178  )'
                btn3.style.color = 'black'
            }
            const btn4 = document.getElementById('choice3')
            if (btn4) {
                btn4.style.backgroundColor = 'rgb(   40, 155, 178  )'
                btn4.style.color = 'black'
            }
        })
        socket.on('end_quiz', (data) => {
            setStatus('Ended')
        })
    }, [])



    const choose = (choice, id) => {
        setid(id)
        setSubmit({
            "qid": question.qid,
            "uid": uid,
            "pid": question.Pid,
            "sub": choice
        })
    }

    return (
        <>
            <div className="container my-[30px] px-[200px]">

                {
                    status == 'Live' ?// test change 1

                        <>
                            <div className="{roboto.className}">
                                <div className='container'>
                                    <h3><center>
                                            Quiz Code :: {question.qid}  
                                        </center>
                                        <br/>
                                        Time left:00:{time}
                                        <div className='position-inherit my-[-27px] text-end'>Score:{score}</div>
                                    </h3>
                                </div>
                                <br /><br/>
                                <h1>{question.Title ? question.Pid + " " + question.Title : "Question Title "}</h1>
                            </div>
                            <div className="flex-sm-column align-items-center py-[50px] ">
                                {

                                    question.Options.map((data, index) => (
                                        <button type="radio" className="btn btn-primary  h-[50px] w-[100%] my-[7px]"
                                            id={"choice" + index}
                                            key={index}
                                            value="1"
                                            onClick={() => { choose(index, "choice" + index) }}
                                            style={{
                                                backgroundColor: selectedindex == 'choice' + index ? 'rgb(  242, 246, 101  )' : 'rgb(   40, 155, 178  )',
                                                color: 'black',
                                                borderRadius: '100px'
                                            }}>
                                            <h5>{data}</h5>
                                        </button>
                                    ))

                                }
                            </div>
                        </>
                        :
                        status == 'Ended' ?
                            <>
                                <center>
                                    <h1>
                                        QUIZ ENDED!!!<br/> You scored:{score} points...
                                        <img src='trophy.png'/>
                                    </h1>
                                </center>
                            </>
                            :
                            <>
                                <center>
                                    <h1>
                                        This Quiz is not live yet !!
                                    </h1>

                                </center>
                            </>
                }
            </div>
        </>
    )
}

export default Quizcard