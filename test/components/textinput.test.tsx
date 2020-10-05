import React from "react";
import TextInput from "../../src/components/TextInput";
import { shallow } from "enzyme";

describe("TextInput Component test", () => {
  it("Should be called a callback onChange when it is passed as props param", () => {
    const onChange = jest.fn();
    const component = shallow(<TextInput value="" onChange={onChange} />);
    const input = component.find("input");
    input.simulate("change", { target: { value: "lore ipsum text" } });
    expect(component.state("value")).toBe("lore ipsum text");
    expect(onChange).toBeCalled();
    expect(input.props()["autoComplete"]).toBe("off");
  });
});
