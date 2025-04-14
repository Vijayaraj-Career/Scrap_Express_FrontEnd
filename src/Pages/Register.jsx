import React from 'react'
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup"
import { Button, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';



const schema = yup.object().shape({
  email:yup.string().trim().required("Must enter the email"), 
  username:yup.string().trim().required("Must enter the username"), 
  password:yup.string().trim().required("Must enter the password"), 
})



const defaultValues = {
email:"",
username:"",
password:"",
}

export default function Register() {
  const navigate = useNavigate();

    const {control, handleSubmit , formState:{errors}, reset} = useForm({
      mode:"onChange",
      defaultValues,
      resolver:yupResolver(schema)
    })

  const onSubmit = (data) =>{
    console.log("data",data)

    localStorage.setItem("auth", JSON.stringify({user:data.username, pass:data.password}))
    navigate('/home')
    reset(defaultValues);
  }

  return (
    <div className='h-screen w-screen flex justify-center items-center'>
     <div className=' bg-gray-200 h-[500px] w-[500px] flex flex-col justify-center items-center p-12'>
     <form noValidate onSubmit={handleSubmit(onSubmit)}>
     <Controller
        name='email'
        control={control}
        render={({field})=>(
           <TextField
           {...field}
           label="Email"
           className='w-full'
           error={!!errors?.email}
           helperText={errors?.email?.message}
           sx={{marginBottom:"24px"}}
          
           />
        )}
        />
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
