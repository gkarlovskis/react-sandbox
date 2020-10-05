import React from "react";
import EmailInput from "../../src/components/EmailInput";
import { shallow } from "enzyme";

describe("EmailInput Component test", () => {
  it("Should be called a callback onChange when it is passed as props param", () => {
    const onChange = jest.fn();
    const shallowInputEmail = shallow(<EmailInput value="" onChange={onChange} />);
    const input = shallowInputEmail.find("input");
    input.simulate("change", { target: { value: "demo@demo.lv" } });
    expect(shallowInputEmail.state("value")).toBe("demo@demo.lv");
    expect(onChange).toBeCalled();
    expect(input.props()["autoComplete"]).toBe("off");
  });
});
