import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
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
    expect(screen.getByTestId("close-modal")).toBeInTheDocument();
    expect(screen.getByTestId("confirm-delete")).toBeInTheDocument();
    expect(screen.getByTestId("cancel-delete")).toBeInTheDocument();
  });
  test("calls onCancel when close button is clicked", () => {
    const onCancelMock = jest.fn();
    render(<DeleteModal {...props} onCancel={onCancelMock} />);
    fireEvent.click(screen.getByTestId("close-modal"));
    expect(onCancelMock).toHaveBeenCalledTimes(1);
  });
  test("calls onConfirm when confirm button is clicked", () => {
    const onConfirmMock = jest.fn();
    render(<DeleteModal {...props} onConfirm={onConfirmMock} />);
    fireEvent.click(screen.getByTestId("confirm-delete"));
    expect(onConfirmMock).toHaveBeenCalledTimes(1);
  });
  test("calls onCancel when cancel button is clicked", () => {
    const onCancelMock = jest.fn();
    render(<DeleteModal {...props} onCancel={onCancelMock} />);
    fireEvent.click(screen.getByTestId("cancel-delete"));
    expect(onCancelMock).toHaveBeenCalledTimes(1);
  });
});
