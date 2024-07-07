'use client'
import React, { useEffect, useState } from 'react'
import { socket } from '@/io_client'

const Leaderboard = () => {
    const [leaderboard, setdata] = useState([])
    useEffect(() => {
        socket.on('getLeaderboard', (data) => {
            data[0].sort((a, b) => {
                return a.Points < b.Points
            })
            setdata(data[0])
            console.log(data[0])
        })
    }, [])

    return (
        <div className="container">
            <center><h2>Leaderboard</h2></center>
            <center><h3>Quiz code {sessionStorage.getItem('quizid')}</h3></center>
            {
              leaderboard.length!=0 ?
                <div className="row">
                    {leaderboard.map((item) => (
                        <div className="card mb-3" key={item.Uname}>
                            <div className="card-body">
                                <h5 className="card-title">{item.Uname}</h5>
                                <p className="card-text">Points: {item.Points}</p>
                            </div>
                        </div>))
                    }
                </div>
                    :
                    <center><h2>Waiting for players responses...</h2></center>
               }

    </div>
    );
};

export default Leaderboard;