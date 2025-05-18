import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import DeleteModal from ".";

const props = {
  onCancel: jest.fn(),
  onConfirm: jest.fn(),
};

describe("DeleteModal", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  test("renders correctly", () => {
    render(<DeleteModal {...props} />);
    expect(screen.getByTestId("delete-modal")).toBeInTheDocument();
    expect(screen.getByTestId("modal-content")).toBeInTheDocument();
    expect(
      screen.getByRole("button", {
        name: "X",
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", {
        name: "Confirm",
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", {
        name: "Cancel",
      })
    ).toBeInTheDocument();
  });
  test("calls onCancel when close button is clicked", () => {
    const onCancelMock = jest.fn();
    render(<DeleteModal {...props} onCancel={onCancelMock} />);
    fireEvent.click(
      screen.getByRole("button", {
        name: "X",
      })
    );
    expect(onCancelMock).toHaveBeenCalledTimes(1);
  });
  test("calls onConfirm when confirm button is clicked", () => {
    const onConfirmMock = jest.fn();
    render(<DeleteModal {...props} onConfirm={onConfirmMock} />);
    fireEvent.click(
      screen.getByRole("button", {
        name: "Confirm",
      })
    );
    expect(onConfirmMock).toHaveBeenCalledTimes(1);
  });
  test("calls onCancel when cancel button is clicked", () => {
    const onCancelMock = jest.fn();
    render(<DeleteModal {...props} onCancel={onCancelMock} />);
    fireEvent.click(
      screen.getByRole("button", {
        name: "Cancel",
      })
    );
    expect(onCancelMock).toHaveBeenCalledTimes(1);
  });
});
