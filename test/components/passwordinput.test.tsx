import React from "react";
import PasswordInput from "../../src/components/PasswordInput";
import { shallow } from "enzyme";

describe("PasswordInput Component test", () => {
  it("Should be called a callback onChange when it is passed as props param", () => {
    const onChange = jest.fn();
    const shallowPasswordInput = shallow(<PasswordInput value="" onChange={onChange} />);
    const input = shallowPasswordInput.find("input");
    input.simulate("change", { target: { value: "12345678" } });
    expect(shallowPasswordInput.state("value")).toBe("12345678");
    expect(onChange).toBeCalled();
    expect(input.props()["autoComplete"]).toBe("current-password");
  });
});
