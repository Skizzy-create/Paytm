import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Signup } from './pages/Signup';
import { Dashboard } from './pages/Dashboard';
import { SendMoney } from './pages/SendMoney';
import { Signin } from './pages/Signin';


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
        </Routes>
      </BrowserRouter>
    </>
  )
}
