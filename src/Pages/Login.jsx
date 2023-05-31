import { Box, Button, Container, TextField, Typography } from '@mui/material'
import axios from '../utils/axios'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setAdminData } from '../app/features/adminSlice'

function Login(){
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const [formData,setFormdata]=useState({
        userName:"",
        password:""
    })


    const [errorMessage,setErrorMessage]=useState('')
    const handleSubmit=(e)=>{
          e.preventDefault()
    if((formData.userName.trim())===""||(formData.password.trim())===""){
    return setErrorMessage('Please fill all the fields')
    
    }else{
        setErrorMessage('')
    }

    axios.post('/login',formData,{withCredentials:true}).then(({data})=>{
        dispatch(setAdminData(data))
        navigate('/')
    }).catch((err)=>{
       console.log(err.message)
    })

 }
  return (
    <div>
      <Container maxWidth="xs">
        <Box
          padding={3}
          marginTop={15}
          sx={{
            bordercolor:"blue",
            border: 1,
            boxShadow: 2,
            borderRadius: 2,
            borderColor: "lightgray",
          }}
        >
          <Typography textAlign={"center"} color={"red"}>
            {errorMessage}
          </Typography>
          <Typography
            marginBottom={3}
            variant="h5"
            gutterBottom
            color={"primary"}
          >
           Admin Login
          </Typography>

          <form onSubmit={handleSubmit}>
            <TextField
              label="User name"
              type="text"
              value={formData.userName}
              onChange={(e) =>
                setFormdata({ ...formData, userName: e.target.value })
              }
              margin="normal"
              fullWidth
              required
              
            />
            <TextField
              label="Password"
              type="password"
              value={formData.password}
              onChange={(e)=>
              setFormdata({...formData,password:e.target.value})
              }
              margin="normal"
              fullWidth
              required
              />
             
            <Button
              sx={{ marginTop: 2 }}
              variant="contained"
              color="primary"
              type="submit"
              fullWidth
            >
              login
            </Button>
          </form>

         </Box>
      </Container>
    </div>
  )
}

export default Login
