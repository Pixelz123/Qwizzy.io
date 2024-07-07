const { Server } = require('socket.io')
const http = require('http')
const { QuizModel } = require('./models')

const serverhandler = (req, res) => {
    res.write("this is extrenal webserver for socket")
    res.end();
}
const server = http.createServer(serverhandler);
server.listen(8080);
const io = new Server(server, {
    cors: {
        origin: '*'
    }
})
connectedUsers=[]
io.on('connect', (socket) => {
    console.log('Connected menber:' + socket.id);
    
    socket.on("joinQ", async (data) => {
        quiz = await QuizModel.findOne({ Quizid: data })
        console.log("socket id on join "+socket.id)
        socket.join(data)
        if (quiz!=null) {
            io.to(data).emit("chk_join", {
                "joined quiz room ": data
            })
        }
        else {
            io.to(data).emit("bad_join", "invalid request")
        }
    })
    socket.on("addUser", async (data) => {
        data = JSON.parse(data)
        console.log('Received user...')
        console.log(data)
        console.log(data.socid)
        await QuizModel.updateOne({ Quizid: data.qid }, {
            $push: {
                Users:
                {
                    "Uname": data.name,
                    "Uid": data.uid,
                    "Points": 0
                }
            }
        })
    })
    sendLeaderBoard = async (id) => {
        const quiz = await QuizModel.findOne({ Quizid: id })
        io.to(id).emit("getLeaderboard", quiz.Users ? [quiz.Users,id] : [])
    }
    nextQuestion = async (id) => {
        const quiz = await QuizModel.findOneAndUpdate({ Quizid: id }, { $inc: { currentProblemNo: 1 } })
        const question = quiz.Questions[quiz.currentProblemNo]
        if (question) {
            question.qid = id
            io.to(id).emit("showQuestion", question)
            setTimeout(() => {
                io.to(id).emit("server-ticks")
                nextQuestion(id);
                sendLeaderBoard(id)
            }
                , 12 * 1000)
        }
        else
            io.to(id).emit("end_quiz", "QUIZ HAS ENDED!! get lost ...")
    }
    socket.on('startQuiz', async (id) => {
        await QuizModel.findOneAndUpdate({ Quizid: id }, { State: "Started", currentProblemNo: 0 })
        nextQuestion(id)
    })
    socket.on('submit', async (data) => {
        console.log('submission received!!!')
        data = await JSON.parse(data)
        await QuizModel.findOneAndUpdate({
            $and:
                [
                    { "Quizid": data.qid },
                    { "Questions": { $elemMatch: { "Pid": data.pid, "Correct_answer": data.sub } } },
                    { "Users.Uid": data.uid }
                ]
        },
            { $inc: { "Users.$.Points": 5 } }
        )

    })

})