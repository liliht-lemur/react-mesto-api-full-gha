import { useState } from "react";
import { Link } from "react-router-dom";

function Register(props) {
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });

  const handleChange = (evt) => {
    const { name, value } = evt.target;

    setFormValue({
      ...formValue,
      [name]: value,
    });
  };
  const handleSubmit = (evt) => {
    evt.preventDefault();
    props.handleRegister(formValue);
  };

  return (
    <section className="login">
      <h2 className="login__title">Регистрация</h2>
      <form className="login__form" onSubmit={handleSubmit}>
        <input className="login__input" name="email" type="email" placeholder="Email" value={formValue.email} onChange={handleChange} required />
        <input className="login__input" name="password" type="password" placeholder="Пароль" value={formValue.password} onChange={handleChange} required />
        <button className="login__btn" type="submit">Зарегистрироваться</button>
      </form>
      <p className="login__text">Уже зарегистрированы? <Link to="/sign-in" className="login__link">Войти</Link> </p>
    </section>
  );
}

export default Register;



