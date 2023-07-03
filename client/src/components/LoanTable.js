import { useSelector, useDispatch } from "react-redux";
import { setLoans } from '../redux/loansSlice';
import { useMemo, useState, useEffect } from "react";
import { MaterialReactTable } from "material-react-table";
import { format } from 'date-fns';
import React from "react";
import {
  Button,
  MenuItem,
  IconButton,
  Tooltip,
  Box
} from "@mui/material";
import axios from "axios";
import { CreateNewLoanModal } from "./CreateNewLoanModal";
import LoadingSpinner from "./LoadingSpinner";
import { Delete } from '@mui/icons-material';

const LoanTable = ({ id }) => {
  const dispatch = useDispatch();
  const loanData = useSelector((state) => state.loans.data)
  const user = useSelector((state) => state.user.data)
  const [tableData, setTableData] = useState(loanData);
  const [loading, setLoading] = useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const settledChoice = ['true', 'false'];
  const columnSetting = useSelector((state) => state.settings.column)
  const paginationSetting = useSelector((state) => state.settings.pagination)
  const deleteSetting = useSelector((state) => state.settings.delete)

  const columns = useMemo(
    () => [
      {
        accessorKey: "loanDate",
        header: "Loan Date",
        size: 150,
        type: 'date',
        muiTableBodyCellEditTextFieldProps: {
          type: 'date',
          value: ({ row }) => {
            return row.original.loanDate;
          },
        },
        Cell: ({ row }) => {
          return <div>{format(new Date(row.original.loanDate), "yyyy-MM-dd")}</div>;
        },
      },
      {
        accessorKey: "repaymentDate",
        header: "Repay Date",
        size: 150,
        type: 'date',
        muiTableBodyCellEditTextFieldProps: {
          type: 'date',
        },
        Cell: ({ row }) => {
          return <div>{format(new Date(row.original.repaymentDate), "yyyy-MM-dd")}</div>;
        },
      },
      {
        accessorKey: "loanAmount",
        header: "Loan Amount",
        size: 150,
      },
      {
        accessorKey: "repaymentAmount",
        header: "Repay Amount",
        size: 150,
      },
      {
        accessorKey: "settled",
        header: "Settled",
        size: 150,
        muiTableBodyCellEditTextFieldProps: () => ({
          children: settledChoice.map(choice => (
            <MenuItem key={choice} value={choice}>
              {choice}
            </MenuItem>
          )),
          select: true,
        }),
        Cell: ({ row }) => (
          <div>
            {row.original.settled ? (
              <span className="bg-green-500 p-2 rounded-lg">Settled</span>
            ) : (<span className="bg-red-500 p-2 rounded-lg">Not Settled</span>)}
          </div>
        ),
      },
      {
        accessorKey: "notes",
        header: "Notes",
        size: 150,
      },
      {
        accessorKey: "idNumber",
        header: "ID Number",
        size: 150,
      },
    ],
    [deleteSetting],
  );

  useEffect(() => {
    if (Array.isArray(loanData) && loanData.length > 0) {
      const clientLoanData = loanData.filter((loan) => loan.idNumber === id);
      setTableData(clientLoanData);
    }
  }, [loanData, id]);

  useEffect(() => {
    setTableData([]); // Clear the table data when a new client is selected
    fetchLoanData()
  }, [id]);

  useEffect(() => {
    if (!Array.isArray(loanData) || loanData.length === 0) {
      fetchLoanData();
    }
  }, [loanData]);

  const fetchLoanData = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/loans");
      const fetchedLoanData = response.data;
      dispatch(setLoans(fetchedLoanData));
      setTableData(fetchedLoanData);
      setLoading(false);
    } catch (error) {
      console.log("Error fetching loan data:", error);
      setLoading(false);
    }
  };

  const handleSaveCell = async (row, cell, value) => {
    const updatedInfo = JSON.parse(JSON.stringify(tableData));
    updatedInfo[cell.row.index][cell.column.id] = value;
    const singleRowData = updatedInfo[cell.row.index];
  
    if (!user.isAdmin) {
      // Show alert if user is not admin
      alert("You do not have authorization to edit a loan.");
      return;
    }
  
    try {
      const response = await axios.put('/loans', singleRowData);
      const updatedTableData = [...tableData]; // Create a copy of the tableData array
      updatedTableData[row.index] = response.data;
      setTableData(updatedTableData);
      dispatch(setLoans(updatedTableData));
    } catch (error) {
      console.log('Error updating loan data:', error);
    }
  };
  
  const handleCreateNewRow = async (values) => {
    if (!user.isAdmin) {
      // Show alert if user is not admin
      alert("You do not have authorization to create a new loan.");
      return;
    }
  
    try {
      const response = await axios.post("/loans", values);
      const updatedLoanData = [...loanData, response.data];
      dispatch(setLoans(updatedLoanData));
      setCreateModalOpen(false);
    } catch (error) {
      console.log("Error creating client", error);
    }
  };

  const handleDeleteLoan = async (loanId) => {
    console.log(loanId)
    if (!user.isAdmin) {
      // Show alert if user is not admin
      alert('You do not have authorization to delete a loan.')
      return;
    }

    const confirmDelete = window.confirm('Are you sure you want to delete this loan?');
    if (!confirmDelete) {
      return; // User canceled the deletion
    }
    try {
      await axios.delete(`/loans/${loanId}`);
      const updatedTableData = tableData.filter(loan => loan._id !== loanId);
      setTableData(updatedTableData);
    } catch (error) {
      console.log('Error deleting loan:', error);
    }
  }

  // Render the loading state if necessary
  if (loading) {
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
        data={tableData.filter((loan) => loan.idNumber === id)}
        editingMode="cell"
        enableEditing
        muiTableBodyCellEditTextFieldProps={({ row, cell }) => ({
          onBlur: (event) => {
            handleSaveCell(row, cell, event.target.value);
          },
        })}
        enableColumnFilterModes
        enablePinning
        enableRowActions
        enableColumnOrdering={columnSetting}
        enablePagination={paginationSetting}
        enableRowVirtualization
        initialState={{ showColumnFilters: false }}
        renderRowActions={({ row }) => (
          <Box>
              <div className={!deleteSetting ? 'hidden' : ''}>
                <Tooltip arrow placement="left" title="Delete">
                  <IconButton onClick={() => handleDeleteLoan(row.original._id)}>
                    <Delete />
                  </IconButton>
                </Tooltip>
              </div>
          </Box>
        )}
        renderTopToolbarCustomActions={() => (
          <Button
            color="primary"
            onClick={() => setCreateModalOpen(true)}
            variant="contained"
          >
            New Loan
          </Button>
        )}
      />
      <CreateNewLoanModal
        columns={columns}
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onSubmit={handleCreateNewRow}
        idNumber={id}
      />
    </>
  );
};

export default LoanTable;
