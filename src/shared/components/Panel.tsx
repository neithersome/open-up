import { Divider, Paper, PaperProps, Typography } from '@mui/material';
import { FC } from 'react';

interface iPanel extends PaperProps {
  title?: string;
  children: any;
}

const Panel: FC<iPanel> = ({ title, children, ...paperProps }) => {
  return (
    <Paper {...paperProps} sx={{ ...paperProps.sx, overflow: 'auto' }}>
      {title && (
        <>
          <Typography variant="h6">{title}</Typography>
          <Divider sx={{ my: 1 }} />
        </>
      )}
      {children}
    </Paper>
  );
};

export default Panel;
