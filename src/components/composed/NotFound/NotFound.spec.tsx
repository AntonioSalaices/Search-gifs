import { render, RenderResult } from '@testing-library/react';
import NotFound from './NotFound';

describe('<NotFound />', () => {
  let component: RenderResult;

  beforeEach(() => {
    component = render(<NotFound />);
  });

  test('should render correctly', () => {
    const { container } = component;

    expect(container).toMatchSnapshot();
  });
});
