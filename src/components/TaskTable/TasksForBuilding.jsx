import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import OneTaskInTable from './OneTaskInTable'
import { useGlobal } from '../../providers/GlobalProvider';
import { useData } from '../../providers/DataProvider';
import { clsx } from '../../utils/utils';

const TasksForBuilding = ({ building, tasks, getTasks, isOwner, buildingMembers }) => {

    const { userID, phetch } = useGlobal()
    const { getMyTasks, myTasks } = useData()

    const [visibleTasksInHouse, setVisibleTasksInHouse] = useState()

    useEffect(() => {
        if(!(tasks && myTasks)) return
        setVisibleTasksInHouse(tasks.filter(t => (
            (myTasks.find(mT => mT._id === t._id) || t.status === 'idle') || isOwner
        )))
    }, [tasks, myTasks])

    async function deleteTask(taskID) {
        let response = await phetch('/tasks/delete', {
            method: 'POST',
            body: {
                buildingID: building._id,
                taskID: taskID,
            }
        })
        console.log(response)
        if(response?.success) {
            getTasks()
            getMyTasks()
        }
    }

    function sortTable(n) {
        var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
        table = document.getElementById("myTable");
        switching = true;
        //Set the sorting direction to ascending:
        dir = "asc"; 
        /*Make a loop that will continue until
        no switching has been done:*/
        while (switching) {
            //start by saying: no switching is done:
            switching = false;
            rows = table.rows;
            /*Loop through all table rows (except the
            first, which contains table headers):*/
            for (i = 1; i < (rows.length - 1); i++) {
                //start by saying there should be no switching:
                shouldSwitch = false;
                /*Get the two elements you want to compare,
                one from current row and one from the next:*/
                x = rows[i].getElementsByTagName("TD")[n];
                y = rows[i + 1].getElementsByTagName("TD")[n];
                /*check if the two rows should switch place,
                based on the direction, asc or desc:*/
                if (dir == "asc") {
                    if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                        //if so, mark as a switch and break the loop:
                        shouldSwitch= true;
                        break;
                    }
                } else if (dir == "desc") {
                    if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                        //if so, mark as a switch and break the loop:
                        shouldSwitch = true;
                        break;
                    }
                }
            }
            if (shouldSwitch) {
                /*If a switch has been marked, make the switch
                and mark that a switch has been done:*/
                rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                switching = true;
                //Each time a switch is done, increase this count by 1:
                switchcount ++;      
            } else {
                /*If no switching has been done AND the direction is "asc",
                set the direction to "desc" and run the while loop again.*/
                if (switchcount == 0 && dir == "asc") {
                    dir = "desc";
                    switching = true;
                }
            }
        }
    }

    return (
        <>
            {building && 
                <div className='tasksForBuilding'>
                    <div className='aboveTable'>
                        <p>Uppgifter för</p>
                        <h1>{building.buildingName}</h1>
                    </div>
                    {(visibleTasksInHouse && !!visibleTasksInHouse.length) ?
                        <>
                            <table id='myTable'>
                                <thead>
                                    <tr>
                                        <th onClick={() => sortTable(0)}>Uppgift</th>
                                        <th onClick={() => sortTable(1)}>Status</th>
                                        <th onClick={() => sortTable(2)}>Prioritet</th>
                                        <th onClick={() => sortTable(3)}>Arbetare</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {visibleTasksInHouse && visibleTasksInHouse.map(t => {
                                        return (
                                            <OneTaskInTable key={t._id} task={t} isOwner={isOwner} userID={userID} buildingMembers={buildingMembers} deleteTask={deleteTask}/>
                                        )
                                    })}
                                    
                                </tbody>
                            </table>
                        </>
                        : <p style={{textAlign: "center", backgroundColor: 'white', boxShadow: '0 5px 10px #b9c1cf', padding: '0.65rem'}}>Finns inte några uppgifter...</p>
                    }
                </div>
            }
            {/* <button onClick={() => setClicked(v => !v)}>KLICKA</button> */}
        </>
    )
};

export default TasksForBuilding;
