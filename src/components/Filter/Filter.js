import { PropTypes } from 'prop-types';

function Filter({ value, onChangeFilter }) {
  return (
    <label>
      Find contact by name
      <input type="text" value={value} onChange={onChangeFilter} />
    </label>
  );
}

Filter.propTypes = {
  value: PropTypes.string,
  onChangeFilter: PropTypes.func,
};

export default Filter;
