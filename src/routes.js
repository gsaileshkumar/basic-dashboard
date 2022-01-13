const routes = {
	cpoHqPolls: '/cpo-hq-polls',
	cpoHqForum: '/cpo-hq-forum',
	dashboard: '/dashboard',
	explorer: '/explorer/:reportId?',
};

export const ROUTES_WITH_SIDEBAR = [routes.cpoHqForum, routes.cpoHqPolls];

export default routes;
