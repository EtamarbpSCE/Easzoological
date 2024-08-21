import * as React from 'react';
import { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { Button, TextField, Grid } from '@mui/material';
import TableData from './DataTable';
import OpenVetCallsTable from './OpenVetCallsTable';
import api from '../../constants/axios.config';
import FeedingLog from './FeedingLog';

export default function AdminTables({ role }) {
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
            const tableDataRow = await api.get('/info/feed_log');
            console.log(tableDataRow.data)
            setTableRows(tableDataRow.data || []);
        } catch(e){
            console.log(e)
        }
        // console.log(tableDataRow)
    };

    const fetchOpenVetCallsData = async () => {
        try{
            const openalls = await api.get('/info/vet_calls_logs');
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
            <Grid item xs={12} justifyContent='center'  container spacing={1}>
                <Grid item>
                    <Button variant="contained" onClick={() => handleTableChange('feedLog')}>
                        Feed Log
                    </Button>
                </Grid>
                <Grid item>
                    <Button variant="contained" onClick={() => handleTableChange('TreatmentLog')}>
                        Open Calls
                    </Button>
                </Grid>
            </Grid>
            <Grid item xs={12} alignContent='center' alignItems="center" justifyContent="center" style={{display:"flex", justifyContent:'cetner'}} >
                { activeTable === 'feedLog' ? <FeedingLog setRefetch={setRefetch} tableRows={tableRows} /> : null} 
                { activeTable === 'TreatmentLog' ? < OpenVetCallsTable tableRows={openVetCallsRows} setRefetch={setRefetch} /> : null} 
            </Grid>
        </Grid>
    );
}

AdminTables.propTypes = {
    role: PropTypes.number.isRequired,
};
