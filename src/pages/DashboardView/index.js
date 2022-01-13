import React, { Fragment, useEffect, useState } from 'react';
import { Typography, Tabs, Modal } from 'antd';
import { getEmployees } from 'mockEmployees';
import SelectedEmployee from 'components/SelectedEmployee';
import VoluntaryIndicator from 'components/VoluntaryIndicator';
import { groupBy } from 'utils';
import { employeeCard, employeeList } from './style';

const { TabPane } = Tabs;
const { Title, Text } = Typography;

const ATTRITION = {
	ELIGIBLE: true,
	INELIGIBLE: false,
	UNKNOWN: null,
};

const DashboardView = () => {
	const [attritionType, setAttritionType] = useState('ELIGIBLE');
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
		setAttritionType(key);
	};

	useEffect(() => {
		const fetchEmployees = async () => {
			const response = await getEmployees(ATTRITION[attritionType]);
			setEmployees(response);
		};
		fetchEmployees();
	}, [attritionType]);

	const constructEmployeesList = () => {
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
									attritionType={attritionType}
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
					{constructEmployeesList()}
				</TabPane>
				<TabPane tab="Rehire Ineligible" key="INELIGIBLE">
					{constructEmployeesList()}
				</TabPane>
				<TabPane tab="Rehire Unknown" key="UNKNOWN">
					{constructEmployeesList()}
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
						attritionType={attritionType}
						selectedEmployee={selectedEmployee}
					/>
				</Modal>
			)}
		</div>
	);
};

export default DashboardView;
