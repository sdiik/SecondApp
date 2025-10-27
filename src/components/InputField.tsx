import React, { FC } from 'react';
import { TextInput, TextInputProps } from 'react-native';
import { commonStyles } from '../styles/commonStyles';

const InputField: FC<TextInputProps> = props => {
  return <TextInput style={commonStyles.input} {...props} />;
};

export default InputField;
