import { render, screen } from "@testing-library/react";
import BucketDetails from "./BucketDetails";

import { shallow } from "enzyme";

it("renders correctly", () => {
  const wrapper = shallow(<BucketDetails />);
  expect(wrapper).toMatchSnapshot();
});
