import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import taskReducer from "./slices/taskSlice";
import { persistStore, persistReducer } from "redux-persist";
import storageSession from "redux-persist/lib/storage/session";

export const store = configureStore({
  reducer: {
    authReducer:persistReducer({key:"auth",storage:storageSession},authReducer),
    taskReducer
  }
});
export const persistor = persistStore(store);
