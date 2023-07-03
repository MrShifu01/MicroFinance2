import { useState } from "react";
import React from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Stack,
    TextField,
  } from "@mui/material";

export const CreateNewLoanModal = ({ open, columns, onClose, onSubmit, idNumber }) => {
    const [values, setValues] = useState(() =>
      columns.reduce((acc, column) => {
        if (column.accessorKey === 'settled') {
          acc[column.accessorKey ?? ""] = 'false';
        } else if (column.accessorKey === 'idNumber') {
          acc[column.accessorKey ?? ""] = idNumber;
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
                if (column.accessorKey === 'settled' || column.accessorKey === 'idNumber') {
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