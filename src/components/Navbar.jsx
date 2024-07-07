'use client'
import 'mdb-react-ui-kit/dist/css/mdb.min.css'
import "@fortawesome/fontawesome-free/css/all.min.css";
import { getCookie, hasCookie, deleteCookie } from 'cookies-next';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';

export default function Navbar() {

  const [isLogged, setLogin] = useState(false)
  const [username, setuname] = useState('')
  const [uid, setuid] = useState('')

  const logout = () => {
    deleteCookie('accessToken')
    window.location.replace('/')
  }

  useEffect(() => {
    if (hasCookie('accessToken')) {
      setLogin(true)
      const accessData = {
        "accessToken": getCookie('accessToken')
      }
      axios.post('/api/auth/middlwware', accessData)
        .then((user) => {
          setLogin(true)
          setuname(user.data.UNAME)
          setuid(user.data.UID)
        })
        .catch((exception)=>{
           alert("bad token")
        })
    }
  }, [])

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-body-tertiary bg-black">
        <div className="container-fluid" 
            style={{color:'white'}}>
              <Link href='/'><h3 style={{color:'white'}}> Qwizzy.io</h3></Link>
         

          
          {isLogged ?
            <div className='d-flex '>
             <p> Hi, {username}!!  |</p>
              <button className='btn btn-primary  mx-[4px] ' id="logout" onClick={logout}>Logout</button>
            </div>
            :
            <div className="d-flex align-items-center">
              <button className='btn btn-primary  mx-[4px] ' >
              <Link href="/signin" style={{color:'black'}}> Login</Link>
              </button>
              <button className='btn btn-primary mx-[4px]' >
              <Link href="/signup" style={{color:'black'}}> Register</Link>
              </button>
            </div>
          }
        </div>
      </nav>
    </>
  )
}
