import { render } from '@testing-library/react';

import Server from './server';

describe('Server', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Server />);
    expect(baseElement).toBeTruthy();
  });
});
