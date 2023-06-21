import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchRockets, getAllRockets, getError, getLoading,
} from '../redux/rockets/rocketsSlice';
import Rocket from './Rocket';

const Rockets = () => {
  const rockets = useSelector(getAllRockets);
  const loading = useSelector(getLoading);
  const error = useSelector(getError);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRockets());
  }, [dispatch]);

  return (
    <>
      {loading && <p className="text-center fs-2">Loading...</p>}
      {error && <p className="text-center fs-2">{error}</p>}
      <ul className="container-fluid d-flex flex-column ms-4 me-5">
        {rockets.map((rocket) => (
          <Rocket
            key={rocket.id}
            name={rocket.name}
            image={rocket.image}
            description={rocket.description}
            reserved={rocket.reserved}
            id={rocket.id}
          />
        ))}
      </ul>
    </>
  );
};

export default Rockets;
