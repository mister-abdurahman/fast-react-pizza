import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function LinkButton ({children, destination}:any) {
    const navigate = useNavigate();

    const linkStyle = "text-sm text-blue-500 hover:text-blue-600 hover:underline transition-all duration-300"
   
    if(destination === '-1') return <button className={linkStyle} onClick={() => navigate(-1)}>{children}</button>
  
    return (
    <Link to={destination} className={linkStyle}>{children}</Link>
  )
}
