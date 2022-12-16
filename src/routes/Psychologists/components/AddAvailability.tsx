import { Alert, Box, Button, Stack } from '@mui/material';
import { DateRange } from 'moment-range';
import { useEffect, useState } from 'react';
import { getTimeslotsFromRange } from '../../../shared/utils';

import { useRevalidator } from 'react-router-dom';
import { createTimeslot } from '../../../shared/api';
import RangePicker from '../../../shared/components/RangePicker';
import { Timeslot } from '../../../shared/types';
import { Psychologist } from '../Psychologist';

enum TimePickerErrorMessage {
  START_BEFORE_END = 'Start date has to be before the end date',
  CANT_BE_EQUAL = 'Start and End dates can not be same',
}

const AddAvailability = ({
  psychologistId,
}: {
  psychologistId: Psychologist['id'];
}) => {
  const availability = useAddAvailability();

  return (
    <Stack sx={{ my: 5 }} spacing={3}>
      <Box sx={{ display: 'flex', gap: 5 }}>
        <RangePicker
          onChange={(dateRange: DateRange) =>
            availability.setDateRange(dateRange)
          }
        />
      </Box>
      {availability.validationError && (
        <Alert color="error">{availability.validationError}</Alert>
      )}
      <Box sx={{ display: 'flex', flex: 1, justifyContent: 'end' }}>
        <Button
          variant="outlined"
          onClick={() => availability.handleSubmit(psychologistId)}
          disabled={Boolean(availability.validationError)}
        >
          Add
        </Button>
      </Box>
    </Stack>
  );
};

export default AddAvailability;

const useAddAvailability = () => {
  const revalidator = useRevalidator();
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [validationError, setValidationError] =
    useState<TimePickerErrorMessage | null>(null);

  const handleSubmit = (psychologistId: Psychologist['id']) => {
    if (dateRange) {
      const timeslots = getTimeslotsFromRange(dateRange, psychologistId);

      const createTimeslotsRequests = timeslots.map((timeslot: Timeslot) =>
        createTimeslot(timeslot)
      );

      Promise.all(createTimeslotsRequests)
        .then(() => {
          revalidator.revalidate();
        })
        .catch((e) => new Error('Could not create timeslots'));
    }
  };

  const validateRange = () => {
    if (!dateRange) return;

    setValidationError(null);
    const dateRangeDiff = dateRange.diff('minutes');
    if (dateRangeDiff < 0)
      setValidationError(TimePickerErrorMessage.START_BEFORE_END);
    if (dateRangeDiff === 0)
      setValidationError(TimePickerErrorMessage.CANT_BE_EQUAL);
  };

  useEffect(() => {
    validateRange();
  }, [dateRange]);

  return {
    dateRange,
    setDateRange,
    handleSubmit,
    validationError,
  };
};
