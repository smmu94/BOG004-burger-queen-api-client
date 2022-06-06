import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import DeliveredOrder from "../waiter/readyOrder/deliveredOrder";

describe("DeliveredOrder", () => {
    test("it renders the deliveredOrder", () => {
        render(<DeliveredOrder />);
        expect(screen.getByTestId("deliveredOrder")).toBeInTheDocument();
    })}
);
