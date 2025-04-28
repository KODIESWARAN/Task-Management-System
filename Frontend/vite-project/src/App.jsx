import {BrowserRouter , Routes , Route} from 'react-router'
import Home from './pages/Home'
import CreatTask from './pages/CreatTask'
import UpdateTask from './pages/UpdateTask'
import Signup from './pages/signup'
import Navbar from './pages/Navbar'
import Login from './pages/Login'

function App() {

  return (
    <>
    <BrowserRouter>
    <Navbar/>
    <Routes>
    <Route path='/' element={<Home/>}/> 
    <Route path='/create' element={<CreatTask/>}/> 
    <Route path='/update/:id' element={<UpdateTask/>}/>
    <Route path="/signup" element={<Signup />} /> 
    <Route path="/login" element={<Login />} /> 
    </Routes>
    </BrowserRouter>
      
    </>
  )
}

export default App
