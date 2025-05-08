import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

export interface ingredientsInConstructorData {
  error: null | string;
  ingredientsInConstructor: {
    bun: TIngredient | null;
    ingredients: TIngredient[];
  };
  isModalOpen: boolean;
}

export const initialState: ingredientsInConstructorData = {
  error: null,
  ingredientsInConstructor: {
    bun: null,
    ingredients: []
  },
  isModalOpen: false
};

const ingredientsInConstructorSlice = createSlice({
  name: 'ingredientsInConstructor',
  initialState,
  reducers: {
    addIngredientsInConstructor: (
      state,
      action: PayloadAction<TIngredient>
    ) => {
      action.payload.type === 'bun'
        ? (state.ingredientsInConstructor.bun = action.payload)
        : state.ingredientsInConstructor.ingredients.push(action.payload);
    },
    moveUpIngredient: (state, action: PayloadAction<number>) => {
      state.ingredientsInConstructor.ingredients.splice(
        action.payload - 1,
        0,
        state.ingredientsInConstructor.ingredients.splice(action.payload, 1)[0]
      );
    },
    moveDownIngredient: (state, action: PayloadAction<number>) => {
      state.ingredientsInConstructor.ingredients.splice(
        action.payload + 1,
        0,
        state.ingredientsInConstructor.ingredients.splice(action.payload, 1)[0]
      );
    },
    deleteIngredient: (state, action: PayloadAction<number>) => {
      state.ingredientsInConstructor.ingredients.splice(action.payload, 1);
    },
    cleanIngredientsInConstructor: (state) => {
      state.ingredientsInConstructor = {
        bun: null,
        ingredients: []
      };
    }
  },
  selectors: {
    selectIngredientsInConstructor: (state) => state.ingredientsInConstructor
  }
});

export const {
  addIngredientsInConstructor,
  moveUpIngredient,
  moveDownIngredient,
  deleteIngredient,
  cleanIngredientsInConstructor
} = ingredientsInConstructorSlice.actions;

export const { selectIngredientsInConstructor } =
  ingredientsInConstructorSlice.selectors;

export default ingredientsInConstructorSlice;
