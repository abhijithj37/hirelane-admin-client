   import {
    createBrowserRouter,
    Route,
    RouterProvider,
    createRoutesFromElements,
    Navigate
  } from 'react-router-dom'
import Home from './Pages/Home';
import Login from './Pages/Login';
import { useEffect } from 'react';
import axios from './utils/axios';
import { useDispatch, useSelector } from 'react-redux';
import { setAdminData } from './app/features/adminSlice';
import Posts from './Pages/Posts';
import PostDetails from './Pages/Post-Details';
import Applications from './Pages/Applications';
import ApplicationDetails from './Pages/ApplicationDetails';
import Employers from './Pages/Employers';
import JobSeekers from './Pages/JobSeekers';
import Dashboard from './Pages/Dashboard';
import { SocketProvider } from './Context/SocketProvider';
  

function App(){
  const dispatch=useDispatch()
  const {admin}=useSelector((state)=>state.admin)
   


  useEffect(()=>{
  axios.get('/verify',{withCredentials:true}).then(({data})=>{
   dispatch(setAdminData(data))
  }).catch((err)=>{
    console.log(err.message);
  })
  },[dispatch])

   
  
   

  const router=createBrowserRouter(
  createRoutesFromElements(
      <Route>
        <Route path='/login' element={admin?<Navigate to={'/'}/>:<Login/>}/>
        <Route path='/'  element={<Home/>}>
          <Route index element={<Dashboard/>}/>
          <Route path='/posts' element={<Posts/>}/>
          <Route path='/post/:id' element={<PostDetails/>}></Route>
          <Route path='/applications' element={<Applications/>}/>
          <Route path='/application/:id' element={<ApplicationDetails/>}/>
          <Route path='/employers' element={<Employers/>}/>
          <Route path='/users' element={<JobSeekers/>}/>
          
        </Route>
      </Route>
    )
  )
  
  return(
    <div className="App">
      <SocketProvider> 
    <RouterProvider router={router}/>
    </SocketProvider>
    </div>
  )

}

export default App;
