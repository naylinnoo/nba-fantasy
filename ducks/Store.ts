import storage from "redux-persist/lib/storage"
import { combineReducers } from "redux"
import { configureStore } from "@reduxjs/toolkit"
import { default as thunk } from "redux-thunk"
import { persistReducer, persistStore } from "redux-persist"
import auth from "./modules/Auth"

const persistConfig = {
    key: "root",
    storage,
}

const reducers = combineReducers({
    auth,
})

const persistedReducer = persistReducer(persistConfig, reducers)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

const store = configureStore({ middleware: [thunk], reducer: persistedReducer })
const persistor = persistStore(store)
export { store, persistor }
