import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect } from 'react';
//import { listReferrals } from '../service/referral_service';
import axios from 'axios';
import { BASE_URL } from '../helpers/constants.helper';
import { getUserEmail } from '../helpers/common.helper';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default function Dashboard() {
  const [rows, setRows] = React.useState([]);
  const [hydrated, setHydrated] = React.useState(false);

  const userMail = localStorage.getItem('userEmail');

  useEffect(() => {
    axios.get(`${BASE_URL}/api/users/dashboard/${getUserEmail()}`)
      .then(res => {
        setRows(res.data);
      });
    setHydrated(true);
  }, []);

  return (
    <div className="dashboard_wrapper">
      {hydrated && (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell>Email</StyledTableCell>
                <StyledTableCell>Bizcoin</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <StyledTableRow key={row.customerName}>
                  <StyledTableCell component="th" scope="row">
                    {row.customerName}
                  </StyledTableCell>
                  <StyledTableCell>{row.customerEmail}</StyledTableCell>
                  <StyledTableCell>{row.bizCoin}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
}