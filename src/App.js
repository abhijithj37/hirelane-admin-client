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


function App(){
  const dispatch=useDispatch()
  const {admin}=useSelector((state)=>state.admin)


  useEffect(()=>{
  axios.get('/verify',{withCredentials:true}).then(({data})=>{
   dispatch(setAdminData(data))
  }).catch((err)=>{
    console.log(err.message);
  })
  },[])

  const router=createBrowserRouter(
  createRoutesFromElements(
      <Route>
        <Route path='/login' element={admin?<Navigate to={'/'}/>:<Login/>}/>
        <Route path='/'  element={<Home/>}>
          <Route path='/posts' element={<Posts/>}/>
          <Route path='/post/:id' element={<PostDetails/>}></Route>
        </Route>
      </Route>
    )
  )
  
  return(
    <div className="App">
    <RouterProvider router={router}/>
    </div>
  )

}

export default App;
