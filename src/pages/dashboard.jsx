import * as React from 'react';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
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
import { getStoredUser } from '../helpers/common.helper';

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

  const handleChange = (index, e) => {
    setRows(prevState => {
      prevState[index].bizCoin = e.target.value
      return [...prevState];
    })
  };

  const onboardClient = (rowData) => {
    const storedUser = getStoredUser();

    axios.post(`${BASE_URL}/api/admin/${storedUser.email}/onboard/clients`, {
      "bizCoin": parseInt(rowData.bizCoin),
      status: "Onboard",
      "userRewardId": rowData.userRewardId
    }).then(res => {
      console.log(`res`)
      console.log(res)
    });
  }

  const updateClientStatus = (rowData, status) => {
    const storedUser = getStoredUser();
    axios.post(`${BASE_URL}/api/admin/${storedUser.email}/initiate/clients/status`, {
      "bizCoin": 0,
      status,
      "userRewardId": rowData.userRewardId
    }).then(res => {
      if (res && res.data) {
        fetchDashboardData();
      }
    });
  }

  const storedUser = getStoredUser();
  let dashboardUrl = '';
  if (storedUser.userType === "Admin-1") {
    dashboardUrl = `${BASE_URL}/api/admin/${storedUser.email}/find-all/fresh/clients`
  } else if (storedUser.userType === "Admin-2") {
    dashboardUrl = `${BASE_URL}/api/admin/${storedUser.email}/find-all/initiated/clients`
  } else {
    dashboardUrl = `${BASE_URL}/api/users/dashboard/${storedUser.email}`
  }

  const fetchDashboardData = () => {
    console.log(`fetchDashboardData`)
    axios.get(dashboardUrl).then(res => {
      setRows(res.data);
    });
  }

  useEffect(() => {
    fetchDashboardData();
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
                <StyledTableCell>Action</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows && Array.isArray(rows) && rows.map((row, index) => (
                <StyledTableRow key={row.customerName}>
                  <StyledTableCell component="th" scope="row">
                    {row.customerName}
                  </StyledTableCell>
                  <StyledTableCell>{row.customerEmail}</StyledTableCell>
                  <StyledTableCell>
                    {
                      storedUser.userType === "Admin-2" ?
                        <TextField
                          required
                          id='bizCoin'
                          // label='Email Address'
                          placeholder='Bizcoin'
                          name='bizCoin'
                          autoComplete='off'
                          size="small"
                          value={row.bizCoin}
                          onChange={(e) => handleChange(index, e)}
                        />
                        : row.bizCoin
                    }
                  </StyledTableCell>
                  <StyledTableCell>

                    {
                      (storedUser.userType === "Admin-1") ?
                        (<div>
                          <button type='button' className="btn" onClick={() => { updateClientStatus(row, "Initiate") }}>Initiate</button>
                          <button type='button' className="btn ml-3" onClick={() => { updateClientStatus(row, "Drop") }}>Drop</button>
                        </div>)
                        : (storedUser.userType === "Admin-2")
                          ? <button type='button' className="btn" onClick={() => { onboardClient(row, "Onboard") }}>Onboard</button>
                          : ""
                    }
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
}