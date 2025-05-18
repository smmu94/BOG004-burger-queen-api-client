import { roles } from "@/utils/constants";

export const formValidation = {
  name: {
    required: "Name is required",
    minLength: {
      value: 3,
      message: "Name must be at least 3 characters",
    },
    pattern: {
      value: /^[A-Za-z\s]+$/,
      message: "Only letters and spaces allowed",
    },
  },
  email: {
    required: "Email is required",
    pattern: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: "Invalid email address",
    },
  },
  password: {
    required: "Password is required",
    minLength: {
      value: 6,
      message: "Password must be at least 6 characters",
    },
  },
  role: {
    required: "Role is required",
  },
};

export const userFields = [
  {
    name: "name",
    label: "Full Name",
    rules: formValidation.name,
  },
  {
    name: "email",
    label: "Email",
    type: "email",
    rules: formValidation.email,
  },
  {
    name: "password",
    label: "Password",
    type: "password",
    rules: formValidation.password,
  },
  {
    name: "role",
    label: "Role",
    type: "select",
    rules: formValidation.role,
    options: [
      { value: "", label: "Select Role", disabled: true },
      { value: roles.admin, label: "Admin" },
      { value: roles.waiter, label: "Waiter" },
      { value: roles.chef, label: "Chef" },
    ],
  },
];

export const initialUserValues = {
  name: "",
  email: "",
  password: "",
  role: "",
  photo: null,
};
