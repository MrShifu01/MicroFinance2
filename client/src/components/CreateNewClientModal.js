import { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from '@mui/material';

export const CreateNewClientModal = ({ open, columns, onClose, onSubmit }) => {
    const [values, setValues] = useState(() =>
      columns.reduce((acc, column) => {
        acc[column.accessorKey ?? ''] = '';
        return acc;
      }, {}),
    );
  
    const handleSubmit = () => {
      onSubmit(values);
      onClose();
    };
  
    return (
      <Dialog open={open}>
        <DialogTitle textAlign="center">Create New Account</DialogTitle>
        <DialogContent>
          <form onSubmit={(e) => e.preventDefault()}>
          <Stack
            sx={{
              width: '100%',
              minWidth: { xs: '300px', sm: '360px', md: '400px' },
              gap: '1.5rem',
            }}
          >
            {columns.map((column) => (
              column.accessorKey !== 'badLender' && (
                <TextField
                  variant='standard'
                  key={column.accessorKey}
                  label={column.header}
                  name={column.accessorKey}
                  onChange={(e) =>
                    setValues({
                      ...values,
                      [e.target.name]: e.target.value,
                    })
                  }
                />
              )
            ))}
  
          </Stack>
  
  
  
          </form>
        </DialogContent>
        <DialogActions sx={{ p: '1.25rem' }}>
          <Button onClick={onClose}>Cancel</Button>
          <Button color="primary" onClick={handleSubmit} variant="contained">
            Create New Account
          </Button>
        </DialogActions>
      </Dialog>
    );
  };