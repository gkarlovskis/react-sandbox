import React from "react";
import SelectInput from "../../src/components/SelectInput";
import { shallow } from "enzyme";

describe("SelectInput Component test", () => {
  it("Should be called a callback onChange when it is passed as props param", () => {
    const onChange = jest.fn();
    const component = shallow(<SelectInput value="" onChange={onChange} />);
    const input = component.find("select");
    input.simulate("change", { target: { value: "lore ipsum text" } });
    expect(component.state("value")).toBe("lore ipsum text");
    expect(onChange).toBeCalled();
  });
});
