/* eslint-disable testing-library/no-unnecessary-act */
/* eslint-disable testing-library/prefer-find-by */
import '@testing-library/jest-dom';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import {
  render,
  fireEvent,
  waitFor,
  screen,
  act,
} from '@testing-library/react';
import Login from '../components/login';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

test('allows the user to login successfully', async () => {
  const history = createMemoryHistory();
  const { debug } = render(
    <Router location={history.location} navigator={history}>
      <Login />
    </Router>
  );
  const email = screen.getByPlaceholderText('Usuario');

  fireEvent.change(email, { target: { value: 'pepe@foodelicious.com' } });

  const password = screen.getByPlaceholderText('Contraseña');
  fireEvent.change(password, { target: { value: '123456' } });

  const button = screen.getByText('INICIAR SESIÓN');
  fireEvent.click(button);

  let errMessage;
  await waitFor(
    () => (errMessage = screen.queryByTestId('login-error-message'))
  );

  debug();

  console.log('soy errMessage', errMessage);
  expect(errMessage.textContent).toBe(
    'el usuario o la contraseña son incorrectos'
  );
});
