import * as React from 'react';
import { useEffect } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Button, Link, TextField } from '@mui/material';
import { useRef } from 'react';
import { useState } from 'react';

function createData(id, calories, fat, carbs, protein, price) {
  return {
    id,
    calories,
    fat,
    carbs,
    protein,
    price,
    history: [
      {
        date: '2020-01-05',
        customerId: '11091700',
        amount: 3,
      },
      {
        date: '2020-01-02',
        customerId: 'Anonymous',
        amount: 1,
      },
    ],
  };
}
const fileName = (qr) => {
    return `https://server.easzoologic.xyz/images/` + qr.split('\\').pop();
};

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const animals =  JSON.parse(row.animals);
  console.log(animals)
//   const expanded_data = animals.map(animal => (JSON.parse(animal)))

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}  onClick={() => setOpen(!open)}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.id}
        </TableCell>
        <TableCell align="right">{row.animal_type}</TableCell>
        <TableCell align="right">{row.title}</TableCell>
        {/* <TableCell align="right">{row.carbs}</TableCell>
        <TableCell align="right">{row.protein}</TableCell> */}
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
                <Box display='flex' flexDirection='row' justifyContent={'space-between'} >
                    <Typography variant="h6" gutterBottom component="div">
                        Additional Data
                    </Typography>
                       {props.role === 1 &&
                        <a 
                            href={fileName(row.QR_path)}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            QR code
                        </a>}
                </Box>
              <Typography variant="paragraph" gutterBottom component="div">
                {row.content}
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell align="right">Age</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {animals.map((animal, index) => (
                    <TableRow key={`${index}_${animal.name}`}>
                      <TableCell component="th" scope="row">
                        {animal.animal_name}
                      </TableCell>
                      <TableCell>{animal.animal_type}</TableCell>
                      <TableCell align="right">{animal.animal_age}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    calories: PropTypes.number.isRequired,
    carbs: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        customerId: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      }),
    ).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    protein: PropTypes.number.isRequired,
  }).isRequired,
};


export default function TableData({role, tableRows}) {
    console.log(tableRows)
  return (
    <>
        <TableContainer component={Paper} xs={2} m={2}>
        <Table aria-label="collapsible table ">
            <TableHead>
            <TableRow>
                <TableCell />
                <TableCell>id</TableCell>
                <TableCell align="left">Animal Type</TableCell>
                <TableCell align="right">Title</TableCell>
                {/* <TableCell align="right">Carbs&nbsp;(g)</TableCell> */}
                {/* <TableCell align="right">Protein&nbsp;(g)</TableCell> */}
            </TableRow>
            </TableHead>
            <TableBody>
            {tableRows?.map((row) => (
                <Row role={role} key={row.name} row={row} />
            ))}
            </TableBody>
        </Table>
        </TableContainer>
    </>
  );
}
