"use client";

import { MainUiProvider } from "./context/MainUiContext";
import { AuthProvider } from "./context/AuthContext";
import Header from "./components/Header";
import AppWrapper from "./features/AppWrapper";
import Footer from "./components/Footer";

export default function App() {
	return (
		<MainUiProvider>
		 	 <AuthProvider>
				<div className="h-screen flex flex-col text-black">
					<Header />
					<AppWrapper />
					<Footer /> 
				</div>
		 	</AuthProvider> 
		 </MainUiProvider>
	);
}
