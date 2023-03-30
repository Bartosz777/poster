import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import useAuthContext from './hooks/useAuthContext'

import Navbar from './components/Navbar'
import Footer from './components/Footer'
import AddForm from './components/AddForm'

import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import UserPosts from './pages/UserPosts'

function App() {
  const { user } = useAuthContext()


  return (
    <div>
    <BrowserRouter>
    <Navbar />
      <Routes>
        <Route 
          path='/' 
          element={user ? <Home /> : <Navigate to='/login'/>}/>
        <Route 
          path='/add' 
          element={user ? <AddForm /> : <Navigate to='/login'/>}/>
        <Route 
          path='/login' 
          element={user ? <Navigate to='/'/> : <Login />}/>
        <Route 
          path='/signup' 
          element={user ? <Navigate to='/'/> : <Signup />}/>
        <Route 
          path='/logout' 
          element={<Navigate to='/'/>} />
        <Route 
          path='/userposts' 
          element={user ? <UserPosts /> : <Navigate to='/login'/>} />
      </Routes>
      <Footer />
    </BrowserRouter>
    </div>
  );
}

export default App;
