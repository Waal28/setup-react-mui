import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Button, TextField } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { getData } from "../api";

interface Column {
  id: "name" | "phone" | "email" | "address" | "action";
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
  {
    id: "action",
    label: "Action",
    minWidth: 170,
  },
];

export default function CustomizedTables() {
  const [form, setForm] = React.useState({
    name: "",
    phone: "",
  });
  const [rows, setRows] = React.useState([]);
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
  async function getData__name() {
    const res = await getData(`customers/search?name=${form.name}`);
    setRows(
      res.map((r: any) => ({
        ...r,
        action: (
          <Button
            id="basic-button"
            startIcon={<MoreVertIcon />}
            color="inherit"
          ></Button>
        ),
      }))
    );
  }
  async function getData__phone() {
    const res = await getData(`customers/search?phone=${form.phone}`);
    setRows(
      res.map((r: any) => ({
        ...r,
        action: (
          <Button
            id="basic-button"
            startIcon={<MoreVertIcon />}
            color="inherit"
          ></Button>
        ),
      }))
    );
  }
  async function getData__() {
    const res = await getData("customers");
    setRows(res);
  }
  React.useEffect(() => {
    if (form.name !== "") {
      getData__name();
    } else if (form.phone !== "") {
      getData__phone();
    } else {
      getData__();
    }
  }, [form]);

  React.useEffect(() => {
    getData__();
  }, []);
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
                  value={form.name}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setForm({ ...form, name: event.target.value });
                  }}
                />
              </TableCell>
              <TableCell align="center">
                <TextField
                  id="outlined-basic"
                  label="Outlined"
                  variant="outlined"
                  size="small"
                  sx={{ width: "200px" }}
                  value={form.phone}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setForm({ ...form, phone: event.target.value });
                  }}
                />
              </TableCell>
              <TableCell colSpan={3} align="center"></TableCell>
            </TableRow>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row: any) => {
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
