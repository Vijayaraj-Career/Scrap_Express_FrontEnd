import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import {
  DesktopDatePicker,
  DesktopDateTimePicker,
  MobileDatePicker,
  MobileDateTimePicker,
} from '@mui/x-date-pickers';
//import { Hidden } from '@mui/material';

import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const DatePicker = ({
  className,
  disableFuture,
  disablePast,
  error,
  helperText,
  field: { value, ...field },
  required,
  disabled,
  label,
  views,
  inputFormat,
  openTo,
  dateTime,
  dateProps,
  size,
}) => {

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const pickerProps = {
    ...field,
    ...dateProps,
    value: value && new Date(value),
    label,
    disabled,
    disablePast,
    disableFuture,
    closeOnSelect: false,
    openTo: openTo || 'day',
    format: inputFormat || (dateTime ? 'dd/MM/yy hh:mm aa' : 'dd/MM/yy'),
    views:
      views || (dateTime ? ['year', 'month', 'day', 'hours', 'minutes'] : ['year', 'month', 'day']),
  };

  const props = {
    ...pickerProps,
    slotProps: {
      textField: { error, helperText, required, fullWidth: true, size: size && size },
      popper: { sx: { zIndex: 10000 } },
      actionBar: { actions: ['clear', 'accept'] },
    },
  };



  return (
    <div className={className}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
      {isMobile ? (
          dateTime ? (
            <MobileDateTimePicker {...props} />
          ) : (
            <MobileDatePicker {...props} />
          )
        ) : dateTime ? (
          <DesktopDateTimePicker {...props} />
        ) : (
          <DesktopDatePicker {...props} />
        )}
      </LocalizationProvider>
    </div>
  );
};

export default DatePicker;