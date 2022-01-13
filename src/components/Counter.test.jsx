import React from 'react';
import {
	render,
	fireEvent,
	getByText,
	getByDisplayValue,
	queryByRole,
	getByTestId,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import Counter from './Counter';

const initialProps = { count: 5, name: 'hello' };

beforeEach(() => {
	Object.defineProperty(window, 'sessionStorage', {
		value: {
			getItem: jest.fn(() => null),
			setItem: jest.fn(() => null),
		},
		writable: true,
	});
});

test('renders initial count', async () => {
	const { container } = render(<Counter counter={initialProps} />);
	expect(getByText(container, 'hello : 5')).toBeInTheDocument();
});

test('renders initially in edit mode', async () => {
	const { container } = render(
		<Counter counter={{ ...initialProps, isEditing: true }} />
	);
	expect(getByDisplayValue(container, 'hello')).toBeInTheDocument();
	expect(queryByRole(container, 'heading')).not.toBeInTheDocument();
});

test('increments the count on clicking plus icon', async () => {
	const handleUpdate = jest.fn();
	const { container } = render(
		<Counter counter={initialProps} onUpdate={handleUpdate} />
	);
	fireEvent.click(getByTestId(container, 'incCounter'));
	expect(handleUpdate).toHaveBeenCalledTimes(1);
	expect(handleUpdate).toBeCalledWith({ ...initialProps, count: 6 });
});

test('decrements the count on clicking minus icon', async () => {
	const handleUpdate = jest.fn();
	const { container } = render(
		<Counter counter={initialProps} onUpdate={handleUpdate} />
	);
	fireEvent.click(getByTestId(container, 'decCounter'));
	expect(handleUpdate).toHaveBeenCalledTimes(1);
	expect(handleUpdate).toBeCalledWith({ ...initialProps, count: 4 });
});

test('updates the counter on editing', async () => {
	const handleUpdate = jest.fn();
	const { container, rerender } = render(
		<Counter counter={initialProps} onUpdate={handleUpdate} />
	);
	expect(getByTestId(container, 'toggleEditCounter')).toHaveTextContent(
		'Edit'
	);
	fireEvent.click(getByTestId(container, 'toggleEditCounter'));
	expect(handleUpdate).toBeCalledWith({
		...initialProps,
		isEditing: true,
	});
	rerender(
		<Counter
			counter={{
				...initialProps,
				isEditing: true,
			}}
			onUpdate={handleUpdate}
		/>
	);
	expect(getByTestId(container, 'toggleEditCounter')).toHaveTextContent(
		'Save'
	);
	fireEvent.change(getByTestId(container, 'counterNameInput'), {
		target: { value: 'world' },
	});
	expect(handleUpdate).toBeCalledWith({
		...initialProps,
		isEditing: true,
	});
});
