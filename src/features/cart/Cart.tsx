import LinkButton from "./LinkButton";
import Button from "../../UI/Button";
import CartItem from "./CartItem";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { getUserName } from "../user/userSlice";
import { clearCart, getCart } from "./cartSlice";
import {useDispatch} from "react-redux"
import EmptyCart from "./EmptyCart";

// const fakeCart = [
//   {
//     pizzaId: 12,
//     name: "Mediterranean",
//     quantity: 2,
//     unitPrice: 16,
//     totalPrice: 32,
//   },
//   {
//     pizzaId: 6,
//     name: "Vegetale",
//     quantity: 1,
//     unitPrice: 13,
//     totalPrice: 13,
//   },
//   {
//     pizzaId: 11,
//     name: "Spinach and Mushroom",
//     quantity: 1,
//     unitPrice: 15,
//     totalPrice: 15,
//   },
// ];

function Cart() {
  // const cart = fakeCart;
  const dispatch = useDispatch();
  const username = useSelector(getUserName)
  const cart = useSelector(getCart)

  function handleClearCart(){
    dispatch(clearCart())
  }

  if(cart.length < 1) return <EmptyCart />

  return (
    <div className="px-4 py-3">
        <LinkButton destination={"/menu"}>
        &larr; Back to menu
        </LinkButton>

      <h2 className="font-semibold text-xl mt-8">Your cart, {username}</h2>

      <ul className="divide-y-2 divide-stone-200 border-b">
        {cart.map(item => <CartItem key={item.pizzaId} item={item} />)}
      </ul>

      <div className="mt-6 space-x-2">
        <Button type="primary" destination={"/order/new"}>
        Order pizzas
        </Button>
        <Button type="secondary" onClick={handleClearCart}>Clear cart</Button>
      </div>
    </div>
  );
}

export default Cart;
