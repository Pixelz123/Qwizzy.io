import { NextRequest, NextResponse } from 'next/server'
import { UserModel } from '../../models.js'
const jwt =require('jsonwebtoken')

export async function POST(req, res) {
  const data = await req.json()
  const user = await UserModel.findOne(
    {
      $and: [{ Uname: data.Uname }, { pwd: data.pwd }]
    })

  const res_data={"UID":user.Uid,"UNAME":user.Uname}
  const token= jwt.sign(res_data,"shhhhhhh")
  if (user)
    return new NextResponse(JSON.stringify(token), { status: 200 })
  else
    return new NextResponse(null, { status: 404 })
}