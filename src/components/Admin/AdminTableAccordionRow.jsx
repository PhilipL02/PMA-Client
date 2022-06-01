import React from 'react'
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { useAdminAccordion } from '../../providers/AdminAccordionProvider';

const AdminTableAccordionRow = ({ id, row, valueKeys, accordionDetails }) => {

    const { expanded, handleChange } = useAdminAccordion()

    return (
        <Accordion key={id} expanded={expanded === id} onChange={handleChange(id)}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
                sx={{borderBottom: '1px solid rgb(205, 205, 205)'}}
            >
                {valueKeys?.map((key, i) => (
                    <Typography key={i} sx={{ width: `${100/valueKeys.length}%`, textAlign: 'center', fontSize: '0.85rem' }}>
                        {row[key] ?? '-'}
                    </Typography>
                ))}
            </AccordionSummary>
            <AccordionDetails sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.75rem' }}>
                {accordionDetails}
            </AccordionDetails>
        </Accordion>
    )
}

export default AdminTableAccordionRow