import React from 'react'
import Button from '../../UI/Button'
import { deleteItem } from './cartSlice'
import { useDispatch } from "react-redux";

export default function DeleteItem({pizzaId}: {pizzaId: number}) {
    const dispatch = useDispatch()
  return (
    <Button onClick={()=> dispatch(deleteItem(pizzaId))} type="small">Delete</Button>
  )
}
