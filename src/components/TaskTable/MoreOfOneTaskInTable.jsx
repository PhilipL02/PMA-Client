import React from 'react';

const priorities = {
    high: 'Hög',
    low: 'Låg',
}

const MoreOfOneTaskInTable = ({ task, worker, userID }) => {
    return (
        <div className='more'>
            <p>Prioritet: {priorities[task.priority]}</p>
            <p>Tog an uppgift: (datum/dag/hur länge sedan)</p>
            <p>Deadline: (datum/tid kvar)</p>
            <p>Ungefärlig kostnad: {task.approxCost}</p>
            <p>Ungefärlig tid: {task.approxTime}</p>
            <b>Kommentarsfält</b>
        </div>
    )
};

export default MoreOfOneTaskInTable;
