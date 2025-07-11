import { render } from '@testing-library/react';

import Procedures from './procedures';

describe('Procedures', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Procedures />);
    expect(baseElement).toBeTruthy();
  });
});
