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
    <div data-testid="mission-item">
      <table className="table table-bordered table-striped">
        <thead className="tableHead">
          <tr>
            <th>Mission</th>
            <th>Description</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {missions.map((mission) => (
            <tr key={mission.mission_id}>
              <td>{mission.mission_name}</td>
              <td>{mission.description}</td>
              <td>
                <div className={`member ${mission.reserved ? 'activeMem' : 'not-member'}`}>
                  {mission.reserved ? 'Active Member' : 'NOT A MEMBER'}
                </div>
              </td>
              <td>
                {mission.reserved ? (
                  <button type="button" className="button-leave btn btn-danger" onClick={() => handleLeaveMission(mission.mission_id)}>
                    Leave Mission
                  </button>
                ) : (
                  <button
                    type="button"
                    className="joinM btn btn-primary"
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
