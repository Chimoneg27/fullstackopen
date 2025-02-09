const LoginForm = ({ handleLogin, username, password, setPassword, setUsername, loginVisible, setLoginVisible }) => {
  const hideWhenVisible = { display: loginVisible ? 'none' : '' }
  const showWhenVisible = { display: loginVisible ? '' : 'none' }
  
  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={() => setLoginVisible(true)}>log in</button>
      </div>
      <form onSubmit={handleLogin} style={showWhenVisible}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            value={username}
            name="username"
            id="username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            value={password}
            name="password"
            id="password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">log in</button>
      </form>
      <button onClick={() => setLoginVisible(false)}>cancel</button>
    </div>
  )
}

export default LoginForm