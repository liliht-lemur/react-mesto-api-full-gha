import { useState } from "react";

function Login(props) {
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
    props.handleLogin(formValue);
    setFormValue({ email: "", password: "" });
  };

  return (
    <section className="login">
      <h2 className="login__title">Вход</h2>
      <form className="login__form" onSubmit={handleSubmit}>
        <input className="login__input" name="email" type="email" placeholder="Email" value={formValue.email} onChange={handleChange} required />
        <input className="login__input" name="password" type="password" placeholder="Пароль" value={formValue.password} onChange={handleChange} required />
        <button className="login__btn" type="submit">Войти</button>
      </form>
    </section>
  );
}

export default Login;



