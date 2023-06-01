import React from 'react';
import { Box, Toolbar, Container, Grid, Paper, Typography,TableCell,TableRow,Table,TableHead,TableBody,TableContainer,Avatar } from '@mui/material';
import { BarChart, Bar, PieChart,LineChart,Line, Pie, Cell, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';
import { useSelector} from 'react-redux';
import { useGetApplications, useGetApplicationsByMonth, useGetEmployers, useGetPosts, useGetPostsByMonth, useGetUsers } from '../utils/api';
  function Dashboard() {
 const {employers,applications,posts,users}=useSelector((state)=>state.admin)
  const {barChartData}=useGetApplicationsByMonth()
 const {lineChartData}=useGetPostsByMonth()



 useGetEmployers()
 useGetUsers()
 useGetPosts()
 useGetApplications()
 
 const verifiedApplications=applications?.filter((app)=>app.verificationStatus!=="Not-verified")
 const verifiedPosts=posts?.filter((p)=>p.status!=="Not-verified")
  const pieChartData = [
    { name: 'Posts', value: posts?.length },
    { name: 'Applications', value:applications?.length },
    { name: 'Verified Applications',value:verifiedApplications?.length},
    { name: 'Verified Posts', value:verifiedPosts?.length},
  ];

  const colors=['#8884d8','#82ca9d','#ffc658','#0088FE'];
  const recentUsers=users?.slice(0,10)
  
 
 
  return(
    <Box
      component="main"
      sx={{
        backgroundColor:(theme)=>theme.palette.common.white,
        flexGrow:1,
        height: '100vh',
        overflow: 'auto',
      }}
    >
      <Toolbar />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={4}>
          {/* Total Applications */}
          <Grid item xs={12} sm={6} md={3}>
            <Paper elevation={3}>
              <Box p={2}>
                <Typography variant="h6">Total Applications</Typography>
                <Typography variant="h4">{applications?.length}</Typography>
              </Box>
            </Paper>
          </Grid>

          {/* Total Job Posts */}
          <Grid item xs={12} sm={6} md={3}>
            <Paper elevation={3}>
              <Box p={2}>
                <Typography variant="h6">Total Job Posts</Typography>
                <Typography variant="h4">{posts?.length}</Typography>
              </Box>
            </Paper>
          </Grid>

          {/* Total Employers */}
          <Grid item xs={12} sm={6} md={3}>
            <Paper elevation={3}>
              <Box p={2}>
                <Typography variant="h6">Total Employers</Typography>
                <Typography variant="h4">{employers?.length}</Typography>
              </Box>
            </Paper>
          </Grid>

          {/* Total Users */}
          <Grid item xs={12} sm={6} md={3}>
            <Paper elevation={3}>
              <Box p={2}>
                <Typography variant="h6">Total Users</Typography>
                <Typography variant="h4">{users?.length}</Typography>
              </Box>
            </Paper>
          </Grid>

          {/* Bar Chart */}
          <Grid marginTop={4} item xs={12} md={6}>
            <Paper elevation={3}>
              <Box p={3}>
                <Typography gutterBottom variant="h6">Applications by Month</Typography>
                <BarChart width={500} height={300} data={barChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month"/>
                  <YAxis />
                  <Legend />
                  <Bar dataKey="applications" fill="#8884d8" />
                  </BarChart>
              </Box>
            </Paper>
          </Grid>

          {/* Pie Chart */}
          <Grid  marginTop={4} item xs={12} md={6}>
            <Paper elevation={3}>
              <Box p={3}>
                <Typography gutterBottom variant="h6">Post vs Applications</Typography>
                <PieChart width={500} height={300}>
                  <Pie
                    data={pieChartData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                    label
                  >
                    {pieChartData.map((entry, index)=>(
                      <Cell key={index} fill={colors[index % colors.length]}/>
                    ))}
                  </Pie>
                  <Legend />
                </PieChart>
              </Box>
            </Paper>
          </Grid>
          <Grid marginTop={4} item xs={12} md={6}>
            <Paper  elevation={3}>
              <Box p={3}>
                <Typography gutterBottom variant="h6">Posts by Month</Typography>
                <Box display={'flex'} justifyContent={'center'}> 
                <LineChart width={535} height={350} data={lineChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Legend />
                  <Line type="monotone" dataKey="posts" stroke="#00e676" />
                </LineChart>
                </Box>
              </Box>
            </Paper>
          </Grid>
          <Grid marginTop={4} item xs={12} md={6}>
            <Paper elevation={3}>
              <Box p={3}>
                <Typography  variant="h6">Recently Joined Users</Typography>
                <TableContainer style={{ height: 350 }}>
                  <Table stickyHeader>
                    <TableHead>
                      
                    </TableHead>
                    <TableBody>
                       {recentUsers?.map((e) => (
                        <TableRow >
                          <TableCell>
                            
                        <Box  alignItems={'center'} alignContent={'center'} display={'flex'}>
                            <Avatar /> 
                            <Box> 
                            <Typography variant='body2' marginLeft={1}>{e.fName+" "+e.lName}</Typography>
                             </Box>
                            </Box>  
                          </TableCell>
                          <TableCell ><Typography variant='caption'>{e._id}</Typography> </TableCell>

                           <TableCell><Typography variant='body2'>{e.email}</Typography> </TableCell>
                        </TableRow> 
                      ))} 
                       
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default Dashboard;

