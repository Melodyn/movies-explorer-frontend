import './Profile.css';

export const Profile = () => (
  <main className="main profile-form-container">
    <form action="/" name="edit" className="profile-form">
      <div className="profile-form__fields-wrapper">
        <h1 className="profile-form__header">Здарова, бандиты</h1>

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
              className="profile-form__field"
              value="Пепега"
              disabled
            />
          </label>
          <hr />
          <label className="profile-form__label" htmlFor="email">
            <span
              className="profile-form__field-name"
            >
              Почта
            </span>
            <input
              type="email"
              name="email"
              id="email"
              className="profile-form__field"
              value="pepe@ga.ga"
              disabled
            />
          </label>
        </fieldset>
      </div>

      <fieldset className="profile-form__fields profile-form__fields_flex">
        <span
          className="profile-form__field-error"
        />
        <button
          type="button"
          className="animation button profile-form__button profile-form__button_action_edit"
        >
          Редактировать
        </button>
        <button
          type="button"
          className="animation button profile-form__button profile-form__button_action_logout"
        >
          Выйти из аккаунта
        </button>
      </fieldset>
    </form>
  </main>
);
