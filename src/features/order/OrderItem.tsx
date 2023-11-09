import { formatCurrency } from "../../utils/helpers";

export interface itemProps {
  quantity: number;
  name: string;
  totalPrice: number;
  pizzaId: number
}

interface OrderItemProps {
  item: itemProps;
  isLoadingIngredients?: boolean;
  ingredients?: any;
}

function OrderItem({
  item,
  isLoadingIngredients,
  ingredients,
}: OrderItemProps) {
  const { quantity, name, totalPrice, pizzaId } = item;

  return (
    <li className="py-3">
      <div className="flex justify-between items-center gap-4">
        <p className="text-sm">
          <span>{quantity}&times;</span> {name}
        </p>
        <p className="text-sm font-bold">{formatCurrency(totalPrice)}</p>
      </div>
    </li>
  );
}

export default OrderItem;
