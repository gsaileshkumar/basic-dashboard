import React from 'react';

const VoluntaryIndicator = ({ rehireType, voluntary }) => {
	return (
		<div
			data-testid="voluntaryIndicator"
			style={{
				height: '2rem',
				width: '2rem',
				marginRight: '0.5rem',
				backgroundColor:
					rehireType === 'ELIGIBLE'
						? voluntary
							? 'green'
							: 'red'
						: 'gray',
			}}
		/>
	);
};

export default VoluntaryIndicator;
