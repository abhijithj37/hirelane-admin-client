import { TabContext, TabList,TabPanel} from '@mui/lab'
import { Container,Toolbar,Typography,Button,Box,Grid, TableCell,TableBody,Table,TableContainer,Tab,TableRow,TableHead } from '@mui/material'
import axios from '../utils/axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setEmployers } from '../app/features/adminSlice'

function Employers() {
    const [updated,setUpdated]=useState(false)
    const {employers}=useSelector((state)=>state.admin)
    const dispatch=useDispatch()
    useEffect(()=>{
    
   axios.get('/employers',{withCredentials:true}).then(({data})=>{
    
     dispatch(setEmployers(data))
   }).catch((err)=>{
    console.log(err.message);
   })
    },[updated,dispatch])

  const handleUpdateStatus=(status,id)=>{
    const data={
        status,
        employerId:id
    }
  axios.put('/verify-employer',data,{withCredentials:true}).then(({data})=>{
      window.alert('Employer status updated')
      setUpdated(!updated)

 

  }).catch((err)=>{
    console.log(err.message);
  })
  }
  return (
    <Box
    component="main"
    sx={{
      backgroundColor: (theme) => theme.palette.common.white,
      flexGrow: 1,
      height: "100vh",
      overflow: "auto",
    }}
  >
    <Toolbar />
 
 
    <Container>
      <Grid container rowGap={3} paddingTop={4} border={0}>
        <Grid item width={"100%"}>
          <Typography letterSpacing={1.7} fontWeight={700} variant="h4">
            Employers
          </Typography>
        </Grid>
        {/* ******************************************************************************************************************************************************* */}

        <Grid item width={"100%"}>
          <Box sx={{ width: "100%", typography: "body1" }}>
            <TabContext value={'1'}>
              <Box sx={{ borderBottom: 1, borderColor: "black" }}>
                <TabList
                  
                  aria-label="lab API tabs example"
                >
                  <Tab label="" value="1" />
                 </TabList>
              </Box>

              <TabPanel value="1">
                <TableContainer component={Box}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Employer name</TableCell>
                        <TableCell align="left">Employer Id</TableCell>
                        <TableCell align="left">Email</TableCell>

                        <TableCell align="left">Company name</TableCell>
                        {/* <TableCell align="left">joined on</TableCell> */}
                         <TableCell align="left">Action</TableCell>
                       </TableRow>
                    </TableHead>
                    <TableBody>
                      {employers?.map((element, index) => (
                        <TableRow
                          key={element._id}
                          sx={{
                            "&:last-child td,&:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell component="th" scope="row">
                            <Box display={"flex"}>
                              <Box marginLeft={1}>
                                <Typography fontWeight={600}>
                                  {" "}
                                  {element.name}
                                </Typography>
                                <Typography variant="body2" color={"gray"}>
                                  {" "}
                                  {element.email}
                                </Typography>
                              </Box>
                            </Box>
                          </TableCell>
                          <TableCell align="left">
                            <Typography fontWeight={500}>
                              {element._id}
                            </Typography>{" "}
                          </TableCell>
                          <TableCell align="left">
                            {element.email}
                          </TableCell>
                          <TableCell align="left">
                          {element.companyName}
                          </TableCell>
                         
                          <TableCell align="left">
                         {element.blocked?<Button onClick={()=>handleUpdateStatus(false,element._id)} variant='contained' size='small'  color='error'>
                             Unblock
                             </Button>:
                             <Button  onClick={()=>handleUpdateStatus(true,element._id)} variant='contained' size='small'  color='success'>
                             Block
                             </Button>}
                          </TableCell>
                          
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </TabPanel>
              
            </TabContext>
          </Box>
        </Grid>
        {/* ********************************************************************************************************************************************************** */}
      </Grid>
    </Container>
  </Box>
  )
}

export default Employers
