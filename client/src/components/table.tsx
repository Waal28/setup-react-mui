import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { TextField } from "@mui/material";

interface Column {
  id: "name" | "phone" | "email" | "address";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: "name", label: "Customer Name", minWidth: 170 },
  { id: "phone", label: "Phone Number", minWidth: 100 },
  {
    id: "email",
    label: "Email Address",
    minWidth: 170,
  },
  {
    id: "address",
    label: "Address",
    minWidth: 170,
  },
];

interface Data {
  id: string;
  name: string;
  phone: string;
  email: string;
  address: string;
}

function createData(
  id: string,
  name: string,
  phone: string,
  email: string,
  address: string
): Data {
  return { id, name, phone, email, address };
}

const rows = [
  createData("1", "Iwal", "081234567890", "iwal@gmail.com", "Jl. Sudirman"),
  createData("2", "Iwal", "081234567890", "iwal@gmail.com", "Jl. Sudirman"),
  createData("3", "Iwal", "081234567890", "iwal@gmail.com", "Jl. Sudirman"),
  createData("4", "Iwal", "081234567890", "iwal@gmail.com", "Jl. Sudirman"),
  createData("5", "Iwal", "081234567890", "iwal@gmail.com", "Jl. Sudirman"),
  createData("6", "Iwal", "081234567890", "iwal@gmail.com", "Jl. Sudirman"),
  createData("7", "Iwal", "081234567890", "iwal@gmail.com", "Jl. Sudirman"),
  createData("8", "Iwal", "081234567890", "iwal@gmail.com", "Jl. Sudirman"),
  createData("9", "Iwal", "081234567890", "iwal@gmail.com", "Jl. Sudirman"),
  createData("10", "Iwal", "081234567890", "iwal@gmail.com", "Jl. Sudirman"),
  createData("11", "Iwal", "081234567890", "iwal@gmail.com", "Jl. Sudirman"),
];

export default function CustomizedTables() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow hover role="checkbox" tabIndex={-1}>
              <TableCell align="center">
                <TextField
                  id="outlined-basic"
                  label="Outlined"
                  variant="outlined"
                  size="small"
                  sx={{ width: "200px" }}
                />
              </TableCell>
              <TableCell align="center">
                <TextField
                  id="outlined-basic"
                  label="Outlined"
                  variant="outlined"
                  size="small"
                  sx={{ width: "200px" }}
                />
              </TableCell>
              <TableCell colSpan={3} align="center"></TableCell>
            </TableRow>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
