import React from 'react';
import { Layout, Menu } from 'antd';
import { useHistory, useLocation } from 'react-router-dom';

import routes, { ROUTES_WITH_SIDEBAR } from 'routes';
import CounterList from 'components/CounterList';

const { Header, Content, Sider } = Layout;

const HeaderContentLayout = ({ children }) => {
	const history = useHistory();
	const location = useLocation();

	return (
		<Layout>
			<Header>
				<Menu theme="dark" mode="horizontal">
					<Menu.Item
						key="polls"
						onClick={() => history.push(routes.cpoHqPolls)}
					>
						Polls
					</Menu.Item>
					<Menu.Item
						key="forum"
						onClick={() => history.push(routes.cpoHqForum)}
					>
						Forum
					</Menu.Item>
					<Menu.Item
						key="dashboard"
						onClick={() => history.push(routes.dashboard)}
					>
						Dashboard
					</Menu.Item>
					<Menu.Item
						key="explorer"
						onClick={() =>
							history.push(
								routes.explorer.replace('/:reportId?', '')
							)
						}
					>
						Explorer
					</Menu.Item>
				</Menu>
			</Header>
			<Layout>
				{ROUTES_WITH_SIDEBAR.includes(location.pathname) && (
					<Sider>
						<CounterList />
					</Sider>
				)}
				<Content
					style={{
						padding: 50,
						minHeight: 'calc(100vh - 64px)',
						height: '100%',
					}}
				>
					{children}
				</Content>
			</Layout>
		</Layout>
	);
};

export default HeaderContentLayout;
