import { createSelector, createSlice } from "@reduxjs/toolkit";
import { toast, Zoom } from "react-toastify";

const initialState = {
    // items: [],
    items: JSON.parse(localStorage.getItem('cart')) || []
}

export const cartReducerSlice = createSlice({
    name: 'cartSlice',
    initialState,
    reducers: {
        addItem: (state, action) => {
            const existingItem = state.items.find(
                item => item.id === action.payload.id
            )

            {
                existingItem
                    ?
                    existingItem.qty += 1
                    :
                    state.items.push({ ...action.payload, qty: 1 });
            }
        },
        increaseQty: (state, action) => {
            const item = state.items.find(item => item.id === action.payload.id);

            if (item) item.qty += 1
        },
        decreaseQty: (state, action) => {
            const item = state.items.find(item => item.id === action.payload.id)

            if (item && item.qty > 1) item.qty -= 1

            if (item.qty < 0) {
                state.items = state.items.filter(item => item.id !== action.payload.id)
            }
        },
        removeItem: (state, action) => {
            state.items = state.items.filter(
                item => item.id !== action.payload
            )
        },
        clearCart: (state, action) => {
            state.items = [];
        },
        itemAddedToast: () => {
            toast.success('item added ✅', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Zoom,
            });
        },
        itemRemoveToast: () => {
            toast.warn('item removed ❗', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Zoom,
            });
        }
    }
})

export const cartReducerActions = cartReducerSlice.actions;

// base selector
const selectCartState = (state) => {
    // console.log("Redux State:", state);
    // console.log("Redux State:", state.cart);
    return state.cart;
}



// memoized selector
export const selectCartItems = createSelector(
    [selectCartState],
    // (cart) => cart.items
    (item) => item.items
)

// memoized 
// export const selectSubTotalPrice = createSelector(
//     [selectCartItems],
// (items) => items.reducer(
//     (items) => items.reduce(
//         (total, item) => total + item.price * item.qty, 0
//     )
// );

// export const selectCartBilling = createSelector(
//     [selectSubTotalPrice],
//     (subTotal) => {
//         const deliveryFee = subTotal > 0 ? 200 : 0;
//         const taxes = subTotal * 0.5 / 100;
//         const total = subTotal + deliveryFee + taxes;

//         return {
//             subTotal,
//             deliveryFee,
//             taxes,
//             total
//         };
//     }
// );

export const selectCartBilling = createSelector(
    [selectCartItems],
    (items) => {
        const subTotal = items.reduce(
            (total, item) => total + item.price * item.qty, 0
        )
        const deliveryFee = subTotal > 0 ? 200 : 0;
        const taxes = subTotal * 0.5 / 100;
        const total = Math.floor(subTotal + deliveryFee + taxes);

        return {
            subTotal,
            deliveryFee,
            taxes,
            total
        };
    }
);

export default cartReducerSlice.reducer