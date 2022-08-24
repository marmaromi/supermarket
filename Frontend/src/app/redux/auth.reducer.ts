import { createReducer, on } from "@ngrx/store";
import { login, logout } from "./auth.actions";

export const initialState = 0;

export const authReducer = createReducer(
    initialState,
    on(login, (state) => state + 1),
    on(logout, (state) => state - 1),
);