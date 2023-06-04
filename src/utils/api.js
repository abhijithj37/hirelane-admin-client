import { useEffect, useState } from "react";
import axios from "./axios";
import { useDispatch, useSelector } from "react-redux";
import {
  setApplications,
  setEmployers,
  setPosts,
  setUsers,
} from "../app/features/adminSlice";
import { useSocket } from "../Context/SocketProvider";
 
export const useGetEmployers = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    axios
      .get("/employers", { withCredentials: true })
      .then(({ data }) => {
        console.log("dafdafdadafadf");
        dispatch(setEmployers(data));
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [dispatch]);
};

export const useGetUsers = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    axios
      .get("/users", { withCredentials: true })
      .then(({ data }) => {
        dispatch(setUsers(data));
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [dispatch]);
};

export const useGetPosts = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    axios
      .get("/job-posts", { withCredentials: true })
      .then(({ data }) => {
        console.log(data, "posts");
        dispatch(setPosts(data));
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [dispatch]);
};

export const useGetApplications = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    axios
      .get("/get-applications", { withCredentials: true })
      .then(({ data }) => {
        console.log(data, "applications");
        dispatch(setApplications(data));
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [dispatch]);
};

export const useGetApplicationsByMonth = () => {
  const [barChartData, setBarChartData] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get("/monthly-applications", {
          withCredentials: true,
        });
        setBarChartData(data);
      } catch (error) {
        console.log(error.message);
      }
    })();
  }, []);
  return { barChartData };
};

export const useGetPostsByMonth = () => {
  const [lineChartData, setLineChartData] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get("/monthly-posts", {
          withCredentials: true,
        });
        setLineChartData(data);
      } catch (error) {
        console.log(error.message);
      }
    })();
  }, []);

  return {lineChartData}
};

export const useConnectUser=()=>{
  const socket=useSocket()
  const {admin}=useSelector((state)=>state.admin)
  useEffect(()=>{
    if(admin){
      socket?.emit("connect-user",admin?._id)
    }
   },[admin?._id,admin,socket])
  
}

  
export const handleSendNotification=(data,socket)=>{
 axios.post('/send-notification',data,{withCredentials:true}).then(({data})=>{
  socket?.emit('send-notification',data)
}).catch((err)=>{
console.log(err.message)
})

}

