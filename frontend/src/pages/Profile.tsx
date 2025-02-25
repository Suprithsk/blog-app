import ActualHeader from "../components/ActualHeader"
import PersonalBlogs from "../components/PersonalBlogs"
import ProfileCard from "../components/ProfileCard"
import { UserResponse } from "../types/types"
import { useEffect, useState } from "react"
import { getUser } from "../apis/authService"
const Profile = () => {
  const [user, setUser]=useState<UserResponse | null>(null)
  const fetchUser=async () => {
    try {
      const response=await getUser()
      console.log(response)
      setUser(response)
    } catch (error) {
      console.error(error)
    }
  }
  useEffect(() => {
    fetchUser()
  }, [])
  useEffect(() => {
    console.log(user)
  }
  , [user])
  return (
    <div className="bg-amber-50">
      <ActualHeader />
      <div className="w-[90%] md:w-[60%] mx-auto">
        <ProfileCard user={user}/>
        <PersonalBlogs />
      </div>  
    </div>
  )
}

export default Profile