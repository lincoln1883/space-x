import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { reservedRocket, cancelReservation } from '../redux/rockets/rocketsSlice';

const Rocket = ({
  name, image, description, reserved, id,
}) => {
  const dispatch = useDispatch();

  const handleReserve = () => {
    dispatch(reservedRocket(id));
  };

  const handleCancel = () => {
    dispatch(cancelReservation(id));
  };

  return (
    <>
      <li className="d-flex gap-3 mb-4">
        <img width="200" height="200" src={image} alt={name} />
        <div className="flex flex-col gap-3">
          <h3>{name}</h3>
          <p>
            {reserved ? <span className="text-center fs-6 px-1 bg-success me-1 text-white rounded-pill">Reserved</span> : ''}
            {description}
          </p>
          {reserved ? (
            <button className="btn btn-outline-danger" type="button" onClick={handleCancel}>Cancel Reservation</button>
          ) : (
            <button className="btn btn-primary" type="button" onClick={handleReserve}>Reserve Rocket</button>
          )}
        </div>
      </li>
    </>
  );
};

Rocket.propTypes = {
  id: PropTypes.string.isRequired,
  reserved: PropTypes.bool,
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

Rocket.defaultProps = {
  reserved: false,
};

export default Rocket;
