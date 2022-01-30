import React from 'react';

const OneMyBuildings = ({ building, selectBuilding }) => {
    return (
        <div className='oneMyBuildings' onClick={() => selectBuilding(building)}>
            {building.buildingName}
        </div>
    )
};

export default OneMyBuildings;
