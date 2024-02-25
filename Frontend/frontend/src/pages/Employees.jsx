import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../constants/common";
import { Box, Container, TextField, Typography, Modal } from "@mui/material";

// Style for the modal
const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

export default function Employees() {
  const [employees, setEmployees] = useState([]);
  const [open, setOpen] = useState(false); // State to control modal visibility
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [salary, setSalary] = useState("");
  const [loaded, setLoaded] = useState(true);

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/getemps`)
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [loaded]);

  const handleOpen = () => setOpen(true); // Open modal
  const handleClose = () => setOpen(false); // Close modal

  const handleAddEmployee = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BACKEND_URL}/createemp`, {
        name: name,
        email: email,
        address: address,
        salary: salary,
      });
      setLoaded(false);
      handleClose();
    } catch (error) {
      console.log(error.response.data);
    }
  };
  return (
    <>
      <Button
        variant="contained"
        color="success"
        onClick={handleOpen}
        sx={{ mt: 2, mb: 4 }}
      >
        Add Employee
      </Button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add Employee
          </Typography>
          <Box
            component="form"
            onSubmit={handleAddEmployee}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              name="name"
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="name"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              name="email"
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="address"
              name="address"
              label="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              autoComplete="address"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="salary"
              name="salary"
              label="Salary"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              autoComplete="salary"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="success"
              sx={{ mt: 3, mb: 2 }}
            >
              Add Employee
            </Button>
            <Button
              fullWidth
              variant="outlined"
              color="error"
              onClick={handleClose}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Email</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Address</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Salary</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.map((employee) => (
              <TableRow
                key={employee.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {employee.name}
                </TableCell>
                <TableCell>{employee.email}</TableCell>
                <TableCell>{employee.address}</TableCell>
                <TableCell>{employee.salary}</TableCell>
                <TableCell>
                  <Button variant="contained">Edit</Button>
                  <Button variant="contained" color="error" sx={{ ml: 2 }}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
