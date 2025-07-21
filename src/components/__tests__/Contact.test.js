import {render} from '@testing-library/react';
import Contact from '../Contact';

test("Contact component should render without crashing", () => {
  render(<Contact />);
});