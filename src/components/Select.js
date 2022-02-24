import React from 'react';
import PropTypes from 'prop-types';

class Select extends React.Component {
  render() {
    const { label, options, id, value, onChange } = this.props;
    return (
      <label htmlFor={ id }>
        { label }
        <br />
        <select id={ id } data-testid={ id } value={ value } onChange={ onChange }>
          { options.map((option) => (
            <option
              key={ `option-${option}` }
              value={ option.toLowerCase() }
            >
              {option}
            </option>
          )) }
        </select>
      </label>
    );
  }
}

Select.propTypes = {
  label: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  id: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

Select.defaultProps = {
  label: '',
};

export default Select;
