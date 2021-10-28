import { createSlice, PayloadAction } from "@reduxjs/toolkit";
const mainSlice=createSlice({
    name:"theme",
    initialState:{
        isDarkTheme:false
    },
    reducers:{
        setIsDarkTheme:((state,action)=>{
            state.isDarkTheme=action.payload;
        })
    }
})
export const {setIsDarkTheme}=mainSlice.actions;
export const themeReducer=mainSlice.reducer;
