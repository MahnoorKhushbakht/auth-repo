import { Route, Routes } from 'react-router-dom';
import './App.css'
import Header from './components/Header'
import SignInForm from './components/SignInForm'
import SignUpForm from './components/SignUpForm'
import { useState, useEffect } from 'react'

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const name = localStorage.getItem("name");
    if (token && name) {
      setUser(name);
    } else {
      setUser(null);
    }
  }, []);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={
          <div className='bg-black max-w-full h-svh flex justify-center items-center'>
            <h1 className='text-white text-3xl font-bold underline'>
              Hello, {user ? user : 'Guest'}!
            </h1>
          </div>
        } />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/signin" element={<SignInForm />} />
      </Routes>
    </>
  )
}

export default App