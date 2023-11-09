import React from 'react'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import { storeType } from '../../store'

export default function UserName() {
  const username = useSelector((state:storeType)=> state.user.username)

  if(!username) return null;
  
  return (
    <p className='font-bold text-xs hidden md:block'>{username}</p>
  )
}
