import type { LayoutServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: LayoutServerLoad = async ({ cookies }) => {
	const id = cookies.get('auth-token') || null;
	if (!id) {
		throw redirect(302, '/login');
	}

	const role = cookies.get('role');

	let links = [
		{ href: "/", label: "Home", icon: "home" },
		{ href: "/dashboard/human_resources", label: "Human Resources", icon: "groups" },
		{ href: "/dashboard/finance", label: "Finance", icon: "payments" },
		{ href: "/dashboard/projects", label: "Projects", icon: "bookmark_manager" },
		{ href: "/dashboard/marketing", label: "Marketing", icon: "campaign" },
		{ href: "/dashboard/cooperative", label: "Cooperative", icon: "account_balance" },
		{ href: "/dashboard/supplies", label: "Supplies and Inventory", icon: "inventory_2" },
		{ href: "/bootcamp", label: "Bootcamp", icon: "school" }
	  ];
	switch (role) {
		case 'CEO':
			break;
		case 'Project Manager':
		case 'Application Developer':
			links = [
				{ href: "/", label: "Home", icon: "home" },
				{ href: "/dashboard/projects", label: "Projects", icon: "bookmark_manager" },
			  ];
			break;
		default:
			break;
	}

	return {
		id: id,
		role: role,
		links: links
	};
};
