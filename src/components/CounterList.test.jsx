import React from 'react';
import {
	render,
	getByTestId,
	getAllByTestId,
	fireEvent,
	queryAllByTestId,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import CounterList from './CounterList';

beforeEach(() => {
	Object.defineProperty(window, 'sessionStorage', {
		value: {
			getItem: jest.fn(() => null),
			setItem: jest.fn(() => null),
		},
		writable: true,
	});
});

test('creating a new counter', () => {
	const { container } = render(<CounterList />);
	// Add a counter
	fireEvent.click(getByTestId(container, 'addCounter'));
	expect(getAllByTestId(container, 'counter')).toHaveLength(1);
	// Add another counter
	fireEvent.click(getByTestId(container, 'addCounter'));
	expect(getAllByTestId(container, 'counter')).toHaveLength(2);
});

test('deleting a counter', () => {
	const { container } = render(<CounterList />);
	// Add a counter
	fireEvent.click(getByTestId(container, 'addCounter'));
	expect(getAllByTestId(container, 'counter')).toHaveLength(1);

	// Delete the counter
	fireEvent.click(getByTestId(container, 'deleteCounter'));
	expect(queryAllByTestId(container, 'counter')).toHaveLength(0);
});
