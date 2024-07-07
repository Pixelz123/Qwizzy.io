import { NextRequest, NextResponse } from 'next/server'
import {UserModel} from '../../models.js'
const jwt =require('jsonwebtoken')

export async function POST(req, res) {
  const data = await req.json()


  const user = new UserModel(data)
  user.save()

  const res_data={"UID":data.Uid,"UNAME":data.Uname}
  const token=jwt.sign(res_data,"shhhhhhh")
  return new NextResponse(JSON.stringify(token),{status:200})
}