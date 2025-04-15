import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import AdminFormWorkers from ".";

jest.mock("../../../../providers/UserProvider.js");

window.BroadcastChannel = function () {
  this.name = "";
  this.close = jest.fn();
  this.postMessage = jest.fn();
};

const users = [
  {
    name: "Ana Pérez",
    email: "anita.borg@systers.xyz",
    password: "$2a$10$itZyq8s85",
    roles: {
      admin: true,
    },
    id: 1,
  },
];

describe("AdminFormWorkers test", () => {
  test("deberia registrar un empleado", async () => {
    render(<AdminFormWorkers editUser={users} />);

    const userName = screen.getByTestId("name-worker");
    fireEvent.change(userName, { target: { value: "Ana Pérez" } });
    const userEmail = screen.getByTestId("email-worker");
    fireEvent.change(userEmail, {
      target: { value: "anita.borg@systers.xyz" },
    });
    const userPassword = screen.getByTestId("password-worker");
    fireEvent.change(userPassword, { target: { value: "$2a$10$itZyq8s85" } });
    const userRoles = screen.getByTestId("roles-worker");
    fireEvent.change(userRoles, { target: { value: "admin" } });
    const button = screen.getByText("REGISTRAR");
    fireEvent.click(button);
    // let message = await screen.findByText('Pedido enviado');
    await waitFor(
      () => {
        const message = screen.queryByTestId("created-order");

        expect(message.textContent).toBe("Usuario creado correctamente");
      },
      { timeout: 3000 }
    );
  });

  test("debería actualizar los datos del  empleado", () => {
    const edit = jest.fn();
    const onClick = () => {
      edit(true);
    };
    const onClickUpdate = jest.fn();
    // const edit = jest.fn();
    render(<AdminFormWorkers editUser={onClickUpdate} edit={onClick} />);
    const updateIcon = screen.getByTestId("update-worker");
    fireEvent.click(updateIcon);

    expect(onClickUpdate).toHaveBeenCalled();
  });
});
