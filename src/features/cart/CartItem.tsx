import Button from "../../UI/Button";
import { storeType } from "../../store";
import { formatCurrency } from "../../utils/helpers";
import DeleteItem from "./DeleteItem";
import UpdateItemQuantity from "./UpdateItemQuantity";
import { cartType, getCurrentCartQuantity } from "./cartSlice";
import {useSelector} from "react-redux";

function CartItem({item}: any) {
  const { pizzaId, name, quantity, totalPrice } = item;
 
  const currentCartQuantity = useSelector(getCurrentCartQuantity(pizzaId))

  return (
    <li className="py-4 sm:flex sm:justify-between sm:items-center">
      <p className="mb-1 sm:mb-0">
        {quantity}&times; {name}
      </p>
      <div className="flex items-center justify-between sm:gap-6">
        <p className="font-bold text-sm">{formatCurrency(totalPrice)}</p>
        <UpdateItemQuantity id={pizzaId} currentCartQuantity={currentCartQuantity}/>
        <DeleteItem pizzaId={pizzaId}/> {/*we abstracted the delete btn cos we need it in multiple places*/}
      </div>
    </li>
  );
}

export default CartItem;
