import "@testing-library/jest-dom";
import { render, waitFor, cleanup } from "@testing-library/react";
import Routercomponent from "../Router";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import Logincontainer from "../../views/Login";
import Ordercontainer from "../../views/Order";
import Kitchencontainer from "../../views/Kitchen";
import Readyorders from "../../views/ReadyOrders";
import Admincontainer from "../../views/Adminworkers";
import AdminproductsView from "../../views/Adminproducts";



describe("App", () => {
    afterEach(() => {
        cleanup();
    });
  // test("should render Login page", async () => {
  //   const history = createMemoryHistory();
  //   render(<Routercomponent  element={<Logincontainer />} />);
  //   await waitFor(() => {
  //     expect(history.location.pathname).toBe("/");
  //   });
  // });
  test("should render Order page", async () => {
    const history = createMemoryHistory();
    render(
      <Routercomponent />
  );
    await waitFor(() => {
      expect(history.location.pathname).toBe("/order");
    });
  });
  // test("should render Kitchen page", async () => {
  //   const history = createMemoryHistory();
  //   render(<Routercomponent  element={<Kitchencontainer />} />);
  //   await waitFor(() => {
  //     expect(history.location.pathname).toBe("/kitchen");
  //   });
  // });
  // test("should render Readyorders page", async () => {
  //   const history = createMemoryHistory();
  //   render(<Routercomponent  element={<Readyorders />} />);
  //   await waitFor(() => {
  //     expect(history.location.pathname).toBe("/readyorder");
  //   });
  // });
  // test("should render Admincontainer page", async () => {
  //   const history = createMemoryHistory();
  //   render(<Routercomponent  element={<Admincontainer />} />);
  //   await waitFor(() => {
  //     expect(history.location.pathname).toBe("/admin");
  //   });
  // });
  // test("should render Adminproducts page", async () => {
  //   const history = createMemoryHistory();
  //   render(<Routercomponent  element={<AdminproductsView />} />);
  //   await waitFor(() => {
  //     expect(history.location.pathname).toBe("/admin-products");
  //   });
  // });
});
