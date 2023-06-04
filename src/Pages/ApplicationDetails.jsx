import axios from "../utils/axios";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Container,
  Box,
  Typography,
  Button,
  Avatar,
  Toolbar,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setApplication } from "../app/features/adminSlice";
import { handleSendNotification } from "../utils/api";
import { useSocket } from "../Context/SocketProvider";

function ApplicationDetails() {
  const socket = useSocket();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { application } = useSelector((state) => state.admin);

  useEffect(() => {
    axios
      .get(`/application-details/${id}`, { withCredentials: true })
      .then(({ data }) => {
        dispatch(setApplication(data));
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [dispatch, id]);

  const handleUpdateStatus = (status) => {
    const userNotification = {
      from: "Hirelane",
      to: application?.candidateId,
      content: `Your Job Application for ${application?.jobTitle} was ${status}`,
      createdAt: new Date(),
    };
    const employerNotification = {
      from: "Hirelane",
      to: application?.employerId,
      content: `${
        application?.fName + " " + application?.lName
      } applied for the position ${application?.jobTitle} posted on ${new Date(
        application?.jobPostDate
      ).toLocaleDateString("en-us", { day: "numeric", month:'long',year:'numeric'})} `,
      createdAt: new Date(),
    };
    const data = {
      status,
      applicationId: id,
    };
    axios
      .put("/verify-application", data, { withCredentials: true })
      .then(({ data }) => {
        dispatch(setApplication(data));
        window.alert(`Application ${status}`);
        handleSendNotification(userNotification, socket);
        if (status === "Approved") {
          handleSendNotification(employerNotification, socket);
        }
        navigate("/applications");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

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

      <Container sx={{ paddingTop: 2 }}>
        <Box
          border={1}
          borderRadius={2}
          sx={{ borderColor: "lightgray" }}
          padding={2}
          display={"flex"}
          justifyContent={"space-between"}
        >
          {/* ********************************************** */}
          <Box>
            <Box marginTop={1} display={"flex"}>
              <Box>
                <Avatar
                  sx={{ width: 56, height: 56 }}
                  src={`http://localhost:4001/image/${application?.image}`}
                ></Avatar>
              </Box>
              <Box marginLeft={1}>
                <Typography variant="h5">
                  {application?.fName + " " + application?.lName}
                </Typography>

                <Typography variant="body2" color={"gray"}>
                  Applied on{" "}
                  {new Date(application?.createdAt).toLocaleDateString(
                    "en-us",
                    { day: "numeric", month: "short", year: "numeric" }
                  )}
                </Typography>
              </Box>
            </Box>
            <Box display={"flex"} padding={0} marginTop={1}>
              <Button
                target="_blank"
                href={application?.cvUrl}
                size="small"
                sx={{ borderRadius: 5 }}
                variant="contained"
              >
                View CV
              </Button>
            </Box>
          </Box>
          <Box width={"15%"}>
            {application?.verificationStatus !== "Approved" && (
              <Button
                size="small"
                sx={{ borderRadius: 3 }}
                variant="contained"
                color="success"
                onClick={() => handleUpdateStatus("Approved")}
              >
                Approve
              </Button>
            )}
            {application?.verificationStatus !== "Rejected" && (
              <Button
                size="small"
                sx={{ borderRadius: 3, marginLeft: 1 }}
                variant="contained"
                color="error"
                onClick={() => handleUpdateStatus("Rejected")}
              >
                Reject
              </Button>
            )}
          </Box>
        </Box>
        {/* ********************************************** */}

        <Box
          padding={2}
          border={1}
          borderRadius={2}
          sx={{ borderColor: "lightgray" }}
          marginTop={1}
        >
          <Box>
            <Typography variant="h6">Application Details</Typography>
            <Typography color={"gray"} fontWeight={500}>
              Contact information
            </Typography>
          </Box>
          <Box
            boxShadow={1}
            marginTop={1}
            border={1}
            borderRadius={1}
            sx={{ borderColor: "lightgray" }}
          >
            <Box padding={1} borderBottom={1} sx={{ borderColor: "lightgray" }}>
              <Typography color={"gray"}>Full Name</Typography>
              <Typography sx={{ opacity: 0.9 }} fontWeight={600}>
                {application?.fName} {application?.lName}
              </Typography>
            </Box>
            <Box
              marginTop={1}
              padding={1}
              borderBottom={1}
              sx={{ borderColor: "lightgray" }}
            >
              <Typography sx={{ opacity: 0.9 }} color={"gray"}>
                Email address
              </Typography>
              <Typography sx={{ opacity: 0.9 }} fontWeight={600}>
                {application?.email}
              </Typography>
            </Box>
            <Box
              marginTop={1}
              padding={1}
              borderBottom={1}
              sx={{ borderColor: "lightgray" }}
            >
              <Typography color={"gray"}>Phone</Typography>
              <Typography fontWeight={600}>{application?.phone}</Typography>
            </Box>
            <Box
              marginTop={1}
              padding={1}
              borderBottom={0}
              sx={{ borderColor: "lightgray" }}
            >
              <Typography color={"gray"}>Applied Post</Typography>
              <Typography fontWeight={600}>{application?.jobTitle}</Typography>
            </Box>
          </Box>

          <Box marginTop={1.5}>
            <Box>
              <Typography color={"black"} fontSize={"18px"} fontWeight={500}>
                Screening Questions Responses
              </Typography>
            </Box>

            <Box borderRadius={1} sx={{ borderColor: "lightgray" }} padding={1}>
              {application &&
                application?.questions.map((ques, idx) => {
                  return (
                    <Box
                      key={idx}
                      marginTop={1}
                      sx={{ borderColor: "lightgray" }}
                      borderBottom={1}
                    >
                      <Typography>
                        {idx + 1}.{ques.question}
                      </Typography>
                      <Typography fontWeight={600}>{ques.answer}</Typography>
                    </Box>
                  );
                })}
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default ApplicationDetails;
