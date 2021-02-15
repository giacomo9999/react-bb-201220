import * as actionTypes from "../actions/actionTypes";

const initialState = {
  ingredients: null,
  error: false,
  totalPrice: 8,
};

const INGREDIENT_PRICES = { salad: 1, bacon: 1.5, meat: 2, cheese: 1.5 };

const bBreducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return {
        ingredients: {
          ...state.ingredients,
          [action.ingredient]: state.ingredients[action.ingredient] + 1,
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredient],
      };

    case actionTypes.REMOVE_INGREDIENT:
      return {
        ingredients: {
          ...state.ingredients,
          [action.ingredient]: state.ingredients[action.ingredient] - 1,
        },
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredient],
      };

    case actionTypes.SET_INGREDIENTS:
      return { ...state, ingredients: action.ingredients, error: false };

    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return { ...state, error: true };

    default:
      return state;
  }
};

export default bBreducer;
