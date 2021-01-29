import { render, screen } from "@testing-library/react";
import App from "./App";

import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });

it("render correctly text component", () => {
  const TextInputComponent = renderer.create(<TextInput />).toJSON();
  expect(TextInputComponent).toMatchSnapshot();
});
