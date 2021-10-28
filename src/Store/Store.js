import { configureStore } from '@reduxjs/toolkit';
import {themeReducer} from "./MainSlice";

export const store=configureStore({
    reducer:{themeReducer}
})


