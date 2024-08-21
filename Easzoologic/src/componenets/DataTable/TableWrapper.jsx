import * as React from 'react';
import { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { Button, TextField, Grid } from '@mui/material';
import TableData from './DataTable';
import OpenVetCallsTable from './OpenVetCallsTable';
import api from '../../constants/axios.config';

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

const openVetRows = [
    createData(21, 159, 6.0, 24, 4.0, 3.99),
    createData(144, 237, 9.0, 37, 4.3, 4.99),
    createData(46312, 262, 16.0, 24, 6.0, 3.79),
    createData(454, 305, 3.7, 67, 4.3, 2.5),
    createData(56755, 356, 16.0, 49, 3.9, 1.5),
];

const tableDataRow = [
    createData(1, "yes", 6.0, 24, 4.0, 3.99),
    createData(14, "237", 9.0, 37, 4.3, 4.99),
    createData(53, "262", 16.0, 24, 6.0, 3.79),
    createData(2, "35", 3.7, 67, 4.3, 2.5),
    createData(8, "356", 16.0, 49, 3.9, 1.5),
];

export default function TableWrapper({ role }) {
    console.log("role", role)
    const [searchParams, setSearchParams] = useState('');
    const debounceTimeoutRef = useRef(null);
    const [tableRows, setTableRows] = useState([]);
    const [openVetCallsRows, setOpenVetCallsRows] = useState([]);
    const [activeTable, setActiveTable] = useState('tableData')
    const [refetch, setRefetch] = useState(false)

    useEffect(() => {
        return () => {
            if (debounceTimeoutRef.current) {
                clearTimeout(debounceTimeoutRef.current);
            }
        };
    }, []);

    useEffect(() => {
        fetchTableData();
        fetchOpenVetCallsData();
        console.log("refetch")
    }, [refetch]);

    const fetchTableData = async () => {
        try{
            const tableDataRow = await api.get('/info/all_cages');
            setTableRows(tableDataRow.data.rows || []);
        } catch(e){
            console.log(e)
        }
        // console.log(tableDataRow)
    };

    const fetchOpenVetCallsData = async () => {
        try{
            const openalls = await api.get('/vets/vet_calls');
            console.log("calls", openalls.data.vet_calls)
            setOpenVetCallsRows(openalls.data.vet_calls || []);
        } catch(e){
            console.log(e)
        }
    };

    const onSearch = (value) => {
        let filteredRows;
        if (value.length > 0) {
            filteredRows = tableRows.filter((row) => String(row.id).includes(value));
        } else {
            filteredRows = tableRows;
        }
        setTableRows(filteredRows);
        console.log(filteredRows);
    };

    const handleChange = (e) => {
        const { value } = e.target;
        setSearchParams(value);

        if (debounceTimeoutRef.current) {
            clearTimeout(debounceTimeoutRef.current);
        }

        debounceTimeoutRef.current = setTimeout(() => {
            onSearch(value);
        }, 500); 
    };

    const handleTableChange = (tableName) => {
        setActiveTable(tableName)
    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} justifyContent='center'>
                <TextField
                    label="Search by ID"
                    variant="outlined"
                    type="number"
                    value={searchParams}
                    onChange={handleChange}
                    fullWidth
                />
            </Grid>
            {role != 3 && (
                <Grid item xs={12} justifyContent='center'  container spacing={1}>
                    <Grid item>
                        <Button variant="contained" onClick={() => handleTableChange('tableData')}>
                            All Cages
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button variant="contained" onClick={() => handleTableChange('openVetCallsTable')}>
                            Open Calls
                        </Button>
                    </Grid>
                </Grid>
            )}
            <Grid item xs={12} alignContent='center' alignItems="center" justifyContent="center" style={{display:"flex", justifyContent:'cetner'}} >
                {activeTable === 'tableData' ? <TableData setRefetch={setRefetch} tableRows={tableRows} /> : null}
                {role != 3 && activeTable === 'openVetCallsTable' ? < OpenVetCallsTable tableRows={openVetCallsRows} setRefetch={setRefetch} /> : null}

            </Grid>
        </Grid>
    );
}

TableWrapper.propTypes = {
    role: PropTypes.number.isRequired,
};
