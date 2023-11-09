import LinkButton from './LinkButton';

function EmptyCart() {
  return (
    <div className='px-6 py-4'>
      <LinkButton destination="/menu">&larr; Back to menu</LinkButton>

      <p className='font-semibold mt-6'>Your cart is still empty. Start adding some pizzas :)</p>
    </div>
  );
}

export default EmptyCart;
