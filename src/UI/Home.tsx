import CreateUser from "../features/user/CreateUser";
import { storeType } from "../store";
import { useSelector } from "react-redux/es/hooks/useSelector";
import Button from "./Button";

function Home() {

  const username = useSelector((state:storeType)=> state.user.username)

  return (
    <div className="text-center my-9 px-6 py-2">
      <h1 className="text-center text-xl md:text-3xl font-semibold text-stone-700">
        The best pizza.
        <br />
        <span className="text-yellow-500">
        Straight out of the oven, straight to you.
        </span>
      </h1>

      {!username ? <CreateUser /> : <div className="mt-8"><Button type="primary" destination="/menu"> Continue Ordering, {username}</Button></div>}
    </div>
  );
}

export default Home;
