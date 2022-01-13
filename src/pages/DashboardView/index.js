import React, { Fragment, useEffect, useState } from 'react';
import { Typography, Tabs, Modal } from 'antd';
import { getEmployees } from 'mockEmployees';
import SelectedEmployee from 'components/SelectedEmployee';
import VoluntaryIndicator from 'components/VoluntaryIndicator';
import { groupBy } from 'utils';
import { employeeCard, employeeList } from './style';

const { TabPane } = Tabs;
const { Title, Text } = Typography;

const REHIRE = {
	ELIGIBLE: true,
	INELIGIBLE: false,
	UNKNOWN: null,
};

const DashboardView = () => {
	const [rehireType, setRehireType] = useState('ELIGIBLE');
	const [employees, setEmployees] = useState([]);
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [selectedEmployee, setSelectedEmployee] = useState(null);

	const showModal = (employee) => {
		setIsModalVisible(true);
		setSelectedEmployee(employee);
	};
	const handleOk = () => {
		setIsModalVisible(false);
	};
	const handleCancel = () => {
		setIsModalVisible(false);
	};

	const onChangeHandler = (key) => {
		setRehireType(key);
	};

	useEffect(() => {
		const fetchEmployees = async () => {
			const response = await getEmployees(REHIRE[rehireType]);
			setEmployees(response);
		};
		fetchEmployees();
	}, [rehireType]);

	const constructAttritionTimeline = () => {
		const _employees = employees.sort(
			(a, b) =>
				new Date(b.terminated_date).getTime() -
				new Date(a.terminated_date).getTime()
		);

		const groupedEmp = Array.from(
			groupBy(_employees, (emp) => emp.terminated_date)
		);

		return (
			<div style={employeeList}>
				{groupedEmp?.map((group) => (
					<Fragment key={group?.[0]}>
						<div> {group?.[0]}</div>
						{group?.[1].map((employee) => (
							<div
								key={employee.id}
								style={employeeCard}
								onClick={() => showModal(employee)}
							>
								<VoluntaryIndicator
									rehireType={rehireType}
									voluntary={employee?.voluntary}
								/>
								<Text>{employee.name}</Text>
							</div>
						))}
					</Fragment>
				))}
			</div>
		);
	};
	return (
		<div>
			<Title level={1}>DASHBOARD</Title>
			<Tabs defaultActiveKey="ELIGIBLE" onChange={onChangeHandler}>
				<TabPane tab="Rehire Eligible" key="ELIGIBLE">
					{constructAttritionTimeline()}
				</TabPane>
				<TabPane tab="Rehire Ineligible" key="INELIGIBLE">
					{constructAttritionTimeline()}
				</TabPane>
				<TabPane tab="Rehire Unknown" key="UNKNOWN">
					{constructAttritionTimeline()}
				</TabPane>
			</Tabs>
			{selectedEmployee && (
				<Modal
					visible={isModalVisible}
					footer={null}
					onOk={handleOk}
					onCancel={handleCancel}
					bodyStyle={{ height: '250px' }}
				>
					<SelectedEmployee
						rehireType={rehireType}
						selectedEmployee={selectedEmployee}
					/>
				</Modal>
			)}
		</div>
	);
};

export default DashboardView;
