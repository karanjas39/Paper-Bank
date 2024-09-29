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
import { notificationApi } from "./api/notificationApi";
import { qpApi } from "./api/qpApi";
import { contactApi } from "./api/contactApi";
import { emailApi } from "./api/emailApi";

export const logoutAction = createAction("auth/logout");

const appReducer = combineReducers({
  [userApi.reducerPath]: userApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
  [programApi.reducerPath]: programApi.reducer,
  [notificationApi.reducerPath]: notificationApi.reducer,
  [qpApi.reducerPath]: qpApi.reducer,
  [contactApi.reducerPath]: contactApi.reducer,
  [emailApi.reducerPath]: emailApi.reducer,
  auth: authReducer,
});

const rootReducer = (state: any, action: any) => {
  if (action.type === logoutAction.type) {
    localStorage.removeItem("token");
    return appReducer(undefined, { type: "@@INIT" });
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
      notificationApi.middleware,
      qpApi.middleware,
      contactApi.middleware,
      emailApi.middleware
    ),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
