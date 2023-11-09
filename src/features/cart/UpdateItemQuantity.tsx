import React from 'react'
import Button from '../../UI/Button'
import {useDispatch } from 'react-redux'
import { DecreaseItemQuantity, IncreaseItemQuantity } from './cartSlice'


interface componentPropsType {
    id: number,
    currentCartQuantity?: number
}

export default function UpdateItemQuantity({id, currentCartQuantity}:componentPropsType) {
    const dispatch = useDispatch()

  return (
    <div className='flex gap-1 md:gap-3 items-center'>
        <Button type='round' onClick={()=> dispatch(DecreaseItemQuantity(id))}>-</Button>
        <span className="text-xs font-semibold">{currentCartQuantity}</span>
        <Button type='round' onClick={()=> dispatch(IncreaseItemQuantity(id))}>+</Button>
    </div>
  )
}