import '@testing-library/jest-dom';
import { render, waitFor, screen, fireEvent } from '@testing-library/react';
import Navbar from '../navBar';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

describe('navBar', () => {
  beforeEach(() => {
    window.sessionStorage = { setItem: jest.fn() };
    window.JSON = { stringify: jest.fn(), parse: jest.fn() };
    const user = {
      name: 'Ana Pérez',
      email: 'anita.borg@systers.xyz',
      password: '$2a$10$itZyq8s85',
      roles: 'admin',
      id: 1,
    };
    window.sessionStorage.setItem('user', JSON.stringify(user));
  });

  test('muestra el navBar', async () => {
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <Navbar />
      </Router>
    );
    const logOutIcon = screen.getByTestId('logout');
    fireEvent.click(logOutIcon);

    await waitFor(() => {
      expect(history.location.pathname).toBe('/');
    });
  });
});
