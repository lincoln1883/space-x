import React from 'react';
import { useSelector } from 'react-redux';
import { getAllRockets } from '../redux/rockets/rocketsSlice';
import { selectMissions } from '../redux/missions/missionsSlice';

const Profile = () => {
  const rockets = useSelector(getAllRockets);
  const reservedRockets = rockets.filter((rocket) => rocket.reserved);
  const missions = useSelector(selectMissions);
  const reservedMissions = missions.filter((mission) => mission.reserved);

  return (
    <div className="d-flex justify-content-evenly ">
      <div className="d-flex flex-column w-100 p-3">
        <h2>My Missions</h2>
        {reservedMissions.length === 0 && <p className="fs-4">You have no missions reserved</p>}
        <ul className="container-fluid d-flex flex-column justify-content-center ps-0 me-5 list-unstyled">
          {reservedMissions.map((item) => (
            <li
              className="border border-success p-2 border-opacity-25"
              key={item.mission_id}
            >
              <p className="mb-0 fs-5">{item.mission_name}</p>
            </li>
          ))}
        </ul>
      </div>
      <div className="d-flex flex-column w-100 p-3">
        <h2>My Rockets</h2>
        {reservedRockets.length === 0 && <p className="fs-4">You have no rockets reserved</p>}
        <ul className="container-fluid d-flex flex-column justify-content-center ps-0 me-5 list-unstyled">
          {reservedRockets.map((item) => (
            <li
              className="border border-success p-2 border-opacity-25"
              key={item.id}
            >
              <p className="mb-0 fs-5">{item.name}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Profile;
