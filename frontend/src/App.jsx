import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Signup } from './pages/Signup';
import { Dashboard } from './pages/Dashboard';
import { SendMoney } from './pages/SendMoney';
import { Signin } from './pages/Signin';
import { Transction } from './pages/Transction';


export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={ <Signup /> } />
          <Route path='/Signup' element={ <Signup /> } />
          <Route path='/Signin' element={ <Signin/> } />
          <Route path='/dashboard' element={ <Dashboard /> }/>
          <Route path='/send' element={ <SendMoney />} />
          <Route path='/transaction' element={ <Transction />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}
