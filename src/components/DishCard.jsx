import { GiChickenOven } from "react-icons/gi";
import { LuLeafyGreen } from "react-icons/lu";
import { cartReducerActions, selectCartItems } from "../redux/cartSlice";
import { useDispatch, useSelector } from "react-redux";

const DishCard = ({ id, name, category, type, image, price }) => {
 
    const dispatch = useDispatch();
 
    const items = useSelector(selectCartItems);

    return (
        <div
            className='w-[275px] h-[395px] bg-white rounded-md overflow-hidden p-3 flex flex-col gap-3.5 shadow-lg border-2 border-gray-200 hover:border-green-300 transition duration-300 cursor-grab'
        >
            {/* img */}
            <div className='w-full h-[60%]'>
                <img
                    src={image}
                    alt="img"
                    className="w-full h-full object-cover rounded-md"
                />
            </div>

            {/* name */}
            <div className='text-2xl font-semibold capitalize'>
                {/* pancakes */}
                {name}
            </div>

            {/* price */}
            <div className='w-full flex justify-between items-center'>
                <div className='text-lg font-bold text-green-500'>
                    {/* Rs. 500/- */}
                    Rs {price}/-
                </div>

                <div className="flex justify-end items-center gap-2 text-green-500 text-lg font-semibold capitalize">
                    {type === 'veg' ? <LuLeafyGreen /> : <GiChickenOven />}

                    {/* <span>veg/non-veg</span> */}
                    <span className='text-black font-medium'>
                        {type}
                    </span>
                </div>
            </div>

            <button
                className="w-full p-3 rounded-md bg-green-300 hover:bg-green-500 text-black hover:text-white font-medium capitalize cursor-pointer transition duration-300 active:scale-95"
                onClick={() => {
                    dispatch(cartReducerActions.addItem({
                        id: id,
                        name: name,
                        price: price,
                        image: image,
                        qty: 1
                    }))
                    dispatch(cartReducerActions.itemAddedToast())
                }}
            >
                Add To Dish
            </button>
        </div >
    )
}

export default DishCard
