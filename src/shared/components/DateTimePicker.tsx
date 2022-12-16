import {
  Box,
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import moment, { Moment } from 'moment';
import { useEffect, useState } from 'react';

import { getTimeslotsInADay } from '../utils';

const DateTimePicker = ({
  label,
  onChangeDate,
}: {
  label: string;
  onChangeDate: (value: Moment) => void;
}) => {
  const timeslots = getTimeslotsInADay();

  const [date, setDate] = useState(moment());
  const [time, setTime] = useState(timeslots[0]);

  useEffect(() => {
    const timeArray = time.split(':');

    const newDate = date.clone().set({
      hour: Number(timeArray[0]),
      minute: Number(timeArray[1]),
    });

    onChangeDate(newDate);
  }, [date, time]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, flex: 1 }}>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <DatePicker
          renderInput={(props) => <TextField {...props} fullWidth />}
          label={label}
          value={date}
          minDate={moment()}
          onChange={(newValue) => {
            newValue && setDate(newValue);
          }}
        />
      </LocalizationProvider>
      <FormControl fullWidth>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={time}
          onChange={(event: SelectChangeEvent) => {
            const newValue = event.target.value;
            setTime(newValue);

            return newValue;
          }}
        >
          {timeslots.map((timeslot, index) => (
            <MenuItem value={timeslot} key={index}>
              {timeslot}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default DateTimePicker;
