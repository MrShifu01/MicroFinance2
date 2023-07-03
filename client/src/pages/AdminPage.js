import { useDispatch } from "react-redux";
import { setClients } from '../redux/clientsSlice';
import { setLoans } from '../redux/loansSlice';
import { setPage } from '../redux/pageSlice';
import axios from 'axios';
import { useEffect, useState } from "react";
import { EditModal } from "../components/UserEditModal";


const AdminPage = () => {
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPage('admin'));
  }, [dispatch]);

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

  const handleDeleteFromLocalStorage = () => {
    localStorage.removeItem('clients');
    localStorage.removeItem('loans');
    alert('Data Deleted from Local Storage!');
  };

  return (
    <div>
      <div className="flex flex-col justify-center items-center gap-2">
        <div className="text-center text-2xl m-8">AdminPage</div>

        <button
          onClick={handleUpdateData}
          className="max-w-xs p-4 bg-gray-500 rounded-xl"
        >
          Update Data from Database
        </button>

        <button
          onClick={handleDeleteFromLocalStorage}
          className="max-w-xs p-4 bg-red-500 rounded-xl"
        >
          Delete Data from Local Storage
        </button>

        <button
          onClick={handleOpenModal}
          className="max-w-xs p-4 bg-green-500 rounded-xl"
        >
          Edit User Permissions
        </button>

      </div>
      <EditModal
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
      />
    </div>
  );
};

export default AdminPage;
