import React from 'react';
import {useFormikContext} from 'formik';
import {Button} from 'react-native-paper';

function SubmitButton({title, loading}) {
  const {handleSubmit} = useFormikContext();

  return (
    <Button
      loading={loading}
      disabled={loading}
      mode="contained"
      onPress={handleSubmit}>
      {title}
    </Button>
  );
}

export default SubmitButton;
