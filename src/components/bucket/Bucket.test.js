import { render, screen } from "@testing-library/react";
import Bucket from "./Bucket";

import { shallow } from "enzyme";

it("renders correctly", () => {
  const wrapper = shallow(<Bucket />);
  expect(wrapper).toMatchSnapshot();
});
