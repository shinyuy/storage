import { render, screen } from "@testing-library/react";
import App from "./App";

import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });

describe("Component Structure Testing", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<App />);
  });

  test("renders App components", () => {
    expect(wrapper.find("h1").text()).toContain("Yoooo");
  });

  test("Renders a button with", () => {
    expect(wrapper.find(".btn").text()).toBe("Delete");
  });
});
