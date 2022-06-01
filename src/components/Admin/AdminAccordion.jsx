import React from 'react'
// import Accordion from '@mui/material/Accordion';
// import AccordionDetails from '@mui/material/AccordionDetails';
// import AccordionSummary from '@mui/material/AccordionSummary';
// import Typography from '@mui/material/Typography';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const AdminAccordion = ({ tableID, keys, rowValues, valueKeys, accordionDetails, children, ...props }) => {
    return (
        <div {...props}>
            <div style={{display: 'flex', padding: `0.75rem 2.5rem 0.75rem 1rem`, backgroundColor: 'rgb(230, 230, 230)', fontWeight: 'bold', border: '1px solid gray'}}>
                {keys?.map((key, i) => (
                    <div key={i} style={{flex: 1, textAlign: 'center'}}>{key}</div>
                ))}
            </div>
            {children}
        </div>
    )
}

export default AdminAccordion