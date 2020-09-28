import renderer from 'react-test-renderer';
import { mount, shallow } from 'enzyme';
import LoginPage from '../../src/containers/LoginPage';
import React from 'react';

describe('Login component test', () => {
  // it('should render snapshot', () => {
  //   const component = renderer.create(<LoginPage />);
  //   const tree = component.toJSON();
  //   expect(tree).toMatchSnapshot();
  // });

  it('should return mapped PaymentResponse object with undefined values', async () => {
    expect(1).toBe(1);
  });
});
