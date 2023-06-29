import { useSelector, useDispatch } from "react-redux";
import { setLoans } from '../redux/loansSlice';
import { useMemo, useState, useEffect } from "react";
import { MaterialReactTable } from "material-react-table";
import CircularProgress from '@mui/material/CircularProgress';
import { format } from 'date-fns';
import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
  Box,
  MenuItem,
} from "@mui/material";
import axios from "axios";

const LoanTable = ({ id }) => {
  const dispatch = useDispatch();
  const loanData = useSelector((state) => state.loans.data)
  const [tableData, setTableData] = useState(loanData);
  const [loading, setLoading] = useState(false);

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

  // const clientLoanData = useMemo(() => {
  //   if (loading || !Array.isArray(loanData)) {
  //     return [];
  //   }
  //   return loanData.filter((loan) => loan.idNumber === id);
  // }, [loanData, id, loading]);

  const handleSaveCell = async (row, cell, value) => {
    const updatedInfo = JSON.parse(JSON.stringify(tableData))
    updatedInfo[cell.row.index][cell.column.id] = value;
    const singleRowData = updatedInfo[cell.row.index];
    
    try {
      const response = await axios.put('/loans', singleRowData);
      const updatedTableData = [...tableData]; // Create a copy of the tableData array
      updatedTableData[row.index] =  response.data;
      setTableData(updatedTableData);
      dispatch(setLoans(updatedTableData))
    } catch (error) {
      console.log('Error updating loan data:', error);
    }
  };
  
  
  

  const settledChoice = ['true', 'false'];

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
            {row.original.settled === true && (
              <span className="bg-green-500 p-2 rounded-lg">Settled</span>
            )}
          </div>
        ),
      },
      {
        accessorKey: "notes",
        header: "Notes",
        size: 150,
      },
    ],
    [],
  );

  const [createModalOpen, setCreateModalOpen] = useState(false);
  const handleCreateNewRow = async (values) => {
    try {
      const response = await axios.post("/clients", values);
      const createdClient = response.data;
      const updatedLoanData = [...loanData, createdClient];
      dispatch(setLoans(updatedLoanData));
      setCreateModalOpen(false);
    } catch (error) {
      console.log("Error creating client", error);
    }
  };

  // Render the loading state if necessary
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: "center", marginTop: "8rem" }}>
        <CircularProgress color="inherit" />
      </Box>
    );
  }

  return (
    <>
      <MaterialReactTable
        columns={columns}
        data={tableData.filter((loan) => loan.idNumber === id)}
        editingMode="cell"
        enableColumnOrdering
        enableEditing
        muiTableBodyCellEditTextFieldProps={({ row, cell }) => ({
          onBlur: (event) => {
            handleSaveCell(row, cell, event.target.value);
          },
        })}
        enableColumnFilterModes
        enablePinning
        enablePagination={false}
        enableRowVirtualization
        initialState={{ showColumnFilters: false }}
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
      />
    </>
  );
};

export const CreateNewLoanModal = ({ open, columns, onClose, onSubmit }) => {
  const [values, setValues] = useState(() =>
    columns.reduce((acc, column) => {
      if (column.accessorKey === 'settled') {
        acc[column.accessorKey ?? ""] = 'false';
      } else {
        acc[column.accessorKey ?? ""] = "";
      }
      return acc;
    }, {})
  );

  const handleSubmit = () => {
    onSubmit(values);
    onClose();
  };

  return (
    <Dialog open={open}>
      <DialogTitle textAlign="center">Create New Loan</DialogTitle>
      <DialogContent>
        <form onSubmit={(e) => e.preventDefault()}>
          <Stack
            sx={{
              width: "100%",
              minWidth: { xs: "300px", sm: "360px", md: "400px" },
              gap: "1.5rem",
            }}
          >
            {columns.map((column) => {
              if (column.accessorKey === 'settled') {
                return null;
              } else {
                return (
                  <React.Fragment key={column.accessorKey}>
                    <h2>{column.header}</h2>
                    <TextField
                      key={column.accessorKey}
                      type={column.type}
                      name={column.accessorKey}
                      onChange={(e) =>
                        setValues({ ...values, [e.target.name]: e.target.value })
                      }
                    />
                  </React.Fragment>
                );
              }
            })}
          </Stack>
        </form>
      </DialogContent>
      <DialogActions sx={{ p: "1.25rem" }}>
        <Button onClick={onClose}>Cancel</Button>
        <Button color="primary" onClick={handleSubmit} variant="contained">
          Create New Loan
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LoanTable;
