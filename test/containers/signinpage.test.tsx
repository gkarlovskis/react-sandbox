import { mount } from "enzyme";
import React from "react";
import SignInPage from "../../src/containers/SignInPage";
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

describe("Unit tests for SignInPage", () => {
  let wrapper: any;

  beforeEach(() => {
    jest.clearAllMocks();

    const initialState = {
      isLoggedIn: true,
    };

    const store: any = mockStore(initialState);
    wrapper = mount(
      <MemoryRouter>
        <Provider store={store}>
          <SignInPage />
        </Provider>
      </MemoryRouter>
    );
  });

  it("success", async () => {
    const fakeEvent = {
      preventDefault: () => {
        // console.log("preventDefault");
      },
    };
    const form = wrapper.find("form");
    const signInPage = wrapper.find("SignInPage");
    const spy = sinon.stub(signInPage.instance(), "reloadWin").returns("");
    const emailInput = wrapper.find("EmailInput");
    const passwordInput = wrapper.find("PasswordInput");
    // Set input data
    emailInput.setState({ value: "demo1@demo.lv" });
    passwordInput.setState({ value: "12345678" });
    expect(form.length).toBe(1);
    //Submit form
    await form.simulate("submit", fakeEvent);
    //Wait for redirect
    expect(spy.callCount).toBe(1);
  });

  it("error > Should not login if response is false", async () => {
    (login as jest.Mock).mockImplementationOnce(() => Promise.resolve(false));
    const fakeEvent = {
      preventDefault: () => {
        // console.log("preventDefault");
      },
    };
    const form = wrapper.find("form");
    const signInPage = wrapper.find("SignInPage");
    const spy = sinon.stub(signInPage.instance(), "reloadWin").returns("");
    const emailInput = wrapper.find("EmailInput");
    const passwordInput = wrapper.find("PasswordInput");
    // Set input data
    emailInput.setState({ value: "demo1@demo.lv" });
    passwordInput.setState({ value: "12345678" });
    expect(form.length).toBe(1);
    //Submit form
    await form.simulate("submit", fakeEvent);
    //Wait for redirect
    expect(spy.callCount).toBe(0);
  });

  it("error > Should not login if response throws error", async () => {
    (login as jest.Mock).mockImplementationOnce(() => Promise.reject(Error("Incorrect password or username")));
    const fakeEvent = {
      preventDefault: () => {
        // console.log("preventDefault");
      },
    };
    const form = wrapper.find("form");
    const signInPage = wrapper.find("SignInPage");
    const spy = sinon.stub(signInPage.instance(), "reloadWin").returns("");
    const emailInput = wrapper.find("EmailInput");
    const passwordInput = wrapper.find("PasswordInput");
    // Set input data
    emailInput.setState({ value: "demo1@demo.lv" });
    passwordInput.setState({ value: "12345678" });
    expect(form.length).toBe(1);
    //Submit form
    await form.simulate("submit", fakeEvent);
    //Wait for redirect
    expect(spy.callCount).toBe(0);
  });

  it("error > Should not submit data if passed data are incorrect", () => {
    const fakeEvent = {
      preventDefault: () => {
        // console.log("preventDefault");
      },
    };
    const form = wrapper.find("form");
    const signInPage = wrapper.find("SignInPage");
    const emailInput = wrapper.find("EmailInput");
    const passwordInput = wrapper.find("PasswordInput");

    // CASE 1
    // Pass input data
    emailInput.setState({ value: "" });
    passwordInput.setState({ value: "" });
    expect(form.length).toBe(1);
    form.simulate("submit", fakeEvent);
    expect(signInPage.state("isSubmitted")).toBe(false);

    // CASE 2
    // Pass input data
    emailInput.setState({ value: "demo.demo2" });
    passwordInput.setState({ value: "11" });
    expect(form.length).toBe(1);
    form.simulate("submit", fakeEvent);
    expect(signInPage.state("isSubmitted")).toBe(false);
  });

  it("Test forgot password modal form - open and close", () => {
    let preventDefault = false;
    const fakeEvent = {
      preventDefault: () => {
        // console.log("preventDefault");
        preventDefault = true;
      },
    };
    const signInPage = wrapper.find("SignInPage");
    wrapper.find("#forgot-password").first().simulate("click", fakeEvent);
    expect(signInPage.state("showForgotPasswordModal")).toBe(true);
    expect(preventDefault).toBe(true);
    wrapper.find("#modal-form-close").first().simulate("click");
    expect(signInPage.state("showForgotPasswordModal")).toBe(false);
  });

  it("Test forgot password modal form - open and submit", () => {
    let preventDefault = false;
    const fakeEvent = {
      preventDefault: () => {
        // console.log("preventDefault");
        preventDefault = true;
      },
    };
    const signInPage = wrapper.find("SignInPage");
    wrapper.find("#forgot-password").first().simulate("click", fakeEvent);
    expect(signInPage.state("showForgotPasswordModal")).toBe(true);
    expect(preventDefault).toBe(true);
    wrapper.find("#modal-view-form").first().simulate("submit");
    expect(signInPage.state("showForgotPasswordModal")).toBe(false);
  });

  it("Test handlePasswordChange", () => {
    const signInPage = wrapper.find("SignInPage");
    const passwordInput = wrapper.find("PasswordInput");
    expect(passwordInput.prop("onChange")).toBeTruthy();
    expect(signInPage.instance().handlePasswordChange()).toBe("handlePasswordChange");
  });
});
