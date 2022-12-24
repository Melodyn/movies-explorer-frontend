import './Profile.css';
import {
  useRef,
  useContext,
  useState,
  useEffect,
} from 'react';
import cn from 'classnames';
import { useForm } from '../../hooks/useForm';
import { UserContext } from '../../contexts/User';

const processErrorsMessages = (errors) => Object
  .entries(errors)
  .filter(([, message]) => message.length > 0)
  .map(([name, message]) => `${name}: ${message}`)
  .join('\n');

export const Profile = ({ onLogout, onEdit, apiMain }) => {
  const currentUser = useContext(UserContext);
  const formRef = useRef(null);
  const {
    values,
    errors,
    isValid,
    isLocked,
    setValues,
    setSubmitHandler,
    resetValues,
  } = useForm(formRef, {
    email: currentUser.email,
    name: currentUser.name,
  });
  const [apiError, setApiError] = useState('');

  const formIsValid = (isValid || isValid === null);
  const edit = (data) => apiMain.setInfo(data)
    .then(onEdit)
    .catch((err) => {
      setApiError(err.message);
    });
  const onSubmit = setSubmitHandler(edit);

  useEffect(() => {
    resetValues({
      email: currentUser.email,
      name: currentUser.name,
    });
  }, [currentUser.email, currentUser.name]);

  return (
    <main className="main profile-form-container">
      <form action="/" name="edit" className="profile-form" onSubmit={onSubmit} ref={formRef}>
        <div className="profile-form__fields-wrapper">
          <h1 className="profile-form__header">
            Здарова,
            {' '}
            {currentUser.name}
          </h1>

          <fieldset className="profile-form__fields">
            <label className="profile-form__label" htmlFor="name">
              <span
                className="profile-form__field-name"
              >
                Никнейм
              </span>
              <input
                type="text"
                name="name"
                id="name"
                className="profile-form__field form-field"
                minLength={3}
                required
                disabled={isLocked}
                value={values.name}
                onChange={setValues}
              />
            </label>
            <hr />
            <label
              className="profile-form__label profile-form__label_borderless"
              htmlFor="email"
            >
              <span
                className="profile-form__field-name"
              >
                Почта
              </span>
              <input
                type="email"
                name="email"
                id="email"
                className="profile-form__field form-field"
                required
                disabled={isLocked}
                value={values.email}
                onChange={setValues}
              />
            </label>
          </fieldset>
        </div>

        <fieldset className="profile-form__fields profile-form__fields_flex">
          <span
            className="profile-form__field-error"
          >
            {apiError || processErrorsMessages(errors)}
          </span>
          <button
            type="submit"
            className={cn(
              { animation: (isValid && !isLocked) },
              'button profile-form__button profile-form__button_action_edit',
            )}
            disabled={!formIsValid || isLocked}
          >
            Редактировать
          </button>

          <button
            type="button"
            className="animation button profile-form__button profile-form__button_action_logout"
            onClick={onLogout}
          >
            Выйти из аккаунта
          </button>
        </fieldset>
      </form>
    </main>
  );
};
