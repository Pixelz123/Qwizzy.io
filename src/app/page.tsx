'use client'
import React from 'react'
import Joinbar from '@/components/Joinbar'
import Navbar from '@/components/Navbar'
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Poppins } from 'next/font/google';
import Link from 'next/link'
const anton = Poppins({
  weight: '700',
  subsets: ['latin'], // Specify character subsets (optional)
  display: 'swap', // Font loading strategy (optional)
});

function page() {

  const img_path = 'bg.jp'
  return (
    <>
      <Navbar />
      {/* Get realtime feed back from your audience */}
      <div style={{ backgroundImage: `url(${img_path})`, backgroundSize: 'contain', height: '100vh', paddingTop: '30px', color: 'black' }}>
        <div className={anton.className} style={{ fontSize: '40pt' }}>
          <center>
            Get realtime feedback from your<br /> audience <span style={{ color: 'rgb(243, 114, 44)' }}>instantly</span>
          </center>
        </div>
        {/* <img src='bg.jpg'></img> */}
        <div className="container p-4" style={{ borderRadius: '5px', background: 'linear-gradient(70deg, rgb(255, 185, 208) 50%, rgb(255, 128, 171) 50%)' }}>
          <Joinbar />
          <div className="d-flex justify-content-center">
            <Link href="/create2">
              <button className="btn btn-primary mx-10 ">
                Create Quiz
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default page