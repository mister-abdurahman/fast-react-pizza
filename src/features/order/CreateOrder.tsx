import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../UI/Button";
import store, { storeType } from "../../store";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { clearCart, getCart, getTotalCartPrice } from "../cart/cartSlice";
import EmptyCart from "../cart/EmptyCart";
import { formatCurrency } from "../../utils/helpers";
import { FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchAddress } from "../user/userSlice";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str: string) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );

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

function CreateOrder() {
  const [withPriority, setWithPriority] = useState<any>(false);

  // const cart = fakeCart;
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const isSubmitting = navigation.state === "submitting";

  const formErrors: any = useActionData();

  const {username, address, status: addressStatus, position, error:addressError} = useSelector((state:storeType)=> state.user);
  const cart = useSelector(getCart);
  const TotalCartPrice = useSelector(getTotalCartPrice);
  const priorityPrice = withPriority ? TotalCartPrice * 0.2 : 0
  const TotalPrice = TotalCartPrice + priorityPrice;
  const isLoadingAddress = addressStatus === 'loading';

  function handleLocation(e:FormEvent){
    e.preventDefault()
    dispatch(fetchAddress())
  }

  if(!cart.length) return <EmptyCart />

  return (
    <div className="px-4 py-8">
      <h2 className="mb-8 text-xl font-semibold">Ready to order? Let's go!</h2>
      {/* <Form method="POST" action="/order/new"> we dont need to set action co sreact router uses the nearest route*/}
      <Form method="POST">
        <div className="mb-5 flex gap-2 flex-col sm:flex-row">
          <label className="basis-auto sm:basis-36">First Name</label>
          <div className="grow">
          <input type="text" name="customer" defaultValue={username}
          className="input" 
          required />
          </div>
        </div>

        <div className="mb-5 flex gap-2 flex-col sm:flex-row">
          <label className="basis-auto sm:basis-36">Phone number</label>
          <div className="grow">
            <input type="tel" className="input" name="phone" required />
          {formErrors?.phone && <p className="text-xs text-red-500 mt-2 ml-2">{formErrors?.phone}</p>}
          </div>
        </div>

        <div className="mb-5 flex gap-2 flex-col sm:flex-row relative">
          <label className="basis-auto sm:basis-36">Address</label>
          <div className="grow">
            <input type="text" className="input" name="address" defaultValue={address} disabled={isLoadingAddress} required />
            {addressStatus === "error" && <p className="text-xs text-red-500 mt-2 ml-2">{addressError}</p>}
          </div>
         {!position?.latitude && !position?.longitude && <span className="absolute right-1 z-10">
          <Button disabled={isLoadingAddress} type="small" onClick={(e)=> handleLocation(e!)}>Get location</Button>
          </span>}
        </div>

        <div className="mb-14 flex items-center gap-3">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2"
            value={withPriority}
            checked={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label className="font-medium" htmlFor="priority">Want to give your order priority?</label>
        </div>
        
        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <input type="hidden" name="position" value={position.latitude && position.longitude ? `${position.latitude}, ${position.longitude}` : ''} />
          <Button type='primary' disabled={isSubmitting}>
            {isSubmitting ? "Placing Order..." : `Order now for ${formatCurrency(TotalPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }: any) {
  const formData = await request.formData(); //formData is  just a regular browser api.
  const data = Object.fromEntries(formData);

  const order: any = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "true",
  };

  console.log(order);

  // error handling:
  const errors: any = {};
  if (!isValidPhone(order.phone))
    errors.phone = "Please enter a correct phone number";

  if (Object.keys(errors).length > 0) return errors;

  // if no errors, craete order and redirect to new order
  const newOrder = await createOrder(order);
  
  // dont overuse !!!
  store.dispatch(clearCart()); 

  return redirect(`/order/${newOrder.id}`); //cos we cannot use useNavigate or anyother hook in a function
  // return null
}

export default CreateOrder;
