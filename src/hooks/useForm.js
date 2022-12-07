import { useState } from 'react';

export const useForm = (
  formRef,
  initValues = {},
) => {
  const [values, setValues] = useState(initValues);
  const [errors, setErrors] = useState({});
  const [isValid, setValid] = useState(formRef.current && formRef.current.checkValidity());
  const [isLocked, setLock] = useState(false);

  const process = (e) => {
    const {
      name,
      type,
      value,
      checked,
      validationMessage = '',
    } = e.target;

    setValues({
      ...values,
      [name]: type === 'checkbox' ? checked : value,
    });
    setErrors({
      ...errors,
      [name]: validationMessage,
    });

    setValid(formRef.current.checkValidity());
  };
  const setSubmitHandler = (callback) => (e) => {
    e.preventDefault();
    setLock(true);

    return callback(values).then((result) => {
      setLock(false);
      return result;
    });
  };

  return {
    values,
    errors,
    isValid,
    isLocked,
    setValues: process,
    setSubmitHandler,
    resetValues: setValues,
  };
};
