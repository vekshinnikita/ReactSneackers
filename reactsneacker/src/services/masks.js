import PropTypes from "prop-types";
import React from 'react';
import { IMaskInput } from "react-imask";

export const DateMask = React.forwardRef(function DateMask(props, ref) {
    const { onChange, ...other } = props;
    return (
      <IMaskInput
        {...other}
        mask="#0.$0.&?00"
        definitions={{
          "#": /[0-3]/,
          "$": /[0,1]/,
          "&": /[2,1]/,
          '?': /[9,0]/,
        }}
        inputRef={ref}
        onAccept={(value) => onChange({ target: { name: props.name, value } })}
        overwrite
      />
    );
  });
  
  DateMask.propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
  };
  
export const PhoneMask = React.forwardRef(function PhoneMask(props, ref) {
      const { onChange, ...other } = props;
      return (
        <IMaskInput
          {...other}
          mask="+7 (#00) 000-00-00"
          definitions={{
            "#": /[1-9]/,
          }}
          inputRef={ref}
          onAccept={(value) => onChange({ target: { name: props.name, value } })}
          overwrite
        />
      );
    });
    
    PhoneMask.propTypes = {
      name: PropTypes.string.isRequired,
      onChange: PropTypes.func.isRequired
    };
  
  
export const handleChange = (event, values, setValues) => {
      setValues({
        ...values,
        [event.target.name]: event.target.value.trim()
      });
    };
