import {configureStore} from "@reduxjs/toolkit";
import rootReducer from "./rootReducer.js";
import {authApi} from "@/features/api/authApi.js";
export const appStore=configureStore({
    reducer:rootReducer,
    middleware:(dm)=>dm().concat(authApi.middleware)
}) 