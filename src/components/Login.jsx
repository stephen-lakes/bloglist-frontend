function LoginForm({
  handleLogin,
  setUsername,
  setPassword,
  username,
  password,
}) {
  return (
    <>
      <div className="login-form-container">
        <form onSubmit={handleLogin} className="login-form">
          <h2>log in to the application</h2>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              onChange={({ target }) => setUsername(target.value)}
              type="text"
              value={username}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              id="password"
              onChange={({ target }) => setPassword(target.value)}
              type="password"
              value={password}
              className="form-input"
            />
          </div>
          <input type="submit" value="Login" className="form-submit" />
        </form>
      </div>
    </>
  );
}

export default LoginForm;
