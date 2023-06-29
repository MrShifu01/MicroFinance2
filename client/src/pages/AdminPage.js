import { useDispatch, useSelector } from "react-redux";
import { setClients } from '../redux/clientsSlice';
import { setLoans } from '../redux/loansSlice';
import { setPage } from '../redux/pageSlice';
import axios from 'axios';
import { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
} from '@mui/material';

const AdminPage = () => {
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPage('admin'));
  }, [dispatch]);

  const clientData = useSelector((state) => state.clients.data);
  const loanData = useSelector((state) => state.loans.data);

  const handleOpenModal = () => {
    setCreateModalOpen(true);
  };

  const handleUpdateData = async () => {
    const clientResponse = await axios.get('/clients');
    const loanResponse = await axios.get('/loans');
    dispatch(setClients(clientResponse.data));
    dispatch(setLoans(loanResponse.data));
    alert("Data Updated");
  };

  const handleSaveToLocalStorage = () => {
    localStorage.setItem('clients', JSON.stringify(clientData));
    localStorage.setItem('loans', JSON.stringify(loanData));
    alert('Data Stored to Local Storage');
  };

  const handleDeleteFromLocalStorage = () => {
    localStorage.removeItem('clients');
    localStorage.removeItem('loans');
    alert('Data Deleted from Local Storage!');
  };

  return (
    <div>
      <div className="flex flex-col gap-2">
        AdminPage

        <button
          onClick={handleUpdateData}
          className="max-w-xs p-4 bg-gray-500 rounded-xl"
        >
          Update Data from Database
        </button>

        <button
          onClick={handleSaveToLocalStorage}
          className="max-w-xs p-4 bg-blue-500 rounded-xl"
        >
          Save Data to Local Storage
        </button>

        <button
          onClick={handleDeleteFromLocalStorage}
          className="max-w-xs p-4 bg-red-500 rounded-xl"
        >
          Delete Data from Local Storage
        </button>

        <button
          onClick={handleOpenModal}
          className="max-w-xs p-4 bg-gray-500 rounded-xl"
        >
          Open Modal
        </button>

      </div>
      <EditModal
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
      />
    </div>
  );
};

export const EditModal = ({ open, onClose, onSubmit }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      const response = await axios.get('/users');
      setUsers(response.data);
    };
    getUsers();
  }, []);

  const handleSubmit = async () => {
    try {
      await axios.put('/users', users); // Assuming your API endpoint for updating users is '/users'
      onClose();
      alert('User data saved!');
    } catch (error) {
      console.error('Error saving user data:', error);
      // Handle error saving user data
    }
  };

  const handleInputChange = (event, userId) => {
    const updatedUsers = users.map((user) => {
      if (user._id === userId) {
        return {
          ...user,
          isAdmin: event.target.value === 'True',
        };
      }
      return user;
    });
    setUsers(updatedUsers);
  };

  return (
    <Dialog open={open}>
      <DialogTitle textAlign="center">Users</DialogTitle>
      <DialogContent>
        <form onSubmit={(e) => e.preventDefault()}>
          <Stack
            sx={{
              width: '100%',
              minWidth: { xs: '300px', sm: '360px', md: '400px' },
              gap: '1.5rem',
            }}
          >
            {users.length > 0 && users.map((user) => (
              <div key={user._id}>

                <div>{user.name}</div>
                <div>{user.email}</div>
                <select
                  value={user.isAdmin ? 'True' : 'False'}
                  onChange={(event) => handleInputChange(event, user._id)}
                >
                  <option value="True">True</option>
                  <option value="False">False</option>
                </select>
              </div>
            ))}
          </Stack>
        </form>
      </DialogContent>
      <DialogActions sx={{ p: '1.25rem' }}>
        <Button onClick={onClose}>Cancel</Button>
        <Button color="primary" onClick={handleSubmit} variant="contained">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AdminPage;
