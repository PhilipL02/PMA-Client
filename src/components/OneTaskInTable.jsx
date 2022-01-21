import React, { useState } from 'react'

import { clsx } from '../utils/utils'
import { SERVER_URL } from '../utils/constants'

const priorities = {
    high: 'Hög',
    low: 'Låg',
}

const statuses = {
    idle: 'Inte igång',
    inProgress: 'Pågående',
    completed: 'Klar'
}

const OneTaskInTable = ({ task, userID, buildingAdminUserID, buildingMembers, deleteTask, takeOnTask, removeFromTask, leaveTask, taskCompleted, taskNotCompleted }) => {

    const [showTakeOnTaskView, setShowTakeOnTaskView] = useState()
    const [approxTimeInput, setApproxTimeInput] = useState()
    const [approxCostInput, setApproxCostInput] = useState()
    const [commentInput, setCommentInput] = useState()
    const [showInfo, setShowInfo] = useState()

    function getMemberName(memberUserID) {
        if(!buildingMembers) return
        const member = buildingMembers.filter(m => m._id === memberUserID)[0]
        return member?.name
    }

    return (
        <>
        <div className='oneTask'>
            <div>
                {task.taskName}
                {buildingAdminUserID === userID && <button onClick={() => deleteTask(task._id)}>Ta bort</button>}
            </div>
            <div>{priorities[task.priority]}</div>
            <div className={clsx({
                status_inProgress: task.status === "inProgress",
                status_completed: task.status === "completed",
            })}>{statuses[task.status]}</div>
            <div>{task.assignedToUser ? getMemberName(task.assignedToUser) : ""} {task.assignedToUser === userID ? "(Du)" : null}</div>
            <div>
                {task.status === "idle"
                    && <button onClick={() => setShowTakeOnTaskView(v=>!v)}>Ta an uppgift</button>
                }
                {task.status === "inProgress" 
                    && <>
                        {task.assignedToUser === userID && 
                            <button onClick={() => leaveTask(task._id)}>Lämna uppgift</button>
                        }
                        {(task.assignedToUser === userID || buildingAdminUserID === userID) &&
                            <>
                                <button onClick={() => taskCompleted(task._id)}>Markera som klar</button> 
                                <button onClick={() => setShowInfo(v=>!v)}>Visa info</button>
                            </>
                        } 
                        {task.assignedToUser && task.assignedToUser !== userID && buildingAdminUserID === userID && 
                            <button onClick={() => removeFromTask(task._id)}>Ta bort arbetare</button>
                        }
                    </>
                }
                {task.status === "completed" 
                    && <>
                        {(task.assignedToUser === userID || buildingAdminUserID === userID) &&
                            <>
                                <button onClick={() => taskNotCompleted(task._id)}>Markera som EJ klar</button>
                                <button onClick={() => setShowInfo(v=>!v)}>Visa info</button>
                            </>
                        } 
                    </>
                }
            </div>
        </div>
        {showTakeOnTaskView &&  
            <div>
                <form onSubmit={e => (e.preventDefault(), takeOnTask(task._id, approxTimeInput, approxCostInput, commentInput), setShowTakeOnTaskView(false))}>
                    <label htmlFor='approxTime'>Ungefärlig tid</label>
                    <input type="text" id='approxTime' onChange={e => setApproxTimeInput(e.target.value)}/>
                    <br/>
                    <label htmlFor='approxCost'>Ungefärlig kostnad</label>
                    <input type="text" id='approxCost' onChange={e => setApproxCostInput(e.target.value)}/>
                    <br/>
                    <label htmlFor='comment'>Kommentar</label>
                    <textarea id='comment' onChange={e => setCommentInput(e.target.value)}/>
                    <input type="submit" value="Ta an"/>
                </form>
            </div>
        }
        {showInfo && 
            <div>
                <div>Ungefärlig tid: {task.approxTime}</div>
                <div>Ungefärlig kostnad: {task.approxCost}</div>
                <div>Kommentar: {task.comment}</div>
            </div>
        }
        </>
    )
}

export default OneTaskInTable
