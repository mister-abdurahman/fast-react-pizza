import { useNavigate } from "react-router-dom";
import Button from "../../UI/Button";
import { formatCurrency } from "../../utils/helpers";
import { addItem, getCart, getCurrentCartQuantity } from "../cart/cartSlice";
import {useDispatch, useSelector} from "react-redux"
import DeleteItem from "../cart/DeleteItem";
import UpdateItemQuantity from "../cart/UpdateItemQuantity";

function MenuItem({ pizza }: any) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  const dispatch = useDispatch();

  const cart = useSelector(getCart);

  const itemIsInCart = cart.find(item=> item.pizzaId === id);
  const currentCartQuantity = useSelector(getCurrentCartQuantity(id))

  function handleAddToCart(){
    const newItem = {
      pizzaId: id,
      name,
      quantity: 1,
      unitPrice,
      totalPrice: unitPrice * 1,
    }
    dispatch(addItem(newItem))
  }

  return (
    <li className={`${soldOut && 'opacity-70 grayscale'} flex gap-3 py-2`}>
      <img src={imageUrl} alt={name} className="h-24"/>
      <div className="flex flex-col grow">
        <p className="font-medium">{name}</p>
        <p className="capitalize text-sm">{ingredients.join(", ")}</p>
        <div className="mt-auto flex items-center justify-between">
          {!soldOut ? <p className="text-sm">{formatCurrency(unitPrice)}</p> : <p className="text-sm uppercase text-stone-500 font-medium">Sold out</p>}
       {itemIsInCart && <div className="ml-auto flex gap-3 sm:gap-8">
       <UpdateItemQuantity id={id} currentCartQuantity={currentCartQuantity}/>
        <DeleteItem pizzaId={id}/>
        </div>}
       {!soldOut && !itemIsInCart && <Button type='small' onClick={handleAddToCart}>Add to cart</Button>}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
