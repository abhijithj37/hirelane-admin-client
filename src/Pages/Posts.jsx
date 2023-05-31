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
import axios from "../utils/axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Posts() {
  const navigate=useNavigate()
    const [posts, setPosts] = useState([]);
 
  useEffect(() => {
    axios
      .get("/job-posts", { withCredentials: true })
      .then(({ data }) => {
        console.log(data, "posts");
        setPosts(data);
      })
      .catch((err) =>{
        console.log(err.message);
      });
  }, []);

  

  
  
     

    
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
              Job Posts
            </Typography>
          </Grid>
          {/* ******************************************************************************************************************************************************* */}

          <Grid item width={"100%"}>
            <Box sx={{ width: "100%", typography: "body1" }}>
              <TabContext value={'1'}>
                <Box sx={{ borderBottom:1, borderColor:"black" }}>

                  <TabList aria-label="lab API tabs example">
                  <Tab label="Posts" value="1" />
                  </TabList>

                </Box>

                <TabPanel value="1">
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell>Job title</TableCell>

                          <TableCell align="left">CompanyName</TableCell>
                          <TableCell align="left">Posted on</TableCell>
                          <TableCell align="left">Employer Id</TableCell>
                          <TableCell align="left">Status</TableCell>
                          <TableCell align="left">Actions</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {posts.map((element, index) => (
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
                                    {element.jobTitle}
                                  </Typography>
                                  <Typography variant="caption"> {element._id}</Typography>
                                </Box>
                              </Box>
                            </TableCell>
                            <TableCell align="left">
                              {element.companyName}
                            </TableCell>
                            <TableCell align="left">
                              {element.createdAt}
                            </TableCell>
                            <TableCell align="left"> 
                               <Typography color={'gray'}>{element.employerId}</Typography>
                            </TableCell>
                            <TableCell align="left">
                                <Box borderRadius={2} display={'flex'} justifyContent={'center'} textAlign={'center'} bgcolor={element.status=="Approved"?'#00e676':'#e53935'}>
                                <Typography   color={'white'} variant="caption">
                                {element.status}
                               </Typography> 
                                </Box>
                                
                            </TableCell>
                            <TableCell align="left">
                             <Box>
                                <Button onClick={()=>navigate(`/post/${element._id}`)} size={'small'}>
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

export default Posts;
