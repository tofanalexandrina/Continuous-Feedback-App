import {BrowserRouter, Routes, Route} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import SignUp from './components/SignUp'
import LogIn from './components/LogIn'
import Home from './components/Home'
import ActivityDetails from './components/ActivityDetails';
import GeneralMain from './components/GeneralMain';
import ActivityFeedback from './components/ActivityFeedback';


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/signup' element={<SignUp />}></Route>
        <Route path='/login' element={<LogIn />}></Route>
        <Route path='/home'element={<Home />}></Route>
        <Route path='/activities/:activityId' element={<ActivityDetails />}></Route>
        <Route path='/' element={<GeneralMain />}></Route>
        <Route path='/activity/:code' element={<ActivityFeedback />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
