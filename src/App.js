import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Layout from './pages/Layout'
import LoginTest from './pages/Login/loginTest'
import SnackBar from './component/SnackBar'
import { auth } from './utils/token'
import { Navigate } from 'react-router-dom'
function App () {
  const [inputValue, setInputValue] = useState("")
  const [searchedValue, setSearchedValue] = useState()
  const [message, setMessage] = useState("")

  useEffect(() => {
    auth()
  }, [])

  console.log(auth())

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={

          auth() ? (
            <Layout inputValue={inputValue} setInputValue={setInputValue}
              searchedValue={searchedValue}
              setSearchedValue={setSearchedValue} setMessage={setMessage} />
          ) : (<Navigate to="/loginTest" replace />)
        }></Route>
        <Route path='/loginTest' element={auth() ? <Navigate to="/" replace /> : <LoginTest />}></Route>

      </Routes>
      <SnackBar message={message} setMessage={setMessage} />
    </BrowserRouter >

  )
}

export default App
