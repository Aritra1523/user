import { configureStore } from "@reduxjs/toolkit"
import authReducer  from "../slice/authSlice/authSlice"
import doctorReducer from "../slice/admin/doctorSlice/doctorSlice"
import departmentReducer from "../slice/admin/departmentSlice/departmentSlice";

export const store=configureStore({
    reducer:{
        auth:authReducer ,
        doctor:doctorReducer,
        department:departmentReducer
    }
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;