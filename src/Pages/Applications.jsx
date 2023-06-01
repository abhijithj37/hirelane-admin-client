import { TabContext, TabList, TabPanel } from "@mui/lab";
import {
  Box,
  Grid,
  Tab,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Toolbar,
  Typography,
  Paper,
  Button
} from "@mui/material";
 import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetApplications } from "../utils/api";

function Applications(){
 
  const navigate=useNavigate()
  const {applications}=useSelector((state)=>state.admin) 

   useGetApplications()

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
            <Typography  letterSpacing={1.7} fontWeight={700} variant="h4">
              Applications
            </Typography>
          </Grid>
          {/* ******************************************************************************************************************************************************* */}

          <Grid item width={"100%"}>
            <Box sx={{ width: "100%", typography: "body1" }}>
              <TabContext value={'1'}>
                <Box sx={{ borderBottom:1, borderColor:"black" }}>

                  <TabList aria-label="lab API tabs example">
                  <Tab label="Applications" value="1" />
                  </TabList>

                </Box>

                <TabPanel value="1">
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell>Candidate</TableCell>

                          <TableCell align="left">Job title</TableCell>
                          <TableCell align="left">Application Id</TableCell>

                          <TableCell align="left">Company Name</TableCell>
 
                          <TableCell align="left">Applied on</TableCell>
                           <TableCell align="left">Application Status</TableCell>
                          <TableCell align="left">Actions</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {applications?.map((element, index) => (
                          <TableRow
                            key={element._id}
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <TableCell component="th"scope="row">
                              <Box display={"flex"}>
                                 
                                <Box marginLeft={1}>
                                  <Typography fontWeight={600}>
                                    {" "}
                                    {element.fName+' '+element.lName}
                                  </Typography>
                                  <Typography variant="caption"> {element.candidateId}</Typography>
                                </Box>
                              </Box>
                            </TableCell>
                            <TableCell align="left">
                              {element.jobTitle}
                            </TableCell>
                            <TableCell align="left">
                              {element._id}
                            </TableCell>
                            <TableCell align="left"> 
                               <Typography color={'gray'}>{element.companyName}</Typography>
                            </TableCell>
                            <TableCell align="left"> 
                               <Typography color={'gray'}>{element.createdAt}</Typography>
                            </TableCell>
                            <TableCell align="left">
                                <Box borderRadius={2} display={'flex'} justifyContent={'center'} textAlign={'center'} bgcolor={element.verificationStatus==="Approved"?'#00e676':'#e53935'}>
                                <Typography   color={'white'} variant="caption">
                                {element.verificationStatus}
                               </Typography>
                                </Box>
                                
                            </TableCell>
                            <TableCell align="left">
                             <Box>
                                <Button onClick={()=>navigate(`/application/${element._id}`)} size={'small'}>
                                 verify
                                </Button>
                                </Box>
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
  );
}

export default Applications;
