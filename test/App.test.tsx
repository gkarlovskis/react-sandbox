import App from "../src/App";
import React from "react";
import { MemoryRouter, Route } from "react-router-dom";
import { mount, shallow } from "enzyme";
import configureMockStore from "redux-mock-store";
import { Provider } from "react-redux";
const mockStore = configureMockStore();
import { AppContext } from "../src/helpers/app-context";
import { act } from "react-dom/test-utils";

import { getLoggedUser } from "../src/services/authentication-service";
jest.mock("../src/services/authentication-service");

const waitForComponentToPaint = async (wrapper: any) => {
  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 0));
    wrapper.update();
  });
};

describe("<App />", () => {
  let wrapper: any;
  const state = { isLoggedIn: false };
  const store: any = mockStore({
    isLoggedIn: true,
  });

  it("Snapshot testing", () => {
    expect(
      shallow(
        <AppContext.Provider value={state}>
          <Provider store={store}>
            <MemoryRouter initialEntries={["/sign-in"]}>
              <Route path="/sign-in">
                <App />
              </Route>
            </MemoryRouter>
          </Provider>
        </AppContext.Provider>
      )
    ).toMatchSnapshot();
  });

  it("App test with logged in state", () => {
    (getLoggedUser as jest.Mock).mockResolvedValue({ username: "mockValidate" });
    wrapper = mount(
      <AppContext.Provider value={state}>
        <Provider store={store}>
          <MemoryRouter initialEntries={["/sign-in"]}>
            <Route path="/sign-in">
              <App />
            </Route>
          </MemoryRouter>
        </Provider>
      </AppContext.Provider>
    );
    waitForComponentToPaint(wrapper);
    const app = wrapper.find("App");
    expect(app.length).toBeGreaterThan(0);
  });

  it("App test with logged out state", () => {
    (getLoggedUser as jest.Mock).mockResolvedValue(null);
    wrapper = mount(
      <AppContext.Provider value={state}>
        <Provider store={store}>
          <MemoryRouter initialEntries={["/sign-in"]}>
            <Route path="/sign-in">
              <App />
            </Route>
          </MemoryRouter>
        </Provider>
      </AppContext.Provider>
    );
    waitForComponentToPaint(wrapper);
    const app = wrapper.find("App");
    expect(app.length).toBeGreaterThan(0);
  });
});
