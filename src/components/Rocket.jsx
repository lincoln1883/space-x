import React from 'react';
import PropTypes from 'prop-types';

const Rocket = ({
  name, image, description,
}) => (
  <>
    <li className="d-flex gap-3 mb-4">
      <img width="200" height="200" src={image} alt={name} />
      <div className="flex flex-col gap-3">
        <h3>{name}</h3>
        <p>{description}</p>
        <button className="btn btn-primary" type="button">Reserve Rocket</button>
      </div>
    </li>
  </>
);

Rocket.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};
export default Rocket;
