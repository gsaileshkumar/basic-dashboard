import React from 'react';
import { Typography } from 'antd';
import VoluntaryIndicator from './VoluntaryIndicator';

const { Text } = Typography;

const selectedEmployeeSection = {
	padding: '0.5rem',
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'space-evenly',
	height: '100%',
};
const selectedEmployeeOverview = {
	display: 'flex',
	alignItems: 'center',
	paddingBottom: '0.5rem',
};

const SelectedEmployee = ({ attritionType, selectedEmployee }) => {
	return (
		<div key={selectedEmployee?.id} style={selectedEmployeeSection}>
			<div style={selectedEmployeeOverview}>
				<VoluntaryIndicator
					attritionType={attritionType}
					voluntary={selectedEmployee?.voluntary}
				/>
				<Text>{selectedEmployee?.name}</Text>
			</div>
			<div>
				<Text>Go to </Text>
				<a
					href={selectedEmployee?.profile_link}
					target="_blank"
					rel="noreferrer"
				>
					{selectedEmployee?.name}'s profile
				</a>
			</div>
			<Text>{selectedEmployee?.termination_reason}</Text>
		</div>
	);
};

export default SelectedEmployee;
