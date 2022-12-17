import { useEffect, useState } from 'react';
import { Client } from '../routes/Clients/Client';
import { Psychologist } from '../routes/Psychologists/Psychologist';
import { openUpBackend } from './api';

const useFetchPerson = (path: string, id: number | string | undefined) => {
  const [person, setPerson] = useState<
    Client | Psychologist | { name: 'Unknown' }
  >();

  useEffect(() => {
    if (id || id === 0) {
      openUpBackend
        .get(`${path}/${id}`)
        .then((res) => {
          const person: Client | Psychologist = res.data;
          setPerson(person);
        })
        .catch(() => setPerson({ name: 'Unknown' }));
    }
  }, [id]);

  return person;
};

export default useFetchPerson;
