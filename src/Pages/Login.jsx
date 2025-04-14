import React from 'react'
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup"
import { Button, TextField, Typography } from '@mui/material';
//import { useNavigate } from 'react-router-dom';
import SpaIcon from '@mui/icons-material/Spa';
import APIService from '../Services/Services'
import { useDispatch } from 'react-redux';
import { setAuth } from '../reducers/authReducer';

const schema = yup.object().shape({
  username:yup.string().trim().required("Must enter the username"), 
  password:yup.string().trim().required("Must enter the password"), 
})

const defaultValues = {
username:"",
password:"",
}

export default function Login() {
  //const navigate = useNavigate();
  const dispatch  = useDispatch();
    const {control, handleSubmit , formState:{errors}} = useForm({
      mode:"onChange",
      defaultValues,
      resolver:yupResolver(schema)
    })

  const onSubmit = async(data) =>{
    console.log("data",data)

    APIService.LoginAPI({email:data?.username,password:data?.password})
       .then((response)=>{
        console.log("response",response);
        localStorage.setItem('token', JSON.stringify({token:response.token}));
        dispatch(setAuth(true))
        //navigate('/')
       })
       .catch((err)=>{
        console.log("err",err);
       })
      // try {
      //     const response = await axiosInstance.post("/login",{email:"vijay@gmail.com",password:"123"}).then((r)=>[
      //       console.log("r",r)
      //     ]);
      //     console.log("res",response)
      //     localStorage.setItem('auth', JSON.stringify());
        
      // } catch (error) {
      //     console.error("Failed to fetch products:", error);
      //     throw error;
      // }
 

    
    
  }

  return (
    <div className='h-screen w-screen flex justify-center items-center p-[30px]'>
     <div className=' bg-gray-200 h-[500px] w-[500px] flex flex-col justify-center items-center p-6 md:p-12 rounded-md'>
      <div className='flex justify-center mb-12'>
      <SpaIcon sx={{fontSize:"54px"}}/>
      </div>
      <Typography variant='h6' sx={{marginBottom:"20px"}} >SIGN IN</Typography>
     <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <Controller
        name='username'
        control={control}
        render={({field})=>(
           <TextField
           {...field}
           label="Username"
           className='w-full'
           error={!!errors?.username}
           helperText={errors?.username?.message}
           sx={{marginBottom:"24px"}}
          
           />
        )}
        />
        <Controller
        name='password'
        control={control}
        render={({field})=>(
           <TextField
          {...field}
           label="Password"
           error={!!errors?.password}
           helperText={errors?.password?.message}
           className='w-full mt-24'
           sx={{marginBottom:"24px"}}
           />
        )}
        />
        <div className='flex justify-center'>
        <Button variant='contained' type='submit'>Submit</Button>
        </div>
       
      </form>
     </div>
     
      </div>
  )
}
