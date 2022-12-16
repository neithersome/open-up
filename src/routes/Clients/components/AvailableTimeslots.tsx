import {
  Alert,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from '@mui/material';
import moment, { Moment } from 'moment';
import { useEffect, useState } from 'react';
import { useRevalidator } from 'react-router-dom';
import { bookTimeslot, getTimeslots } from '../../../shared/api';
import { Timeslot } from '../../../shared/types';
import {
  findFreeTimeslotsOnDate,
  getTimeslotTime,
} from '../../../shared/utils';
import { Client } from '../Client';

const AvailableTimeslots = ({
  date,
  clientId,
}: {
  date: Moment | null;
  clientId: Client['id'];
}) => {
  const availableTimeslots = useAvailableTimeslots();

  useEffect(() => {
    if (date) {
      getTimeslots().then((timeslots: Timeslot[]) => {
        const filteredOnDate = findFreeTimeslotsOnDate(timeslots, date);
        availableTimeslots.setTimeslots(filteredOnDate);
      });
    }
  }, [date]);

  if (!availableTimeslots.timeslots.length)
    return <Alert color="info">No available timeslots for this day</Alert>;

  return (
    <>
      {availableTimeslots.timeslots.map((timeslot: Timeslot) => {
        const { startDateTime, endDateTime, id } = timeslot;

        return (
          <Chip
            label={`${getTimeslotTime(
              moment(startDateTime),
              moment(endDateTime)
            )}`}
            onClick={() => availableTimeslots.handleBooking(id, clientId)}
            sx={{ m: 1 }}
          />
        );
      })}
      <ConfirmationDialog
        timeslot={availableTimeslots.selectedTimeslot}
        isOpen={availableTimeslots.isDialogOpen}
        onClose={() => availableTimeslots.setIsDialogOpen(false)}
      />
    </>
  );
};

export default AvailableTimeslots;

const useAvailableTimeslots = () => {
  const revalidator = useRevalidator();
  const [timeslots, setTimeslots] = useState<Timeslot[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedTimeslot, setSelectedTimeslot] = useState<
    Timeslot | undefined
  >();

  const handleBooking = (id: Timeslot['id'], clientId: Client['id']) => {
    bookTimeslot(id, clientId)
      .then(() => {
        revalidator.revalidate();

        const selectedTimeslot: Timeslot | undefined = timeslots.find(
          (timeslot: Timeslot) => timeslot.id === id
        );

        if (selectedTimeslot) {
          setSelectedTimeslot(selectedTimeslot);
          setIsDialogOpen(true);
        } else {
          console.error('Could not find timeslot with id: ', id);
        }
      })
      .catch((e) => new Error('could not book'));
  };

  return {
    timeslots,
    setTimeslots,
    isDialogOpen,
    setIsDialogOpen,
    selectedTimeslot,
    handleBooking,
  };
};

const ConfirmationDialog = ({
  timeslot,
  isOpen,
  onClose,
}: {
  timeslot: Timeslot | undefined;
  isOpen: boolean;
  onClose: () => void;
}) => (
  <Dialog open={isOpen} onClose={onClose}>
    <>
      <DialogTitle>Booking Confirmed</DialogTitle>
      <DialogContent>
        <DialogContentText>
          <Typography>{`Psychologist: ${timeslot?.psychologistId}`}</Typography>
          <Typography>{`Time: ${moment(timeslot?.startDateTime).format(
            'HH:MM'
          )}`}</Typography>
          <Typography>{`Date: ${moment(timeslot?.startDateTime).format(
            'MMMM Do YYYY HH:mm'
          )}`}</Typography>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </>
  </Dialog>
);
