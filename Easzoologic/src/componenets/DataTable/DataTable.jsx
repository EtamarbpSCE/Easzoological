import * as React from 'react';
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
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router';

const fileName = (qr) => {
    return `https://server.easzoologic.xyz/images/` + qr.split('\\').pop();
};

function Row(props) {
    const { row, role } = props;
    console.log("row ", row)
    const [open, setOpen] = React.useState(false);
    const animals = JSON.parse(row.animals);
    const navigate = useNavigate()
    console.log(animals);


    const handleEdit = () => {
        console.log("asdfasdf")
        navigate(`/admin/add_cage?id=${row.id}`);
        // Add your edit logic here
    };

  const handleRemove = () => {
    console.log(`Removing cage with ID: ${row.id}`);
    // Add your remove logic here
  };

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }} onClick={() => setOpen(!open)}>
        <TableCell>
          <IconButton aria-label="expand row" size="small">
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.id}
        </TableCell>
        <TableCell align="center">{row.animal_type}</TableCell>
        <TableCell align="center">{row.title}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Box display="flex" flexDirection="row" justifyContent="space-between">
                <Typography variant="h6" gutterBottom component="div">
                  Additional Data
                </Typography>
                {role === 1 && (
                  <a
                    href={fileName(row.QR_path)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    QR code
                  </a>
                )}
              </Box>
              <Typography variant="body1" gutterBottom component="div">
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
              {role === 1 && (
                <Box mt={2} display="flex" justifyContent="flex-end" gap={2}>
                  <Button variant="contained" color="primary" onClick={handleEdit}>
                    Edit
                  </Button>
                  <Button variant="contained" color="secondary" onClick={handleRemove}>
                    Remove
                  </Button>
                </Box>
              )}
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    id: PropTypes.number.isRequired,
    animal_type: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    animals: PropTypes.string.isRequired,
    QR_path: PropTypes.string.isRequired,
  }).isRequired,
  role: PropTypes.number.isRequired,
};

export default function TableData({ role, tableRows }) {
  return (
    <>
      <TableContainer component={Paper} xs={2} m={2}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>id</TableCell>
              <TableCell align="center">Animal Type</TableCell>
              <TableCell align="center">Title</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableRows?.map((row) => (
              <Row role={role} key={row.id} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}