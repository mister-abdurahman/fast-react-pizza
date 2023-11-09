import { Link } from "react-router-dom";
import {useSelector} from "react-redux";
import { cartType, getTotalCartPrice, getTotalCartQuantity } from "./cartSlice";
import { storeType } from "../../store";
import { formatCurrency } from "../../utils/helpers";

function CartOverview() {
  
  const totalCartQuantity = useSelector(getTotalCartQuantity); //abstracted to slice
  const totalCartPrice = useSelector(getTotalCartPrice);

  if(!totalCartQuantity) return null;

  return (
    <div className="bg-stone-800 text-stone-200 px-7 py-5 uppercase flex items-center justify-between">
      <p className="text-stone-300 space-x-4">
        <span>{totalCartQuantity} pizzas</span>
        <span>{formatCurrency(totalCartPrice)}</span>
      </p>
      <Link to={"/cart"}>Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
