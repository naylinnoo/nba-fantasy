import "../styles/globals.scss"
import type { AppProps } from "next/app"
import Navbar from "components/nav"
import { Provider } from "react-redux"
import store from "ducks/Store"
import { persistStore } from "redux-persist"

function MyApp({ Component, pageProps }: AppProps) {
    let persistor = persistStore(store)

    return (
        <>
            <Provider store={store}>
                <Navbar />
                <Component {...pageProps} />
            </Provider>
        </>
    )
}

export default MyApp
