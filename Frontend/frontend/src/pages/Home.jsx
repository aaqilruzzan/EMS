import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import { useState, useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "../constants/common";

export default function home() {
  const [adminCount, setAdminCount] = useState(0);
  const [employeeCount, setEmployeeCount] = useState(0);
  const [totalSalary, setTotalSalary] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/getusercount`)
      .then((response) => {
        setAdminCount(response.data.count);
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get(`${BACKEND_URL}/getempcount`)
      .then((response) => {
        setEmployeeCount(response.data.count);
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get(`${BACKEND_URL}/totalsalary`)
      .then((response) => {
        setTotalSalary(response.data.sum);
      })
      .catch((error) => {
        console.log(error);
      });
    setLoading(false);
  }, []);
  return (
    <>
      {loading ? (
        <Typography variant="h4">Loading...</Typography>
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
            flexWrap: "wrap",
          }}
        >
          <Card sx={{ minWidth: 275, minHeight: 100 }}>
            <CardContent>
              <Typography
                variant="h5"
                component="div"
                sx={{ textAlign: "center", mb: 2 }}
              >
                Admins
              </Typography>
              <Divider />
              <Typography variant="h6" component="div" sx={{ mt: 2 }}>
                Total : {adminCount}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>
          <Card sx={{ minWidth: 275, minHeight: 100 }}>
            <CardContent>
              <Typography
                variant="h5"
                component="div"
                sx={{ textAlign: "center", mb: 2 }}
              >
                Employees
              </Typography>
              <Divider />
              <Typography variant="h6" component="div" sx={{ mt: 2 }}>
                Total : {employeeCount}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>
          <Card sx={{ minWidth: 275, minHeight: 100 }}>
            <CardContent>
              <Typography
                variant="h5"
                component="div"
                sx={{ textAlign: "center", mb: 2 }}
              >
                Salary
              </Typography>
              <Divider />
              <Typography variant="h6" component="div" sx={{ mt: 2 }}>
                Total : ${totalSalary}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>
        </Box>
      )}
    </>
  );
}
