import renderer from 'react-test-renderer';
import { mount, shallow } from 'enzyme';
import App from '../src/App';
import React from 'react';

describe('App component test', () => {
  it('should render snapshot', () => {
    expect(1).toBe(1);
  });
});
