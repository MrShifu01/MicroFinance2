import { useSelector, useDispatch } from "react-redux";
import { setLoans } from '../redux/loansSlice'
import { useMemo, useState, useEffect } from "react";
import { MaterialReactTable } from "material-react-table";
import EditIcon from "@mui/icons-material/Edit";
import { Edit } from "@mui/icons-material";
import CircularProgress from '@mui/material/CircularProgress';
import { format } from 'date-fns'


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
  Box,
  ListItemIcon,
  MenuItem,
} from "@mui/material";
import axios from "axios";

const LoanTable = ({ id }) => {
  const dispatch = useDispatch();
  
  const loanData = useSelector((state) => state.loans.data);

  const [loading, setLoading] = useState(false);

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
      setLoading(false);
    } catch (error) {
      console.log("Error fetching loan data:", error);
      setLoading(false);
    }
  };

  const clientLoanData = useMemo(() => {
    if (loading || !Array.isArray(loanData)) {
      return [];
    }
    return loanData.filter((loan) => loan.idNumber === id);
  }, [loanData, id, loading]);

  const settledChoice = ['true', 'false']

  const columns = useMemo(
    () => [
      {
        accessorKey: "loanDate",
        header: "Loan Date",
        size: 150,
        type: 'date',
        Cell: ({row}) => {
          return <div>{format(new Date(row.original.loanDate), "MMM d, yyyy")}</div>
        }
      },
      {
        accessorKey: "repaymentDate",
        header: "Repay Date",
        size: 150,
        type: 'date',
        Cell: ({row}) => {
          return <div>{format(new Date(row.original.repaymentDate), "MMM d, yyyy")}</div>
        }
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
          children: settledChoice.map(choice => <MenuItem key={choice} value={choice}>
                    {choice}
                  </MenuItem>),
          select: true
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
    []
  );

  const handleSaveRowEdits = async ({ exitEditingMode, row, values }) => {
    try {
      const updatedValues = { id: row.original._id, ...values };
      await axios.put("/loans", updatedValues);

      // Update the local table data and exit editing mode
      const updatedLoanData = [...loanData];
      const updatedRow = { ...row.original, ...values };
      const rowIndex = loanData.findIndex(
        (loan) => loan._id === row.original._id
      );
      updatedLoanData[rowIndex] = updatedRow;
      dispatch(setLoans(updatedLoanData));

      exitEditingMode();
    } catch (error) {
      console.log("Error updating client data:", error);
    }
  };

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

  const [editingRow, setEditingRow] = useState(null);
  const handleCancelRowEdits = () => {
    setEditingRow(null);
  };

    // Render the loading state if necessary
    if (loading) {
      return (
        <Box sx={{ display: 'flex', justifyContent: "center", marginTop: "8rem" }}>
          <CircularProgress color="inherit"  />
        </Box>
      )
    }

  return (
    <>
      <MaterialReactTable
        columns={columns}
        data={clientLoanData}
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
        renderRowActionMenuItems={({ closeMenu }) => (
          <MenuItem
            key={1}
            onClick={() => {
              closeMenu();
            }}
            sx={{ m: 0 }}
          >
            <ListItemIcon>
              <EditIcon />
            </ListItemIcon>
            Edit
          </MenuItem>
        )}
        renderRowActions={({ row, table }) => (
          <Box sx={{ display: "flex", gap: "1rem" }}>
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
      acc[column.accessorKey ?? ""] = "";
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
            {columns.map((column) => (
              <>
                <h2>{column.header}</h2>
                <TextField
                  key={column.accessorKey}
                  type={column.type}
                  name={column.accessorKey}
                  onChange={(e) =>
                    setValues({ ...values, [e.target.name]: e.target.value })
                  }
                />
              </>
            ))}
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
