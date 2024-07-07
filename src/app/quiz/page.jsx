'use client'
import React, { useState } from 'react'
import {socket} from '@/io_client'
import { useEffect } from 'react'
import Quizcard from '@/components/Quizcard'
import Navbar from '@/components/Navbar'


function page(props) {
    const [content,setData]=useState('')
   
  return (
    <>
    <Navbar/>
     <Quizcard ></Quizcard>
    </>
  )
}

export default page