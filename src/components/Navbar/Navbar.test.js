import { render, screen } from "@testing-library/react";
import Navbar from "./Navbar";

import { shallow } from "enzyme";

it("renders correctly", () => {
  const wrapper = shallow(<Navbar />);
  expect(wrapper).toMatchSnapshot();
});
