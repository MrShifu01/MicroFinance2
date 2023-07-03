import { Checkbox } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleColumn, togglePagination, toggleDelete } from '../redux/settingsSlice';

const SideBar = () => {
  const dispatch = useDispatch();
  const column = useSelector((state) => state.settings.column);
  const pagination = useSelector((state) => state.settings.pagination);
  const deletable = useSelector((state) => state.settings.delete);

  const handleToggleColumn = () => {
    dispatch(toggleColumn());
  };

  const handleTogglePagination = () => {
    dispatch(togglePagination());
  };

  const handleToggleDelete = () => {
    dispatch(toggleDelete());
  };

  return (
    <div>
      <div className='font-bold mb-3'>Settings</div>

      <div className='flex items-center gap-2'>
        <Checkbox
          checked={column}
          onClick={handleToggleColumn}
        />
        <span>Order Columns</span>
      </div>

      <div className='flex items-center gap-2'>
        <Checkbox
          checked={pagination}
          onClick={handleTogglePagination}
        />
        <span>Pagination</span>
      </div>

      <div className='flex items-center gap-2'>
        <Checkbox
          checked={deletable}
          onClick={handleToggleDelete}
        />
        <span>Delete</span>
      </div>

    </div>
  );
};

export default SideBar;
