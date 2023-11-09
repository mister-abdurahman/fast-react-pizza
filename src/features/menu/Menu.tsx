import { useFetcher, useLoaderData } from "react-router-dom";
import { getMenu } from "../../services/apiRestaurant";
import MenuItem from "./MenuItem";
import { useEffect } from "react";

interface PizzaType {
  id: number;
  imageUrl: string;
  ingredients: string[];
  name: string;
  soldOut: boolean;
  unitPrice: number;
}

function Menu() {
  const menu = useLoaderData() as any; // react router hook to get the ready result of whatever our loader fn returns
  
  const fetcher = useFetcher();

  useEffect(function(){
    if(!fetcher.data && fetcher.state === 'idle') fetcher.load('/menu')
  }, [fetcher])

  return (
    <ul className="divide-y-4">
      {menu.map((pizza: PizzaType) => (
        // <h1>{pizza.name}</h1>
        <MenuItem pizza={pizza} key={pizza.id}/>
      ))}
    </ul>
  );
}

export async function loader(): Promise<() => PizzaType[]> {
  const menu = await getMenu();
  return menu;
}

export default Menu;
