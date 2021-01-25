import React from 'react';
import renderer from 'react-test-renderer';
import Home from '../components/Home';
import {BrowserRouter as Router} from "react-router-dom";

test('renders correctly', () => {
    const tree = renderer.create(<Router><Home /></Router>).toJSON();
    expect(tree).toMatchSnapshot();
});