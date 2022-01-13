import '../styles/globals.css'
import {
  RecoilRoot,
} from 'recoil';


// Wrap the entire app in Recoil Root

function MyApp({ Component, pageProps }) {
  return <RecoilRoot>
    <Component {...pageProps} />
  </RecoilRoot>
}

export default MyApp
