import React,{useEffect,useState} from 'react';
import axios from 'axios';
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import { Container } from '@material-ui/core';
import Layout from '../components/Layout';
import { FaSearch } from 'react-icons/fa';
import {Button,Input} from "semantic-ui-react";


const columns = [
  { id: "hash", label: "Transaction Hash", minWidth: 170 },
  { id: "timeStamp", label: "Time stamp", minWidth: 100 },
  {
    id: "from",
    label: "From",
    minWidth: 170,
    align: "center",
    format: value => value.toLocaleString()
  },
  {
    id: "to",
    label: "To",
    minWidth: 170,
    align: "center",
    format: value => value.toLocaleString()
  },
  {
    id: "value",
    label: "Value",
    minWidth: 170,
    align: "center",
    format: value => value.toFixed(2)
  },
  {
    id: "address",
    label: "Contract Address",
    minWidth: 170,
    align: "center",
    format: value => value.toFixed(2)
  }
];

const useStyles = makeStyles({
  root: {
    width: "100%"
  },
  container: {
    maxHeight: 440
  }
});

function createTransactions(data){
 const madeTransactions = data.map(trans => {
 return {
      hash : trans.hash,
      timeStamp : convertToIST(trans.timeStamp),
      from : trans.from,
      to : trans.to,
      value : trans.value,
      address : trans.contractAddress
 }
 });
 return madeTransactions;
}

function convertToIST(unixTimestamp) {
  const dateObj = new Date(unixTimestamp * 1000); 
  const options = {
    timeZone: 'Asia/Kolkata',
    hour12: false,
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
  };
  const dateString = dateObj.toLocaleString('en-US', options);
  return dateString;
}

//Address to search -> 0x391DA0D88Ac98245d23fA6A17bc2F64d840AbCbA


export default function TrackingByAddress(){
const classes= useStyles();
const [page, setPage] = useState(0);
const [rowsPerPage, setRowsPerPage] = useState(10);
const [transactions, setTransactions ] = useState([]);
const [address, setAddress] = useState("");
const [transactionsCount, setTransactionsCount] = useState(0);
const [message, setMessage] = useState("Found 0 transaction(s)");



const handleChangePage = (event, newPage) => {
  setPage(newPage);
};

const handleChangeRowsPerPage = event => {
  setRowsPerPage(+event.target.value);
  setPage(0);
};

const handleOnClick = () =>{
  getApiData();
}



const getApiData = async () =>{
  const res = await axios.get('https://api-sepolia.etherscan.io/api?module=account&action=txlist&address=' + address + '&startblock=0&endblock=99999999&page=last_page&offset=10000&sort=desc&apikey=2EMZ6JEWTRAW4WQQMZ8S2TI5C34R2SPTD7');
  if(res.data.status == "0"){
    setMessage("Please provide a valid Address");
    setTransactions([]); 
    return;
  }
  setMessage("Found "+res.data.result.length+" transaction(s)");
  setTransactions(createTransactions(res.data.result));
}


const searchBoxDiv = ()=>{
  return <div>
    <h3>
      Welcome to Tracking, here you can view all the done transactions by using a wallet address.
    </h3>
    <Input
      placeholder = "Search transactions by Address"
      style={{ width: "350px", height: "50px" }}
      onChange = {event => setAddress(event.target.value)}
    />
    <Button primary style={{ width: "60px", height: "50px" }} onClick = {handleOnClick}><FaSearch /></Button>
  </div>
}

return (
  <Layout>
    {searchBoxDiv()}
  
  <Container style={{
    marginTop : "35px",
    marginBottom: "215px"
   }}>
  <h4>{message}</h4>
  <Paper className={classes.root}>
    <TableContainer className={classes.container}>
      <Table stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow>
            {columns.map(column => (
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
          {transactions
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map(row => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                  {columns.map(column => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === "number"
                          ? column.format(value)
                          : value}
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
      rowsPerPageOptions={[5, 10, 15, 20, 25, 50, 100]}
      component="div"
      count={transactions.length}
      rowsPerPage={rowsPerPage}
      page={page}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
  </Paper>
  </Container>
  </Layout>
);

}