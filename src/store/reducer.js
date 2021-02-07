import * as actionTypes from "./actions";

const initialState = {
  ingredients: { meat: 0, cheese: 0, salad: 0, bacon: 0 },
  totalPrice: 8,
};

const INGREDIENT_PRICES = { salad: 1, bacon: 1.5, meat: 2, cheese: 1.5 };

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      console.log("Adding ingredient...");
      return {
        ingredients: {
          ...state.ingredients,
          [action.ingredient]: state.ingredients[action.ingredient] + 1,
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredient],
      };

    case actionTypes.REMOVE_INGREDIENT:
      console.log("Removing ingredient...");
      return {
        ingredients: {
          ...state.ingredients,
          [action.ingredient]: state.ingredients[action.ingredient] - 1,
        },
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredient],
      };
      
    default:
      return state;
  }
};

export default reducer;
