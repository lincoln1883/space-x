import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMissions, joinMission, leaveMission } from '../redux/missions/missionsSlice';

const MissionList = () => {
  const missions = useSelector((state) => state.missions.missions);
  const loading = useSelector((state) => state.missions.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    if (missions.length === 0) {
      dispatch(fetchMissions());
    }
  }, [dispatch, missions]);

  const handleJoinMission = (missionId) => {
    dispatch(joinMission({ missionId }));
  };

  const handleLeaveMission = (missionId) => {
    dispatch(leaveMission({ missionId }));
  };

  if (loading === 'idle') {
    return <div>Loading...</div>;
  }

  return (
    <div className="container-fluid ms-5 me-5" data-testid="mission-item">
      <table className="table table-bordered table-striped">
        <thead className="tableHead">
          <tr>
            <th><strong>Mission</strong></th>
            <th><strong>Description</strong></th>
            <th><strong>Status</strong></th>
          </tr>
        </thead>
        <tbody>
          {missions.map((mission) => (
            <tr key={mission.mission_id}>
              <td className="col-1"><strong>{mission.mission_name}</strong></td>
              <td className="col-8">{mission.description}</td>
              <td>
                <div className={`member ${mission.reserved ? 'btn btn-primary px-3' : 'btn btn-secondary px-3'}`}>
                  {mission.reserved ? 'Active Member' : 'NOT A MEMBER'}
                </div>
              </td>
              <td>
                {mission.reserved ? (
                  <button type="button" className="btn btn-outline-danger" onClick={() => handleLeaveMission(mission.mission_id)}>
                    Leave Mission
                  </button>
                ) : (
                  <button
                    type="button"
                    className="joinM btn btn-light px-3"
                    onClick={() => handleJoinMission(mission.mission_id)}
                  >
                    Join Mission
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MissionList;
