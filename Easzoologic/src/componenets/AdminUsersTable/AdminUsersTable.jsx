import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
  IconButton,
  LinearProgress,
  Box,
  Typography,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import api from '../../constants/axios.config';

const UserTable = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [users, setUsers] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleEdit = (id) => {
    navigate(`/admin/register?id=${id}`);
  };

  const getUsers = async ()=>{
    try{
        setIsLoading(true);
        const response =  await api.get('/info/users')
        console.log(response.data)
        setUsers(response.data.rows);
    } catch(e){
        console.log("Error loading user, ", e);
    } finally {
        setIsLoading(false);
    }

  }
  useEffect(()=>{
    getUsers();
  },[])

  const handleDelete = () => {
    console.log(`Deleting user with id: ${selectedUserId}`);
    // Add your delete logic here
    setOpenDialog(false);
  };

  const openDeleteDialog = (id) => {
    setSelectedUserId(id);
    setOpenDialog(true);
  };

  const closeDeleteDialog = () => {
    setOpenDialog(false);
  };

  const translateUserRole = (role) => {
    switch(role){
        case 1:
            return 'Admin'
        case 2:
            return 'Veterinarian'
        case 3:
            return 'Zoo Keeper'
        default:
            return null;
    }
  }
  console.log(translateUserRole('1'))

  return (
    <>
    <Box>
        <Typography variant='h2' color='primary'>Users Table</Typography>
        <Box>
        <TableContainer component={Paper}>
            <Table>
            <TableHead>
                <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Role</TableCell>
                <TableCell align="center">Actions</TableCell>
                </TableRow>
            </TableHead>
            {!isLoading && users ? 
            <TableBody>
               {users.map((user) => (
                <TableRow key={user.id}>
                    <TableCell>{user.id}</TableCell>
                    <TableCell>{user.full_name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{translateUserRole(user.role)}</TableCell>
                    <TableCell align="center">
                    <IconButton onClick={() => handleEdit(user.id)} color="primary">
                        <EditIcon />
                    </IconButton>
                    <IconButton
                        onClick={() => openDeleteDialog(user.id)}
                        color="secondary"
                    >
                        <DeleteIcon />
                    </IconButton>
                    </TableCell>
                </TableRow>
                )) }
            </TableBody>
            : null }
            </Table>
        </TableContainer>
        {isLoading ? <LinearProgress></LinearProgress> : null}
        </Box>
    </Box>
        <Dialog
            open={openDialog}
            onClose={closeDeleteDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{'Confirm Deletion'}</DialogTitle>
            <DialogContent>
            <DialogContentText id="alert-dialog-description">
                Are you sure you want to delete this user?
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button onClick={closeDeleteDialog} color="primary">
                Cancel
            </Button>
            <Button onClick={handleDelete} color="secondary" autoFocus>
                Delete
            </Button>
            </DialogActions>
        </Dialog>
    </>
  );
};

export default UserTable;
