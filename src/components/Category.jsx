import { TiThSmall } from "react-icons/ti";
import { MdOutlineFoodBank, MdOutlineFreeBreakfast } from "react-icons/md";
import { LuSoup } from 'react-icons/lu';
import { GiFullPizza, GiHamburger, GiNoodles } from 'react-icons/gi';


const Categories = [
    {
        id: 1,
        name: 'All',
        icon: TiThSmall,
    },
    {
        id: 2,
        name: 'breakfast',
        icon: MdOutlineFreeBreakfast,
    },
    {
        id: 3,
        name: 'soup',
        icon: LuSoup,
    },
    {
        id: 4,
        name: 'pasta',
        icon: GiNoodles,
    },
    {
        id: 5,
        name: 'course',
        icon: MdOutlineFoodBank,
    },
    {
        id: 6,
        name: 'pizza',
        icon: GiFullPizza,
    },
    {
        id: 7,
        name: 'burger',
        icon: GiHamburger,
    },
]
 
const Category = ({ filter }) => {

    return (
        <div className="w-full flex justify-center md:justify-center items-center gap-3 md:gap-5 flex-wrap px-4 md:px-0">
            {
                Categories.map((category, idx) => {
                    const Icon = category.icon;

                    return (
                        <div
                            key={idx}
                            className="w-[70px] md:w-24 h-[70px] md:h-24 bg-white rounded-md flex flex-col items-center justify-center gap-2 md:gap-3.5 p-2 md:p-3.5 shadow-xl cursor-pointer active:scale-95 border border-transparent hover:border-green-300 transition-all duration-300 hover:bg-green-100 group"
                            onClick={() => filter(category.name)}
                        >
                            <div className="text-green-500 text-[22px] md:text-[32px]">
                                {/* <Icon md:size={32} /> */}
                                <Icon />
                            </div>

                            <span className="text-sm md:text-[16px] text-gray-600">
                                {category.name}
                            </span>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Category
