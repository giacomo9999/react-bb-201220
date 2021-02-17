import axios from "../../axios-orders";

import * as actionTypes from "./actionTypes";

export const addIngredient = (ingredient) => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    ingredient: ingredient,
  };
};

export const removeIngredient = (ingredient) => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    ingredient: ingredient,
  };
};

export const setIngredients = (ingredients) => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    ingredients: ingredients,
    totalPrice: 8,
  };
};

export const fetchIngredientsFailed = () => {
  return { type: actionTypes.FETCH_INGREDIENTS_FAILED };
};

export const initIngredients = () => {
  return (dispatch) => {
    axios
      .get(
        "https://react-my-burger-b77e3-default-rtdb.firebaseio.com/ingredients.json"
      )
      .then((res) => {
        dispatch(setIngredients(res.data));
      })
      .catch((err) => {
        dispatch(fetchIngredientsFailed());
      });
  };
};
