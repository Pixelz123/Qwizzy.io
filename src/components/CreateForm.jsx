'use client'
import React, { useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css'; // Import Font Awesome icons
import axios from 'axios';
import { socket } from '@/io_client'
import Link from 'next/link';
import { useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

function createRandomString(length) {
    const chars = "0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}






const QuestionForm = () => {
    const [quizid, setid] = useState('000000')
    const [saved, setsave] = useState(false)
    const [questions, setQuestions] = useState([]);
    useEffect(() => {
        setid(createRandomString(7))
    }, [])
    
    const handleAddQuestion = () => {
        setsave(false)
        setQuestions([...questions, { question: '', options: ['', '', '', ''], answerIndex: null }]);
    };

    const handleQuestionChange = (event, index) => {
        setsave(false)
        const newQuestions = [...questions];
        newQuestions[index].question = event.target.value;
        setQuestions(newQuestions);
    };

    const handleOptionChange = (event, index, optionIndex) => {
        setsave(false)
        const newQuestions = [...questions];
        newQuestions[index].options[optionIndex] = event.target.value;
        setQuestions(newQuestions);
    };

    const handleSetAnswer = (index, optionindex) => {
        setsave(false)
        const newQuestions = [...questions];
        newQuestions[index].answerIndex = optionindex;
        setQuestions(newQuestions);
    };

    const handleRemoveQuestion = (index) => {
        setsave(false)
        const newQuestions = [...questions];
        newQuestions.splice(index, 1);
        setQuestions(newQuestions);
    };

    const present = () => {
        sessionStorage.setItem('quizid',quizid)
        socket.emit('joinQ', quizid)
        socket.emit('startQuiz', quizid)
    }
    const handleGetQuestionData = () => {
        const allQuestions = [];
        var cnt = 1;var ok=true
        questions.forEach((question) => {
            const questionData = {
                Title: question.question,
                Options: question.options,
                Correct_answer: question.answerIndex,
                Pid: "Q" + cnt
            };
            if (questionData.Correct_answer==null)
                {
                    toast('Please set Correct answer for all question')
                    ok=false
                    return 
                }
                cnt++
                allQuestions.push(questionData);
                console.log(allQuestions)
            });
            const jsonData = allQuestions;
            toast('Share quiz code '+quizid)
            const quizData = { Quizid: quizid, Questions: jsonData, Users: [], State: 'Started', currentProblemNo: 0 }
            axios.post('api/db/', (quizData))
            setsave(ok)
    };

    const renderQuestions = () => {
        return questions.map((question, index) => (
            <div key={index} className="mb-3">
                <h3 className="card-title">Question {index + 1}</h3>
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text">
                            <i className="fas fa-question"></i>
                        </span>
                    </div>
                    <input
                        type="text"
                        placeholder="Enter question"
                        value={question.question}
                        onChange={(event) => handleQuestionChange(event, index)}
                        className="form-control"
                    />
                </div>
                <ul className="list-group">
                    {question.options.map((option, optionIndex) => (
                        <li key={optionIndex} className="list-group-item d-flex justify-content-between align-items-center">
                            <input
                                type="text"
                                placeholder={`Option ${optionIndex + 1}`}
                                value={option}
                                onChange={(event) => handleOptionChange(event, index, optionIndex)}
                                className="form-control"
                            />
                            {question.answerIndex === optionIndex && (
                                <span className="badge bg-success rounded-pill">Correct Answer</span>
                            )}

                            <input
                                type="radio"
                                id={`option-${index}-${optionIndex}`}
                                name={`answer-${index}`} // Use the same name for all options in a question
                                value={optionIndex}
                                checked={question.answerIndex === optionIndex}
                                onChange={() => handleSetAnswer(index, optionIndex)}
                            />
                            <label htmlFor={`option-${index}-${optionIndex}`}>{`Option ${optionIndex + 1}`}</label>



                        </li>
                    ))}
                </ul>
                <button className="btn btn-sm btn-outline-danger" onClick={() => handleRemoveQuestion(index)}>
                    Remove Question
                </button>
            </div>
        ));
    };

    return (
        <div>
            <ToastContainer/>

            <center> <h2>Quiz Code::{saved?quizid:"save to get quiz code"}</h2></center>
            <div className="question-form-container">


                <div className=" d-flex justify-content-center fixed-bottom ">
                    <button className="btn btn-primary mx-10" onClick={handleAddQuestion}>Add Questions</button>
                    {saved == false ?
                        <button className="btn btn-primary mx-10" onClick={handleGetQuestionData} >Save</button> :
                        <button className="btn btn-success mx-10"  >Saved Share quiz code :{quizid}</button>
                    }
                    {
                        saved ?
                            <Link href='/ldrb' onClick={present} > <button className="btn btn-success mx-10 p-4">Present</button></Link>
                            :
                            <></>
                    }</div>




                {renderQuestions()}
                <style scoped>
                    {`
          .question-form-container {
            position: relative;
          }

          .fixed-bottom {
            position: fixed;
            bottom: 10px; /* Adjust spacing as needed */
            left: 50%;
            transform: translateX(-50%); /* Center the button horizontally */
            z-index: 10; /* Ensure button stays on top of content */
          }
        `}
                </style>
            </div>

        </div>
    );
};

export default QuestionForm;
