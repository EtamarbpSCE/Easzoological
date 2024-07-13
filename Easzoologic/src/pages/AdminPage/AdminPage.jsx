import React, { useState, useEffect } from 'react';
import AddCages from '../../componenets/AddCages/AddCages';



function AdminPage() {
    const [showScanner, setShowScanner] = useState(false);
   
    return (
        <div className='row'>
             <h1>Admin Page</h1>
             <AddCages />
        </div>
    );
}


export default AdminPage;
