import React from 'react';
import PropTypes from 'prop-types';
import { AiOutlineLink } from 'react-icons/ai';

class Input extends React.Component {
  render() {
    const {
      children,
      id,
      type,
      checked,
      value,
      breakline,
      onChange,
      placeholder,
      rightLabel,
      icon,
    } = this.props;
    const line = breakline ? <br /> : undefined;
    return (
      <label htmlFor={ id }>
        { rightLabel || children }
        { line }
        {' '}
        { icon && <AiOutlineLink /> }
        <input
          id={ id }
          type={ type }
          data-testid={ id }
          value={ value }
          checked={ checked }
          onChange={ onChange }
          placeholder={ placeholder }
        />
        { rightLabel && children }
      </label>
    );
  }
}

Input.propTypes = {
  breakline: PropTypes.bool,
  children: PropTypes.string,
  id: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  rightLabel: PropTypes.bool,
  type: PropTypes.string.isRequired,
  value: PropTypes.string,
  checked: PropTypes.bool,
  icon: PropTypes.bool,
};

Input.defaultProps = {
  children: '',
  breakline: false,
  placeholder: '',
  rightLabel: false,
  checked: false,
  value: '',
  icon: false,
};

export default Input;
