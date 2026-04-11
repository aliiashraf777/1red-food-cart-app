import { useContext, useState } from 'react'
import Category from '../components/Category'
import Navbar from '../components/Navbar'
import { food_items } from '../constants/foodItems' 
import { dataContext } from '../context/UserContext'
import SideCart from '../components/SideCart'
import DishCard from '../components/DishCard'

const Home = () => {

    // const [cate, setCate] = useState(food_items);

    const { cate, setCate, input } = useContext(dataContext);

    const filterCate = (category) => {
        if (category === 'All') {
            setCate(food_items);
        } else {
            let newList = food_items.filter(item => item.food_category.toLowerCase() === category.toLowerCase())
            setCate(newList);
        }
    }

    return (
        <div className='bg-slate-200 w-full min-h-screen'>

            <Navbar />

            {!input &&
                <Category filter={filterCate} />
            }

            {/* dishes cards */}
            <div className='w-full flex justify-center flex-wrap gap-10 px-5 py-6'>
                {/* {food_items.map((item, idx) => { */}
                {cate.length > 1 ?
                    <>
                        {cate.map((item, idx) => {
                            return (
                                <DishCard
                                    key={idx}
                                    id={item.id}
                                    name={item.food_name}
                                    category={item.food_category}
                                    type={item.food_type}
                                    image={item.food_image}
                                    price={item.price}
                                />
                            )
                        })}
                    </>
                    :
                    <div className='text-center text-5xl text-gray-400/70 font-semibold capitalize mt-24'>no items find</div>
                }
            </div>


            {/* side cart page */}
            <SideCart />
        </div>
    )
}

export default Home
