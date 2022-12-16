import axios from 'axios';
import { Client } from '../routes/Clients/Client';
import { Timeslot } from './types';

export const openUpBackend = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 1000,
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
});

export const getPsychologistList = () =>
  openUpBackend.get('/psychologists').then((res) => res.data);

export const getPsychologists = (id?: string, embedTimeslots?: boolean) =>
  openUpBackend
    .get(`/psychologists/${id}`, {
      params: {
        ...(embedTimeslots && { _embed: 'timeslots' }),
      },
    })
    .then((res) => res.data);

export const getClientList = () =>
  openUpBackend.get('/clients').then((res) => res.data);

export const getClient = (id: string, embedTimeslots?: boolean) =>
  openUpBackend
    .get(`/clients/${id}`, {
      params: {
        ...(embedTimeslots && { _embed: 'timeslots' }),
      },
    })
    .then((res) => res.data);

export const getTimeslots = () =>
  openUpBackend('/timeslots').then((res) => res.data);

export const createTimeslot = (timeslot: Timeslot) =>
  openUpBackend.post(`/timeslots`, timeslot);

export const bookTimeslot = (
  timeslotId: Timeslot['id'],
  clientId: Client['id']
) => openUpBackend.patch(`/timeslots/${timeslotId}`, { clientId });
