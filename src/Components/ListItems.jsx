import React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
  import LogoutIcon from '@mui/icons-material/Logout';
import axios from '../utils/axios'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {setAdminData} from '../app/features/adminSlice';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
 import GroupsIcon from '@mui/icons-material/Groups';
import DashboardIcon from '@mui/icons-material/Dashboard';
import NoteIcon from '@mui/icons-material/Note';function MainListItems(){
const navigate=useNavigate()
const dispatch=useDispatch()
const handleLogout=()=>{ 
 const confirmed=window.confirm('Are You Sure want to log out')
  if(confirmed){
  axios.get('/logout',{withCredentials:true}).then(()=>{
    dispatch(setAdminData(null))
    navigate('/login')
    }).catch((error)=>{
    console.log(error.message)
    })
  }
 
}
  return(
    <>
    <ListItemButton onClick={()=>{navigate('.')}}>
      <ListItemIcon>
        <DashboardIcon/>
      </ListItemIcon>
      <ListItemText primary="Dashboard"/>
    </ListItemButton>
    <ListItemButton onClick={()=>navigate('employers')} >
      <ListItemIcon>
      <GroupsIcon />
      </ListItemIcon>
      <ListItemText primary= "Employers" />
    </ListItemButton>
    <ListItemButton onClick={()=>navigate('posts')}>
      <ListItemIcon>
      < WorkHistoryIcon/>
          </ListItemIcon>
      <ListItemText primary="Job Posts" />
    </ListItemButton>
    <ListItemButton onClick={()=>navigate('users')}>
      <ListItemIcon  >
      <GroupsIcon />
      </ListItemIcon>
      <ListItemText primary="Users"/>
    </ListItemButton>
    <ListItemButton onClick={()=>navigate('applications')}>
      <ListItemIcon >
      <NoteIcon/>
      </ListItemIcon>
      <ListItemText primary="Applications"></ListItemText>
    </ListItemButton>
    <ListItemButton onClick={handleLogout}>
      <ListItemIcon >
      <LogoutIcon />
      </ListItemIcon>
      <ListItemText primary="Log Out"></ListItemText>
    </ListItemButton>
    
  </>
  )
}
  
  
 

export {MainListItems}
   