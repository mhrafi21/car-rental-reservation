
import { Outlet, ScrollRestoration } from 'react-router-dom'
import Footer from '../components/Footer'
import Header from '../components/Header/Header'

const Root = () => {
  return (
    <div>
        <Header />
        <ScrollRestoration />
       <div className='mt-0'>
         <Outlet />
       </div>
        <Footer />
    </div>
  )
}

export default Root