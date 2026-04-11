import { RiDeleteBin5Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { cartReducerActions } from "../redux/cartSlice";

const CartCard = ({ id, name, price, image, qty, handleRemove }) => {

  const dispatch = useDispatch();

  const handleIncrement = () => {
    dispatch(cartReducerActions.increaseQty());
    dispatch(cartReducerActions.itemRemoveToast())
  }

  return (
    <div className='w-full h-[150px] p-2 border-2 border-gray-100 rounded-md shadow-lg flex justify-between items-center gap-3 group'>

      {/* img & qty */}
      <div className='borderx border-red-400x w-[75%] h-full flex justify-between items-center gap-3'>
        <figure className='w-[60%] h-full overflow-hidden rounded-md object-cover'>
          <img
            src={image}
            alt=""
            className='w-full h-full rounded-md scale-110 group-hover:scale-100 cursor-pointer transition duration-300'
          />
        </figure>

        <div className='borderx w-[40%] h-full flex_col_center gap-5'>
          <div className='text-lg text-gray-600 font-semibold'>{name}</div>

          <div
            className='w-[80%] h-[40px] flex_center border-2 border-slate-300 rounded-md bg-white text-xlx font-semibold hover:border-green-300x transition duration-200'
          >
            <button
              className='w-[30%] h-full flex_center cursor-pointer hover:bg-slate-100 active:scale-90'
              onClick={() => dispatch(cartReducerActions.decreaseQty({ id: id }))}
            >
              -
            </button>

            <span className='w-[40%] h-full flex_center bg-slate-300'>{qty}</span>

            <button
              className='w-[30%] h-full flex_center cursor-pointer hover:bg-slate-100 active:scale-90'
              onClick={() => {
                dispatch(cartReducerActions.increaseQty({ id: id }))
              }}
            >
              +
            </button>
          </div>
        </div>
      </div>

      {/* price & del */}
      <div className='borderx w-[25%] flex_col_end gap-6'>
        <span className='text-base md:text-xl text-green-500 font-semibold'>Rs. {price} /-</span>

        <span>
          <RiDeleteBin5Line
            className='text-3xl text-red-400 cursor-pointer hover:scale-110 transition_200 active:scale-90'
            onClick={handleRemove}
          />
        </span>
      </div>
    </div>
  )
}

export default CartCard
