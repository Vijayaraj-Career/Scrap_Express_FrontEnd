import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Card, CardContent, Grid, TextField } from '@mui/material'
import * as yup from "yup";
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
const schema = yup.object().shape({
    username: yup.string().trim().required("Enter the Username"),
    email: yup.string().trim().required("Enter the email"),
    message: yup.string().trim().required("Enter the message"),

})

const defaultValues = {
    username: "",
    email: "",
    message: ""
}

function Contact() {

    const { handleSubmit, control, formState } = useForm({
        mode: "onChange",
        defaultValues,
        resolver: yupResolver(schema),
    })

    const { errors } = formState;

    const onSubmit = (data) => {
        console.log("data", data);

    }

    return (
        <div className='flex flex-col justify-center items-center w-full h-auto bg-gray-200 p-12 pt-32'>
            <h1 className='flex w-full justify-center items-center text-[40px]  font-semibold mb-10'>Contact</h1>
            <Grid container spacing={2}>
                <Grid size={{ xs: 12, md: 6 }}>
                    <Card>
                        <CardContent>
                            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31096.16554175568!2d80.14939074179826!3d13.034354196757338!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a526120c7c7b1db%3A0x2fafe53b7fc87c97!2sArumugam%20Nagar%2C%20Lakshmi%20Nagar%2C%20Porur%2C%20Chennai%2C%20Tamil%20Nadu%20600087!5e0!3m2!1sen!2sin!4v1729789045482!5m2!1sen!2sin" className='h-[400px] w-full' style={{ border: "0px" }} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                        </CardContent>
                    </Card>

                </Grid>
                <Grid size={{ xs: 12, md: 6 }} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <Card>
                        <CardContent>
                            <form noValidate onSubmit={handleSubmit(onSubmit)} className='flex flex-col justify-center items-center p-5 h-auto w-[500px] '>
                                <Controller
                                    name='username'
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            className='mb-6'
                                            label="Username"
                                            sx={{ marginBottom: "20px" }}
                                            fullWidth
                                            error={!!errors?.username}
                                            helperText={errors?.username?.message}
                                        />
                                    )}
                                />
                                <Controller
                                    name='email'
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            label="Email"
                                            sx={{ marginBottom: "20px" }}
                                            fullWidth
                                            error={!!errors?.email}
                                            helperText={errors?.email?.message}
                                        />
                                    )}
                                />
                                <Controller
                                    name='message'
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            label="Message"
                                            className='mb-6'
                                            fullWidth
                                            rows={4}
                                            multiline
                                            error={!!errors?.message}
                                            helperText={errors?.message?.message}
                                        />
                                    )}
                                />
                                <Button sx={{ marginTop: "20px" }} variant='contained' type='submit'>Submit</Button>




                            </form>
                        </CardContent>
                    </Card>

                </Grid>
            </Grid>

        </div>
    )
}

export default Contact