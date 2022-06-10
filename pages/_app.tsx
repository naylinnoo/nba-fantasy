import "../styles/globals.scss"
import type { AppProps } from "next/app"
import Navbar from "components/nav"
import { Provider, useDispatch, useSelector } from "react-redux"
import { persistor, RootState, store } from "ducks/Store"
import { PersistGate } from "redux-persist/integration/react"

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <Navbar />
                    <Component {...pageProps} />
                </PersistGate>
            </Provider>
        </>
    )
}

export default MyApp
