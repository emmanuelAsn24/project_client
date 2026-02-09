import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const URL = 'http://localhost:3000'

const initialState = {
    connectedUser: null,
    profileImage: null,
    isAuthenticated: false,
    token: null,
    status: 'idle', //'idle' | 'loading' | 'success' | 'failed'?
    IsOk: false,
    message: null
}

export const authenticate = createAsyncThunk('auth/login', async (payload) => {
    const {data} = await axios.post(`${URL}/api/v1/login`, payload);
    return data
})

export const register = createAsyncThunk('auth/register',  async (payload) => {
    const {data} = await axios.post(`${URL}/api/v1/register`, payload);
    return data
})
export const logout = createAsyncThunk('auth/logout',  async (payload) => {
    const {data} = await axios.post(`${URL}/api/v1/logout`, payload);
    return data
})

const authSlice = createSlice({
    name : 'auth',
    initialState ,
    reducers : {
        setStatusToIdle : (state)=> {
            state.status = 'idle'
        },
        initState: (state) => {
            state.connectedUser = null;
            state.isAuthenticated = false;
            state.status = 'idle';
            state.message = null;
            state.IsOk=false;
            state.token = null;
        }
    },
    extraReducers(builder) {
        builder.addCase(authenticate.pending, (state) => {
            state.status = 'loading'
        })
        .addCase(authenticate.fulfilled, (state, action) => {
            const {data: {user, accessToken}} = action.payload
            console.log('action.payload dans authSlice:', action.payload);
            localStorage.setItem('token', accessToken)
            state.connectedUser = user;
            state.isAuthenticated = true;
            state.status = 'success';
            state.message = null;
            state.IsOk=true;
            state.token = accessToken;
        })
        .addCase(authenticate.rejected, (state) =>{
            state.status = 'failed';
            state.message = 'email ou password invalide';
            state.isAuthenticated = false;
            state.token = null;
            state.connectedUser = null;
        }).addCase(register.pending, (state) => { state.status = 'loading' })
        
        .addCase(register.fulfilled, (state, action) => {
            state.status = 'success';
            state.message =  action.payload.message //'Processus de création de compte initié avec success. '
        })
        .addCase(register.rejected, (state, action) => {
            state.status = 'failed';
            state.message = action.error.message
        })
    }
})
 
export const isAuthenticated = (state) => state.authReducer.isAuthenticated;
export const connectedUser = (state) => state.authReducer.connectedUser;
export const token = (state) => state.authReducer.token;
export const getState = (state) => state.authReducer;


export const {initState, setStatusToIdle} = authSlice.actions

export default authSlice.reducer