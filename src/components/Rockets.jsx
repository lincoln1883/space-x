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
    if (rockets.length === 0) { dispatch(fetchRockets()); }
  }, [dispatch, rockets]);

  return (
    <>
      {loading === 'loading' && <p className="text-center fs-2">Loading...</p>}
      {!loading === 'succeeded' && !rockets.length && <p className="text-center fs-2">No Rockets Available...</p>}
      {!loading === 'succeeded' && error && <p className="text-center fs-2">Something went wrong!</p>}
      {loading === 'succeeded' && rockets.length > 0 && (
      <ul className="container d-flex flex-column mx-auto">
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
      )}
    </>
  );
};

export default Rockets;
