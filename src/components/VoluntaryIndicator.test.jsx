import React from 'react';
import { render, getByTestId } from '@testing-library/react';
import '@testing-library/jest-dom';
import VoluntaryIndicator from './VoluntaryIndicator';

test('renders rehire eligible and volunatary in green color', async () => {
	const { container } = render(
		<VoluntaryIndicator rehireType="ELIGIBLE" voluntary />
	);
	expect(getByTestId(container, 'voluntaryIndicator')).toHaveStyle({
		backgroundColor: 'green',
	});
});

test('renders rehire eligible and involunatary in red color', async () => {
	const { container } = render(
		<VoluntaryIndicator rehireType="ELIGIBLE" voluntary={false} />
	);
	expect(getByTestId(container, 'voluntaryIndicator')).toHaveStyle({
		backgroundColor: 'red',
	});
});

test('renders other rehires in gray color', async () => {
	const { container } = render(
		<VoluntaryIndicator rehireType="INELIGIBLE" />
	);
	expect(getByTestId(container, 'voluntaryIndicator')).toHaveStyle({
		backgroundColor: 'gray',
	});
});
