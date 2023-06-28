import { useMemo } from 'react';
import { MaterialReactTable } from 'material-react-table';
import { useSelector } from 'react-redux'
import { Box, ListItemIcon, MenuItem, ThemeProvider, createTheme } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom'
import EditIcon from '@mui/icons-material/Edit';
import LoanTable from './LoanTable'
import { useState, useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  TextField,
  Tooltip,
} from '@mui/material';
import { Edit } from '@mui/icons-material';
import axios from 'axios';

const ClientTable = () => {
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const clientData = useSelector((state) => state.clients.data);
  const [tableData, setTableData] = useState(clientData);
  const [validationErrors, setValidationErrors] = useState({});
  const [loading, setLoading] = useState(true)
  const mode = useSelector((state) => state.mode.mode)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/clients');
        const fetchedData = response.data;
        setTableData(fetchedData);
        setLoading(false)
      } catch (error) {
        console.log('Error fetching client data:', error);
      }
    };
  
    fetchData();
  }, []);

  const navigate = useNavigate()

  const handleCreateNewRow = async (values) => {
    try {
      const response = await axios.post('/clients', values);
      const createdClient = response.data;
      setTableData([...tableData, createdClient]);
      setCreateModalOpen(false);
    } catch (error) {
      console.log('Error creating client', error);
    }
  };
  

  const handleSaveRowEdits = async ({ exitEditingMode, row, values }) => {
    if (!Object.keys(validationErrors).length) {
      try {
        const updatedValues = { id: row.original._id, ...values };
  
        // Make the API request to update the client data
        await axios.put('/clients', updatedValues);
  
        // Update the local table data and exit editing mode
        const updatedTableData = [...tableData]; // Create a copy of the tableData array
        updatedTableData[row.index] = { ...row.original, ...values }; // Update the specific row with the new values, including the _id
        setTableData(updatedTableData);
        exitEditingMode(); // Required to exit editing mode and close modal
      } catch (error) {
        console.log('Error updating client data:', error);
        // Handle the error accordingly (e.g., display an error message)
      }
    }
  };
  
  const handleCancelRowEdits = () => {
    setValidationErrors({});
  };

  const badLenderChoice = ['true', 'false']
  const columns = useMemo(
    () => [
      {
        accessorKey: 'name',
        header: 'Name',
        size: 150,
        Cell: ({row}) => (
          <Link className='underline' to={`/client/${row.original._id}`}>{row.original.name}</Link>
        )
      },
      {
        accessorKey: 'idNumber',
        header: 'ID Number',
        size: 150,
      },
      {
        accessorKey: 'bank',
        header: 'Bank',
        size: 150,
      },
      {
        accessorKey: 'accNumber',
        header: 'Account Number',
        size: 150,
      },
      {
        accessorKey: 'salaryDate',
        header: 'Salary Date',
        size: 150,
      },
      {
        accessorKey: 'phone',
        header: 'Phone Number',
        size: 150,
      },
      {
        accessorKey: 'badLender',
        header: 'Bad Lender',
        size: 150,
        muiTableBodyCellEditTextFieldProps: () => ({
          children: badLenderChoice.map(choice => <MenuItem key={choice} value={choice}>
                    {choice}
                  </MenuItem>),
          select: true
        }),
        Cell: ({row}) => (
            <div>
                {row.original.badLender === true && <span 
                className='bg-red-500 p-2 rounded-lg'>Bad Lender</span>}
            </div>
        )
      },
      {
        accessorKey: 'office',
        header: 'Office',
        size: 150,
      },
      {
        accessorKey: 'address',
        header: 'Address',
        size: 100,
      },
      {
        accessorKey: 'industry',
        header: 'Industry',
        size: 150,
      },
      {
        accessorKey: 'notes',
        header: 'Notes',
        size: 150,
      },
    ],
    [],
  );

  const handleViewProfile = (id) => {
    navigate(`/client/${id}`)
  }

  const handleProfileEdit = (id) => {
    navigate(`/client/add/${id}`)
  }

  if(loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: "center", marginTop: "8rem" }}>
        <CircularProgress color="inherit"  />
      </Box>
    );
  }

  // THEMES
  const lightTheme = createTheme({
    palette: {
      primary: {
        main: '#ff9800'
      },
      background: {
        default: '#ffffef'
      },
      secondary: {
        main: '#00bcd4'
      }
    }
  });

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#81980f'
      },
      secondary: {
        main: '#00bcd4'
      }
    }
  });

  return (
    <ThemeProvider theme={mode === 'dark' ? darkTheme : lightTheme}>
      <MaterialReactTable
        displayColumnDefOptions={{
          'mrt-row-actions': {
            muiTableHeadCellProps: {
              align: 'center',
            },
            size: 120,
          },
        }}
        columns={columns}
        data={tableData}
        editingMode="modal" //default
        enableColumnOrdering
        enableEditing
        onEditingRowSave={handleSaveRowEdits}
        onEditingRowCancel={handleCancelRowEdits}
        enableColumnFilterModes
        enablePinning
        enableRowActions
        enablePagination={false}
        enableRowVirtualization
        initialState={{ showColumnFilters: false }}
        renderDetailPanel={({ row }) => (
          <Box>
            <div>
              <LoanTable id={row.original.idNumber}/>
            </div>
          </Box>
        )}
        renderRowActionMenuItems={({ closeMenu, row }) => [
          <MenuItem
            key={0}
            onClick={() => {
              handleViewProfile(row.original._id)
              closeMenu();
            }}
            sx={{ m: 0 }}
          >
            <ListItemIcon>
              <AccountCircle />
            </ListItemIcon>
            View Profile
          </MenuItem>,
          <MenuItem
            key={1}
            onClick={() => {
              handleProfileEdit(row.original._id)
              closeMenu();
            }}
            sx={{ m: 0 }}
          >
            <ListItemIcon>
              <EditIcon />
            </ListItemIcon>
            Edit
          </MenuItem>,
        ]}
        renderRowActions={({ row, table }) => (
          <Box sx={{ display: 'flex', gap: '1rem' }}>
            <Tooltip arrow placement="left" title="Edit">
              <IconButton onClick={() => table.setEditingRow(row)}>
                <Edit />
              </IconButton>
            </Tooltip>
          </Box>
        )}
        renderTopToolbarCustomActions={() => (
          <Button
            color="primary"
            onClick={() => setCreateModalOpen(true)}
            variant="contained"
          >
            Create New Client
          </Button>
        )}
      />
    
      <CreateNewAccountModal
        columns={columns}
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onSubmit={handleCreateNewRow}
      />
    </ThemeProvider>
  );
};

export const CreateNewAccountModal = ({ open, columns, onClose, onSubmit }) => {
  const [values, setValues] = useState(() =>
    columns.reduce((acc, column) => {
      acc[column.accessorKey ?? ''] = '';
      return acc;
    }, {}),
  );

  const handleSubmit = () => {
    // put your validation logic here
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
              <TextField
                key={column.accessorKey}
                label={column.header}
                name={column.accessorKey}
                onChange={(e) =>
                  setValues({ ...values, [e.target.name]: e.target.value })
                }
              />
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

export default ClientTable;
