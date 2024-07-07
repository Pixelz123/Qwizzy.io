// 'use server'
const mongoose=require('mongoose')
// mongoose.connect('mongodb://127.0.0.1:27017/warehouse', { useNewUrlParser: true, UseUnifiedTopology: true });
mongoose.connect('mongodb+srv://souptik0537:AKYIMXr55UtGZvuP@cluster0.paqcckc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/warehouse')
// all models..
const UserSchema=new mongoose.Schema({
    Uname:String,
    Uid:String,
    pwd:String
});

const QuizSchema=new mongoose.Schema({
    Quizid:String,
    currentProblemNo:Number,
    Questions:Array,
    Users:Array,
    State:String
});

const UserModel=mongoose.models.User || mongoose.model("User", UserSchema)
const QuizModel=mongoose.models.Quiz || mongoose.model("Quiz", QuizSchema)

module.exports={
    UserModel:UserModel,
    QuizModel:QuizModel
}