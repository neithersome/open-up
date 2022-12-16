import { Moment } from 'moment';
import { DateRange } from 'moment-range';
import { useEffect, useState } from 'react';

import { moment } from '../utils';
import DateTimePicker from './DateTimePicker';

const RangePicker = ({
  onChange,
}: {
  onChange: (newDateRange: DateRange) => void;
}) => {
  const [start, setStart] = useState<Moment | undefined>();
  const [end, setEnd] = useState<Moment | undefined>();

  useEffect(() => {
    if (start && end) onChange(moment.range(start, end));
  }, [start, end]);

  return (
    <>
      <DateTimePicker
        label="Start"
        onChangeDate={(newDate: Moment) => {
          setStart(newDate);
        }}
      />
      <DateTimePicker
        label="End"
        onChangeDate={(newDate: Moment) => {
          setEnd(newDate);
        }}
      />
    </>
  );
};

export default RangePicker;
