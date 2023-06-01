import { createSlice } from "@reduxjs/toolkit"; 

const initialState={
    admin:null,
    employers:null,
    users:null,
    applications:null,
    posts:null,
    application:null,
    post:null
}
const adminSlice=createSlice({
    name:'admin',
    initialState,
    reducers:{
        setAdminData:(state,action)=>{
            state.admin=action.payload
        },
        setEmployers:(state,action)=>{
            state.employers=action.payload
        },
        setUsers:(state,action)=>{
            state.users=action.payload
        },
        setPosts:(state,action)=>{
            state.posts=action.payload
        },
        setApplications:(state,action)=>{
            state.applications=action.payload
        },
        setApplication:(state,action)=>{
            state.application=action.payload
        },
        setPost:(state,action)=>{
            state.post=action.payload
        }
    }
})

export default adminSlice.reducer
export const{setAdminData,setApplications,setEmployers,setPosts,setUsers,setPost,setApplication}=adminSlice.actions