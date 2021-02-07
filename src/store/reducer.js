import * as actionTypes from "./actions";

const initialState = {
  ingredients: { meat: 0, cheese: 0, salad: 0, bacon: 0 },
  totalPrice: 8,
};

const INGREDIENT_PRICES = { salad: 1, bacon: 1.5, meat: 2, cheese: 1.5 };

const reducer = (state = initialState, action) => {
  const newIngList = { ...state.ingredients };
  let newTotalPrice = state.totalPrice;
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      console.log("Adding ingredient...");
      newIngList[action.ingredient] += 1;
      newTotalPrice = state.totalPrice + INGREDIENT_PRICES[action.ingredient];
      return { ingredients: newIngList, totalPrice: newTotalPrice };
    case actionTypes.REMOVE_INGREDIENT:
      console.log("Removing ingredient...");
      newIngList[action.ingredient] -= 1;
      newTotalPrice = state.totalPrice - INGREDIENT_PRICES[action.ingredient];
      return { ingredients: newIngList, totalPrice: newTotalPrice };
    default:
      return state;
  }
};

export default reducer;
