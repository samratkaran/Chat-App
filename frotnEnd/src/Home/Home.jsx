import React from 'react'
import { useAuth } from '../context/AuthContext'

const Home = () => {
    const {authUser} = useAuth()
  return (
    <div>
      welcome {authUser.user.fullname || "Guest"}
    </div>
  )
}

export default Home
