import React, { useEffect } from 'react'
import { useAuthStore } from '../store/useAuthStore'

export const Logout = () => {

    const {logout} = useAuthStore();
    useEffect(()=>{
        logout();
    },[])
  return (
    <div>Logout</div>
  )
}
