import { useMainUi } from "@/contexts/MainUiContext";
import * as Constant from '@/lib/constants';
import { useAuth } from "@/contexts/AuthContext";


export default function Header() {
	
	const { mainPage, setMainPage } = useMainUi();
	const { user, logout } = useAuth();

	const handleLogout = () => {
		const ok = confirm("are you sure you want to logout ?");
		if( ok ) {
			logout();
			setMainPage(Constant.PAGE_LOGIN);
		}
	}

	return ( 
		<header className="">
			<div>This is header</div>
		</header>
    )
}