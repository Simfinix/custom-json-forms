import invariant from 'invariant';
import { createAutoField } from 'uniforms';

export { AutoFieldProps } from 'uniforms';

import TextField from './TextField';
import NumField from './NumField';
import BoolField from './BoolField';
import DateField from './DateField';
// import ListField from './ListField';
import RadioField from './RadioField';
// import SelectField from './SelectField';

const AutoField = createAutoField((props) => {
  if (props.allowedValues) {
    return RadioField;
    // return props.checkboxes && props.fieldType !== Array
    //   ? ListField
    //   : SelectField;
  }

  switch (props.fieldType) {
    case Boolean:
      return BoolField;
    case Date:
      return DateField;
    case Number:
      return NumField;
    case String:
      return TextField;
  }

  return invariant(false, 'Unsupported field type: %s', props.fieldType);
});

export default AutoField;
