import { MdFastfood } from "react-icons/md";
import { IoSearchSharp } from "react-icons/io5";
import { FiShoppingBag } from "react-icons/fi";
import { useContext, useEffect } from "react";
import { dataContext } from "../context/UserContext";
import { food_items } from "../constants/foodItems";
import { useSelector } from "react-redux";
import { selectCartItems } from "../redux/cartSlice";
  
const Navbar = () => {

    let { input, setInput, cate, setCate, showCart, setShowCart } = useContext(dataContext);

    useEffect(() => {
        let newList = food_items.filter(item => item.food_name.toLowerCase().includes(input))

        setCate(newList)
    }, [input])

    const items = useSelector(selectCartItems);

    return (
        <div className='w-full h-25 flex justify-between items-center px-4 md:px-8 '>

            <a href="/">
                <div className="w-15 h-15 bg-white flex justify-center items-center rounded-md shadow-xl cursor-pointer active:scale-95 border border-transparent hover:border-green-300 transition-all duration-300">
                    <MdFastfood
                        className='w-7.5 h-7.5 text-green-500'
                    />
                </div>
            </a>

            <form
                action=""
                className='w-[50%] md:w-[70%] h-15 bg-white flex items-center px-5 gap-5 rounded-md shadow-md border border-transparent hover:border-green-300 transition-all duration-300'
                onSubmit={(e) => e.preventDefault()}
            >
                <IoSearchSharp
                    className='text-green-500 w-5 h-5'
                />

                <input
                    type="text"
                    name=""
                    id=""
                    placeholder='Search Items...'
                    className="borderx w-full outline-none text-[16px] md:text-[20px]"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
            </form>

            <div className="w-15 h-15 bg-white flex justify-center items-center rounded-md shadow-xl relative cursor-pointer active:scale-70 border border-transparent hover:border-green-300 transition-all duration-300">
                <span className="absolute top-0 right-2 text-green-500 font-bold text-[18px]">
                    {items.length}
                </span>
                <FiShoppingBag
                    className='w-7.5 h-7.5 text-green-500'
                    onClick={() => setShowCart(true)}
                />
            </div>
        </div>
    )
}

export default Navbar
