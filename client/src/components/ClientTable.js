import { useMemo } from 'react';
import { MaterialReactTable } from 'material-react-table';
import { useSelector, useDispatch } from 'react-redux'
import { Box, MenuItem } from '@mui/material';
import { Link } from 'react-router-dom'
import LoanTable from './LoanTable'
import { useState, useEffect } from 'react';
import { CreateNewClientModal } from './CreateNewClientModal';
import LoadingSpinner from './LoadingSpinner'
import {
  Button,
  IconButton,
  Tooltip,
} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import axios from 'axios';
import { setClients } from '../redux/clientsSlice';

const ClientTable = () => {
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const clientData = useSelector((state) => state.clients.data);
  const user = useSelector((state) => state.user.data)
  const [tableData, setTableData] = useState(clientData);
  const [validationErrors, setValidationErrors] = useState({});
  const [loading, setLoading] = useState(true)
  const columnSetting = useSelector((state) => state.settings.column)
  const paginationSetting = useSelector((state) => state.settings.pagination)
  const deleteSetting = useSelector((state) => state.settings.delete)
  const badLenderChoice = ['true', 'false']
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/clients');
        const fetchedData = response.data;
        dispatch(setClients(fetchedData))
        setTableData(fetchedData);
        setLoading(false)
      } catch (error) {
        console.log('Error fetching client data:', error);
      }
    };
  
    fetchData();
  }, []);

  const handleCreateNewRow = async (values) => {
    if (!user.isAdmin) {
      // Show alert if user is not admin
      alert('You do not have authorization to create a new client.')
      return;
    }
  
    const modifiedValues = { ...values, badLender: false };
  
    try {
      const response = await axios.post('/clients', modifiedValues);
      const createdClient = response.data;
      setTableData([...tableData, createdClient]);
      setCreateModalOpen(false);
    } catch (error) {
      console.log('Error creating client', error);
    }
  };
  
  const handleSaveRowEdits = async ({ exitEditingMode, row, values }) => {
    if (!Object.keys(validationErrors).length) {
      if (!user.isAdmin) {
        // Show alert if user is not admin
        alert('You do not have authorization to edit a client.')
        return;
      }
      
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

  const handleDeleteClient = async (clientId) => {
    
    if (!user.isAdmin) {
      // Show alert if user is not admin
      alert('You do not have authorization to delete a client.')
      return;
    }

    const confirmDelete = window.confirm('Are you sure you want to delete this client?');
    if (!confirmDelete) {
      return; // User canceled the deletion
    }
  
    try {
      await axios.delete(`/clients/${clientId}`);
      const updatedTableData = tableData.filter(client => client._id !== clientId);
      setTableData(updatedTableData);
    } catch (error) {
      console.log('Error deleting client:', error);
    }
  };


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
        type: "boolean",
        muiTableBodyCellEditTextFieldProps: () => ({
          children: badLenderChoice.map(choice => (
            <MenuItem key={choice} value={choice}>
              {choice}
            </MenuItem>
          )),
          select: true
        }),
        Cell: ({ row }) => (
          <div>
            {row.original.badLender && (
              <span className='bg-red-500 p-2 rounded-lg'>Bad Lender</span>
            )}
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
  );

  if(loading) {
    return (
      <LoadingSpinner/>
    );
  }

  return (
    <>
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
        editingMode="modal"
        enableColumnOrdering={columnSetting}
        enablePagination={paginationSetting}
        enableEditing
        onEditingRowSave={handleSaveRowEdits}
        onEditingRowCancel={handleCancelRowEdits}
        enableColumnFilterModes
        enablePinning
        enableRowVirtualization
        initialState={{ showColumnFilters: false }}
        renderDetailPanel={({ row }) => (
          <Box>
            <div>
              <LoanTable id={row.original.idNumber}/>
            </div>
          </Box>
        )}
        renderRowActions={({ row, table }) => (
          <Box sx={{ display: 'flex', gap: '1rem'}}>
            <div className="ml-6 flex">
              <Tooltip arrow placement="left" title="Edit">
                <IconButton onClick={() => table.setEditingRow(row)}>
                    <Edit />
                </IconButton>
              </Tooltip>
              <div className={!deleteSetting ? 'hidden' : ''}>
              <Tooltip arrow placement="left" title="Delete">
                <IconButton onClick={() => handleDeleteClient(row.original._id)}>
                  <Delete />
                </IconButton>
              </Tooltip>
              </div>
            </div>
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
    
      <CreateNewClientModal
        columns={columns}
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onSubmit={handleCreateNewRow}
      />
    </>
  );
};

export default ClientTable;
