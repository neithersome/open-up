import {
  getClient,
  getClientList,
  getPsychologistList,
  getPsychologists,
} from '../shared/api';
import Clients from './Clients';
import Client from './Clients/Client';
import Error from './Error';
import Psychologists from './Psychologists';
import Psychologist from './Psychologists/Psychologist';
import Root from './Root';

export const routes = [
  {
    path: '/',
    element: <Root />,
    errorElement: <Error />,
    children: [
      {
        path: '/clients',
        element: <Clients />,
        loader: async () => getClientList(),
      },
      {
        path: '/clients/:id',
        element: <Client />,
        loader: async ({ params }: any) =>
          getClient(params?.id as string, true),
      },
      {
        path: '/psychologists',
        element: <Psychologists />,
        loader: async () => getPsychologistList(),
      },
      {
        path: '/psychologists/:id',
        element: <Psychologist />,
        loader: async ({ params }: any) =>
          getPsychologists(params?.id as string, true),
      },
    ],
  },
];
