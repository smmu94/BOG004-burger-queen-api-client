import { render, fireEvent, screen } from "@testing-library/react";
import ReadyOrder from ".";

const summaryProducts = [
  {
    id: 2,
    name: "Café americano",
    price: 500,
    quantity: 1,
    type: "Desayuno",
  },
];

describe("ReadyOrder", () => {
  test("it renders the deliveredOrder", () => {
    const handleClick = jest.fn();
    render(
      <ReadyOrder
        product={summaryProducts}
        addDeliveredOrder={handleClick}
        resetReadyOrder={handleClick}
      />
    );
    const buttonDeliver = screen.getByTestId("btn-order");
    fireEvent.click(buttonDeliver);
    expect(handleClick).toHaveBeenCalled();
  });
});
