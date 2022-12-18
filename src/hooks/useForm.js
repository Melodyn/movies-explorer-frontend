import { useState, useEffect } from 'react';

export const useForm = (
  formRef,
  initValues = {},
) => {
  const formEl = formRef.current;
  const formFields = formEl === null ? [] : Array.from(formRef.current.querySelectorAll('.form-field'));
  const checkValidity = () => formFields.length > 0 && formFields.every(({ validity }) => validity.valid);

  const [values, setValues] = useState(initValues);
  const [errors, setErrors] = useState({});
  const [isValid, setValid] = useState(formEl !== null && checkValidity());
  const [isLocked, setLock] = useState(false);

  useEffect(() => {
    setValid(checkValidity());
  }, [formEl]);

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

    setValid(checkValidity());
  };
  const setSubmitHandler = (callback) => (e) => {
    e.preventDefault();
    setLock(true);

    if (!checkValidity()) {
      setLock(false);
      return null;
    }

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
