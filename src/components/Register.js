import React, { useState } from 'react';
import store from '../store';
import { REGISTER_REQUEST } from './duck';

export default () => {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);

  const onSubmitHandler = e => {
    e.preventDefault();
    store.dispatch({ type: REGISTER_REQUEST, payload: { username, password, confirmPassword } });
  };

  return (
    <form onSubmit={e => onSubmitHandler(e)}>
      <input
        type="text"
        name="username"
        placeholder="username.."
        value={username || ''}
        onChange={e => setUsername(e.target.value)}
      />
      {username === '' && <span>username is required</span>}
      <br />
      <input
        type="text"
        name="password"
        placeholder="password.."
        value={password || ''}
        onChange={e => setPassword(e.target.value)}
      />
      {password === '' && <span>password is required</span>}
      <br />
      <input
        type="text"
        name="confirmPassword"
        placeholder="confirm password.."
        value={confirmPassword || ''}
        onChange={e => setConfirmPassword(e.target.value)}
      />
      {password !== confirmPassword && confirmPassword && <span>confirm wrong!</span>}
      <br />
      <button type="submit">Submit</button>
    </form>
  );
};
