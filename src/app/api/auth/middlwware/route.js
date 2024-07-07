const jwt=require('jsonwebtoken')
import { NextResponse } from 'next/server'

export async function POST(req,res)
{
    const data=await req.json()
    const user_data=jwt.verify(data.accessToken,"shhhhhhh")
    return new NextResponse(JSON.stringify(user_data),{status:200})
}