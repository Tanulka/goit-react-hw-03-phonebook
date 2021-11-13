import PropTypes from 'prop-types';

function Filter({ filter, handleChange }) {
  return (
    <label>
      <p>Find contacts by name</p>
      <input type="text" name="search" value={filter} onChange={handleChange} autoComplete="off" />
    </label>
  );
}

Filter.prototypes = {
  filter: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default Filter;
