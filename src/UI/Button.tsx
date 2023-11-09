import React, { FormEvent } from 'react'
import { Link } from 'react-router-dom'

interface btnProps {
  children: any,
  disabled?: boolean,
  destination?: string,
  type: keyof stylesType,
  onClick?: (e?:FormEvent)=>void
}
interface stylesType {
  primary: string,
  small: string,
  secondary: string,
  round: string
}

export default function Button({children, disabled, destination, type, onClick}:btnProps) {
    const base = 'bg-yellow-400 rounded-full hover:bg-yellow-300 transition-colors duration-500 uppercase focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 font-semibold disabled:cursor-not-allowed'

    const styles:stylesType = {
      primary: base + ' px-4 py-2 md:px-6 md:py-3 text-sm',
      small: base + ' py-2 px-2 md:px-4 md:py-2 text-xs',
      secondary: 'bg-transparent rounded-full hover:bg-stone-300 text-stone-500 hover:text-stone-800 transition-colors duration-500 uppercase focus:outline-none focus:ring focus:ring-stone-200 focus:ring-offset-2 font-semibold disabled:cursor-not-allowed px-4 py-2 md:px-6 md:py-2.5 border-4',
      round: base + ' px-2.5 py-1 md:px-3 md:py-1.5 text-sm'
    }

    if(destination) return <Link to={destination} className={styles[type]}>{children}</Link>

  return (
    <button disabled={disabled} className={styles[type]} onClick={onClick}>
        {children}
    </button>
  )
}
