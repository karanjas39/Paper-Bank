import {
  combineReducers,
  configureStore,
  createAction,
} from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import authReducer from "@/store/slices/authSlice";
import { authApi } from "@/store/api/authApi";
import { programApi } from "./api/programApi";
import { userApi } from "./api/userApi";
import { emailApi } from "./api/emailApi";

export const logoutAction = createAction("auth/logout");

const appReducer = combineReducers({
  [userApi.reducerPath]: userApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
  [programApi.reducerPath]: programApi.reducer,
  [emailApi.reducerPath]: emailApi.reducer,
  auth: authReducer,
});

const rootReducer = (state: any, action: any) => {
  if (action.type === logoutAction.type) {
    sessionStorage.removeItem("token");
    state = undefined;
  }
  return appReducer(state, action);
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      programApi.middleware,
      userApi.middleware,
      emailApi.middleware
    ),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
