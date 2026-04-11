import { useContext } from 'react'
import { RxCross1 } from 'react-icons/rx'
import { dataContext } from '../context/UserContext'
import CartCard from './CartCard'
import { useDispatch, useSelector } from 'react-redux'
import { cartReducerActions, selectCartBilling, selectCartItems } from '../redux/cartSlice'
import { toast, Zoom } from 'react-toastify'
 
const SideCart = () => {

    const { showCart, setShowCart } = useContext(dataContext)

    const addedItems = useSelector(selectCartItems);

    const dispatch = useDispatch();

    const handleRemoveClick = (id) => {
        dispatch(cartReducerActions.removeItem(id))
        dispatch(cartReducerActions.itemRemoveToast())
    }

    const { subTotal, deliveryFee, taxes, total } = useSelector(selectCartBilling);

    return (
        <section className={`w-full md:w-[40vw] h-screen fixed top-0 right-0 bg-white shadow-xl p-3 md:p-6 ${showCart ? 'translate-x-0' : 'translate-x-full'} transition duration-700 overflow-y-scroll`}>

            <header className="w-full flex justify-between items-center">
                <span className='text-green-400 text-lg font-semibold'>Order Items</span>

                <span>
                    <RxCross1
                        className='text-green-400 text-2xl cursor-pointer hover:text-gray-600 transition duration-300 hover:rotate-180 hover:scale-125 active:scale-90'
                        onClick={() => setShowCart(false)}
                    />
                </span>
            </header>

            {addedItems.length > 0 ?
                <>
                    <main className='flex flex-col gap-5 mt-7'>
                        {addedItems.map((item, idx) => {
                            return (
                                <CartCard
                                    key={item.id}
                                    id={item.id}
                                    name={item.name}
                                    price={item.price}
                                    image={item.image}
                                    qty={item.qty}
                                    handleRemove={() => handleRemoveClick(item.id)}
                                />
                            )
                        })}
                    </main>

                    <footer className='w-full mt-7 border-t-2 border-slate-400 flex flex-col gap-4 py-5'>

                        {/* subtotal */}
                        <div className='flex_between text-lg font-semibold'>
                            <span className='text-gray-600'>SubTotal</span>

                            <span className='text-green-400'>Rs. {subTotal}/-</span>
                        </div>

                        {/* taxes */}
                        <div className='flex_between text-lg font-semibold'>
                            <span className='text-gray-600'>Taxes</span>

                            <span className='text-green-400'>Rs. {taxes}/-</span>
                        </div>

                        {/* delivery fee */}
                        <div className='flex_between text-lg font-semibold'>
                            <span className='text-gray-600'>Delivery Fee</span>

                            <span className='text-green-400'>Rs. {deliveryFee}/-</span>
                        </div>

                        {/* total */}
                        <div className='flex_between text-2xl font-semibold border-t-2 border-slate-400 py-5'>
                            <span className='text-gray-600'>Total</span>

                            <span className='text-green-400'>Rs. {total}/-</span>
                        </div>

                        <button
                            className="w-full p-3 rounded-md bg-green-300 hover:bg-green-500 text-black hover:text-white font-medium capitalize cursor-pointer transition duration-300 active:scale-95"
                            onClick={() => toast.success('Order placed...!', {
                                position: "top-center",
                                autoClose: 3000,
                                hideProgressBar: false,
                                closeOnClick: false,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                                theme: "light",
                                transition: Zoom,
                            })}
                        >
                            Place Order
                        </button>
                    </footer>
                </>
                :
                <div
                    className='text-center text-5xl text-slate-200 font-semibold capitalize mt-24'
                >
                    Empty Cart
                </div>
            }

        </section >
    )
}

export default SideCart
