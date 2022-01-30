import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import OneTaskInTable from './OneTaskInTable'
import { useGlobal } from '../../providers/GlobalProvider';

const TasksForBuilding = ({ building, tasks, getTasks, buildingAdminUserID, buildingMembers }) => {

    const { userID, phetch } = useGlobal()

    // async function takeOnTask(taskID, approxCost, approxTime, comment) {
    //     let response = await phetch('/tasks/take', {
    //         method: 'POST',
    //         body: {
    //             taskID,
    //             approxCost,
    //             approxTime,
    //             comment
    //         }
    //     })
    //     console.log(response)
    //     if(response?.success) getTasks()
    // }

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
                    {(tasks && !!tasks.length) ?
                        <>
                            <table id='myTable'>
                                <thead>
                                    <tr>
                                        <th onClick={() => sortTable(0)}>Uppgift</th>
                                        <th onClick={() => sortTable(1)}>Status</th>
                                        <th onClick={() => sortTable(2)}>Arbetare</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tasks && tasks.map(t => (
                                        <OneTaskInTable key={t._id} task={t} buildingAdminUserID={buildingAdminUserID} userID={userID} buildingMembers={buildingMembers} /*takeOnTask={takeOnTask} deleteTask={deleteTask} removeFromTask={removeFromTask} leaveTask={leaveTask} taskCompleted={taskCompleted} taskNotCompleted={taskNotCompleted}*//>
                                    ))}
                                </tbody>
                            </table>
                        </>
                        : <p style={{textAlign: "center", backgroundColor: 'white', boxShadow: '0 5px 10px #b9c1cf', padding: '0.65rem'}}>Finns inte några uppgifter...</p>
                    }
                </div>
            }
        </>
    )
};

export default TasksForBuilding;
