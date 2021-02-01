import { render, screen } from "@testing-library/react";
import Main from "./Main";

import { shallow } from "enzyme";

it("renders correctly", () => {
  const wrapper = shallow(<Main />);
  expect(wrapper).toMatchSnapshot();
});
