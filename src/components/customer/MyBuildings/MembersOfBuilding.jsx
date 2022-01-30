import React from 'react';

import { useCreateTask } from '../../../providers/CreateTaskProvider';

const MembersOfBuilding = ({ members }) => {

    const { shouldSelectAssignedToUser, setSelectAssignedToUser, setAssignedToUser } = useCreateTask()

    return (
        <div className='membersOfBuilding'>
            <h1>Medlemmar</h1>
            <div className='members'>
                {shouldSelectAssignedToUser ?
                    <>
                        {members.map(m => (
                            <div className='member' onClick={() => (setAssignedToUser(m), setSelectAssignedToUser(false))} key={m._id}>{m.name}</div>
                        ))}
                    </>
                :
                    <>
                        {members.map(m => (
                            <div className='member' key={m._id}>{m.name}</div>
                        ))}
                    </>
                }
              
            </div>
        </div>
    )
};

export default MembersOfBuilding;
