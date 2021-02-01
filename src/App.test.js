import { render, screen } from "@testing-library/react";
import App from "./App";

import { shallow } from "enzyme";

it("renders correctly", () => {
  const wrapper = shallow(<App />);
  expect(wrapper).toMatchSnapshot();
});
