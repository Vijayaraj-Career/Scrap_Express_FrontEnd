import React from 'react'
import StaticTable, { chaHeader } from '../Components/StaticTable';
import { Button, Grid, TextField, Typography } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup"
import DatePicker from '../Components/DatePicker';

const schema = yup.object().shape({
  customerName: yup.string().trim().required("Must enter the Customer Name"),
  date: yup
    .date()
    .nullable()
    .required('You must Select from Date')
    .typeError('You must enter a valid date')
    .max(new Date(), 'Future dates are not allowed'),
  contact: yup.string().trim().required("Must enter the Contact Number"),
  address: yup.string().trim().required("Must enter the Address"),
})

const defaultValues = {
  customerName: "",
  fromDate: null,
  contact: "",
  address:""
}

const headers = [
  chaHeader('SI_NO', 'SI.No', null, '60px'),
  chaHeader('SB_JOB_DT', 'Date', null, '90px'),
  chaHeader('SB_NO', 'Customer Name', null),
  chaHeader('SB_DT', 'Customer Contact', null),
  chaHeader('SB_TRANS_MODE_CODE', 'Address', null, '70px'),
  chaHeader('Action', 'Action', null, '90px'),
];

export default function Customer() {
  const { control, handleSubmit, formState: { errors } } = useForm({
    mode: "onChange",
    defaultValues,
    resolver: yupResolver(schema)
  })

  const onSubmit = (data) => {
    console.log("e", data);
  }
  return (
    <div>
      <Typography sx={{fontSize:25, marginBottom:"20px"}}>Customer</Typography>
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Controller
              name='customerName'
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Customer Name"
                  className='w-full'
                  error={!!errors?.customerName}
                  helperText={errors?.customerName?.message}
                />
              )}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Controller
              name="date"
              control={control}
              label="date"
              render={({ field }) => (
                <DatePicker
                  field={field}
                  required
                  // disableFuture
                  className=""
                  label="Date"
                  error={!!errors.date}
                  helperText={errors.date?.message}
                />
              )}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Controller
              name='contact'
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Contact Number"
                  className='w-full'
                  error={!!errors?.contact}
                  helperText={errors?.contact?.message}
                  inputProps={{maxLength:10}}
                />
              )}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 8 }}>
            <Controller
              name='address'
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Address"
                  className='w-full'
                  error={!!errors?.address}
                  helperText={errors?.address?.message}
                  multiline
                  rows={1}
                />
              )}
            />
          </Grid>
          <Grid size={{xs: 12, md: 4 }}>
            <div className='flex items-center justify-end'>
            <Button type='submit' variant='contained'>Save</Button>
            </div>
          
          </Grid>

        </Grid>
      </form>
      <StaticTable
        tableProps={{ className: 'rounded-sm max-h-[470px] mt-12' }}
        headers={headers}
        // hidePagination
        hideFilters
        hideFooter
        size={15}
        options={[15, 30, 45]}
        // colSpan={9}
        // total={['SBI_TOTAL_PMV', 'SBI_ITEM_AMOUNT']}
        // rowColorChange={rowColorChange}
        // setRowColorChange={setRowColorChange}
        // checkboxSelection
        // selectionModel={[]}
        fixedColumnBegin={2}
        fixedLeft={[0, 60, 150]}
        columns={headers}
        //   rows={rows?.map((data, i) => ({
        //     ...data,
        //     id: i,
        //     Action: (
        //       <>
        //         <div className="flex items-center justify-evenly p-3">
        //           <Tooltip title="Check List">
        //             <IconButton
        //               className="text-blue-600"
        //               style={{ position: 'unset' }}
        //               onClick={() => handleClickCheckList(i)}
        //               sx={{ height: '16px', width: '16px' }}
        //             >
        //               <ReceiptLongTwoToneIcon style={{ fontSize: '20px' }} />
        //             </IconButton>
        //           </Tooltip>

        //           <Tooltip title="Flat File">
        //             <IconButton
        //               className="text-red-600"
        //               style={{ position: 'unset' }}
        //               sx={{ height: '16px', width: '16px' }}
        //               onClick={() => handleClickFlatFile(i)}
        //             >
        //               <DescriptionRoundedIcon style={{ fontSize: '20px' }} />
        //             </IconButton>
        //           </Tooltip>

        //           <Tooltip title="copy">
        //             <IconButton
        //               className="text-black"
        //               style={{ position: 'unset' }}
        //               sx={{ height: '16px', width: '16px' }}
        //               onClick={() => handleClickcopy(data)}
        //             >
        //               <FileCopyIcon style={{ fontSize: '20px' }} />
        //             </IconButton>
        //           </Tooltip>

        //           {/* <IconButton
        //             color="primary"
        //             style={{ position: 'unset' }}
        //             sx={{ height: '16px', width: '16px' }}
        //           >
        //             <LocalPrintshopRoundedIcon style={{ fontSize: '20px' }} />
        //           </IconButton> */}
        //         </div>
        //       </>
        //     ),
        //     SB_JOB_NO: (
        //       <>
        //         <Typography
        //           className="text-blue-600 underline decoration-1 flex justify-center items-center"
        //           role="button"
        //           onClick={() => handleClick(i)}
        //         >
        //           {data.SB_JOB_NO}
        //         </Typography>
        //       </>
        //     ),
        //     SB_NO: (
        //       <>
        //         <Typography
        //           onClick={() => {
        //             window.open('https://enquiry.icegate.gov.in/enquiryatices/sbTrack');
        //           }}
        //           role="button"
        //           className="text-blue-600 underline decoration-1 flex justify-center items-center"
        //         >
        //           {data.SB_NO}
        //         </Typography>
        //       </>
        //     ),
        //   }))}
        rows={[]}
      />

    </div>
  )
}
