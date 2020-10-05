import { mount, shallow } from "enzyme";
import React from "react";
import SignUpPage from "../../src/containers/SignUpPage";
import { MemoryRouter } from "react-router-dom";
import sinon from "sinon";

//Mock login response
import { login } from "../../src/services/authentication-service";
jest.mock("../../src/services/authentication-service");

jest.mock("../../src/services/authentication-service", () => {
  return {
    login: jest.fn(() => Promise.resolve(true)),
  };
});

import configureMockStore from "redux-mock-store";
import { Provider } from "react-redux";
const mockStore = configureMockStore();

describe("Unit tests for SignUpPage", () => {
  let wrapper: any;

  beforeEach(() => {
    jest.clearAllMocks();

    const props = {
      isLoggedIn: true,
    };

    wrapper = mount(<SignUpPage {...props} />);
  });

  it("success", async () => {
    let preventDefault: boolean = false;
    const fakeEvent = {
      preventDefault: () => {
        // console.log("preventDefault");
        preventDefault = true;
      },
    };
    const form = wrapper.find("form");
    const emailInput = wrapper.find("EmailInput");
    const titleSelect = wrapper.find("SelectInput");
    const passwordInput = wrapper.find("PasswordInput").at(0);
    const confirmPasswordInput = wrapper.find("PasswordInput").at(1);
    const textInput = wrapper.find("TextInput");
    // Set input data
    emailInput.setState({ value: "demo1@demo.lv" });
    passwordInput.setState({ value: "12345678" });
    confirmPasswordInput.setState({ value: "12345678" });
    textInput.setState({ value: "asdasdsad" });
    titleSelect.setState({ value: "Dr" });
    expect(form.length).toBe(1);
    await form.simulate("submit", fakeEvent);
    //Wait for redirect
    expect(wrapper.state("isSubmitted")).toBe(true);
  });

  it("validation failure", async () => {
    let preventDefault: boolean = false;
    const fakeEvent = {
      preventDefault: () => {
        // console.log("preventDefault");
        preventDefault = true;
      },
    };
    const form = wrapper.find("form");
    const emailInput = wrapper.find("EmailInput");
    const titleSelect = wrapper.find("SelectInput");
    const passwordInput = wrapper.find("PasswordInput").at(0);
    const confirmPasswordInput = wrapper.find("PasswordInput").at(1);
    const textInput = wrapper.find("TextInput");
    // Set input data
    emailInput.setState({ value: "demo1@demo.lv" });
    passwordInput.setState({ value: "12345678" });
    confirmPasswordInput.setState({ value: "123456789" });
    textInput.setState({ value: "" });
    expect(form.length).toBe(1);
    titleSelect.setState({ value: "" });
    await form.simulate("submit", fakeEvent);
    //Wait for redirect
    expect(wrapper.state("isSubmitted")).toBe(false);
  });

  it("passwords not match", async () => {
    let preventDefault: boolean = false;
    const fakeEvent = {
      preventDefault: () => {
        // console.log("preventDefault");
        preventDefault = true;
      },
    };
    const form = wrapper.find("form");
    const emailInput = wrapper.find("EmailInput");
    const titleSelect = wrapper.find("SelectInput");
    const passwordInput = wrapper.find("PasswordInput").at(0);
    const confirmPasswordInput = wrapper.find("PasswordInput").at(1);
    const textInput = wrapper.find("TextInput");
    // Set input data
    emailInput.setState({ value: "demo1@demo.lv" });
    passwordInput.setState({ value: "12345678" });
    confirmPasswordInput.setState({ value: "123456789" });
    textInput.setState({ value: "asdasdsad" });
    titleSelect.setState({ value: "Dr" });
    expect(form.length).toBe(1);
    await form.simulate("submit", fakeEvent);
    //Wait for redirect
    expect(wrapper.state("isSubmitted")).toBe(false);
  });
});
