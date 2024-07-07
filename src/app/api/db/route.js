import { NextRequest, NextResponse } from 'next/server'
import { QuizModel } from '../models.js'

export async function POST(req, res) {
  const data = await req.json()
  const existing_quiz = await QuizModel.findOne({ Quizid: data.Quizid })
  if (existing_quiz) {
    existing_quiz.overwrite(data)
    existing_quiz.save()
  }
  else {
    const quiz = new QuizModel(data)
    quiz.save()
  }
  return new NextResponse("Quiz has been saved!!", { status: 200 })
}
