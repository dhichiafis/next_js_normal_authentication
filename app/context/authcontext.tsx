'use client';

import {createContext,useContext,useEffect,useState} from 'react';
import axios from 'axios';

interface AuthState{
    authenticated:boolean,
    token:string 
}
interface LoginCredentials{
    username:string,
    password:string 
}

interface AuthContextType{
    authState:AuthState,
    login:(login:LoginCredentials)=>Promise<void>;
    logout:()=>void;
}

const AuthContext=createContext<AuthContextType|undefined>(undefined);

export function useAuth(){
    const context=useContext(AuthContext);
    return context;
}

export default function AuthProvider({children}:{children:React.ReactNode}){
    const [authState,setAuthState]=useState<AuthState>({
        authenticated:false,
        token:''
    });
    useEffect(()=>{
        const loadToken=async () =>{
            const token =localStorage.getItem('token');
            if(token){
                setAuthState({authenticated:true,token:token});
                axios.defaults.headers.common['Authorization']=`Bearer ${token}`;

            }
        }
        loadToken();
    },[])
    async function login({username,password}:LoginCredentials){
        const formData=new URLSearchParams();
        formData.append('username',username);
        formData.append('password',password);
        try{
            const response=await axios.post(
                "http://localhost:8000/users/token",
            formData,
            {
                headers:{
                    "Content-Type":"application/x-www-form-urlencoded"
                }
            }
            );
            setAuthState({
                authenticated:true,
                token:response.data.access_token,

            });
            console.log('we are retrieving the token');
            const token =response.data.access_token;
            axios.defaults.headers.common['Authorization']=`Bearer ${token}`;
            console.log('token is available now in the headers');
            console.log(`token is ${token}`);
            localStorage.setItem('token',token);
            //return response;
        }catch(error){
            console.log(error);
        }
    }

    async function logout(){
        delete axios.defaults.headers.common['Authorization'];
        await localStorage.removeItem('token');
        setAuthState({
            authenticated:false,
            token:''
        });
    }
   // useEffect(()=>{
     //   async function fetchUser(){
       //     const token =localStorage.getItem('token');
         //   const response =await axios.get(
           //     'http://localhost:8000/users/me',
             //   {
               //     headers:{
                 //       'Authorization':`Bearer ${token}`
           //         }
         //       }
       //     );
     //       console.log(response.data);
        
     //   }
     //   fetchUser()
   // },[authState.token])   
    return (<AuthContext.Provider value={{authState,login,logout}}>
        {children}
        </AuthContext.Provider>);
}