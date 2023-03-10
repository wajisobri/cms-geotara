import React, { useContext, useEffect, useState } from "react";
import LoadingBar from "react-top-loading-bar";

/// React router dom
import { Switch, Route, useLocation } from "react-router-dom";

/// Css
import "./index.css";
import "./chart.css";
import "./step.css";

/// Layout
import Nav from "./layouts/nav";
import Footer from "./layouts/Footer";

/// Dashboard
import Home from "./pages/Dashboard";

import DashboardDark from "./components/Dashboard/DashboardDark";
import GuestList from "./components/Dashboard/GuestList";
import GuestDetail from "./components/Dashboard/GuestDetail";
import Concierge from "./components/Dashboard/Concierge";
import Room from "./components/Dashboard/Room";
import Reviews from "./components/Dashboard/Reviews";
import Task from "./components/Dashboard/Task";

/// Pages
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import LockScreen from "./pages/LockScreen";
import Error400 from "./pages/Error400";
import Error403 from "./pages/Error403";
import Error404 from "./pages/Error404";
import Error500 from "./pages/Error500";
import Error503 from "./pages/Error503";
import { ThemeContext } from "../context/ThemeContext";
import Section from "./components/Section";

// Profil
const Profil = React.lazy(() => import("./components/Profil/Profil"));

// Wisata
const Wisata = React.lazy(() => import("./components/Wisata/Wisata"));
const WisataForm = React.lazy(() => import("./components/Wisata/WisataForm"));

// Virtual Tour
const VirtualTourViewEditor = React.lazy(() => import("./components/VirtualTour/VirtualTourViewEditor"));

// Publikasi
const Article = React.lazy(() => import("./components/Article/Article"));
const ArticleForm = React.lazy(() => import("./components/Article/ArticleForm"));
const ArticleDetail = React.lazy(() => import("./components/Article/ArticleDetail"));

const Event = React.lazy(() => import("./components/Event/Event"));
const EventForm = React.lazy(() => import("./components/Event/EventForm"));

// Kemitraan
const Accomodation = React.lazy(() => import("./components/Accomodation/Accomodation"));
const AccomodationForm = React.lazy(() => import("./components/Accomodation/AccomodationForm"));

const Merchant = React.lazy(() => import("./components/Merchant/Merchant"));
const MerchantForm = React.lazy(() => import("./components/Merchant/MerchantForm"));

// Autentikasi
const User = React.lazy(() => import("./components/User/User"));
const UserForm = React.lazy(() => import("./components/User/UserForm"));

const Markup = () => {
	const { menuToggle } = useContext(ThemeContext);
	const routes = [
		{ url: "section", component: Section },
		/// Dashboard
		{ url: "", component: Home },
		{ url: "dashboard", component: Home },
		{ url: "dashboard-dark", component: DashboardDark },
		{ url: "guest-list", component: GuestList },
		{ url: "guest-detail", component: GuestDetail },
		{ url: "concierge", component: Concierge },
		{ url: "room-list", component: Room },
		{ url: "reviews", component: Reviews },
		{ url: "task", component: Task },

		/// Profil
		{ url: "profil", component: Profil },

		/// Wisata
		{ url: "wisata", component: Wisata },
		{ url: "wisata/tambah", component: WisataForm },
		{ url: "wisata/edit/:id", component: WisataForm },

		/// Virtual Tour
		{ url: "virtual-tour/editor", component: VirtualTourViewEditor },

		/// Publikasi
		{ url: "artikel", component: Article },
		{ url: "artikel/tambah", component: ArticleForm },
		{ url: "artikel/edit/:id", component: ArticleForm },
		{ url: "artikel/detail/:id", component: ArticleDetail },
		{ url: "acara", component: Event },
		{ url: "acara/tambah", component: EventForm },
		{ url: "acara/edit/:id", component: EventForm },

		/// Kemitraan
		{ url: "akomodasi", component: Accomodation },
		{ url: "akomodasi/tambah", component: AccomodationForm },
		{ url: "akomodasi/edit/:id", component: AccomodationForm },

		{ url: "merchant", component: Merchant },
		{ url: "merchant/tambah", component: MerchantForm },
		{ url: "merchant/edit/:id", component: MerchantForm },

		/// Autentikasi
		{ url: "pengguna", component: User },
		{ url: "pengguna/tambah", component: UserForm },
		{ url: "pengguna/edit/:id", component: UserForm },

		/// pages
		{ url: "page-register", component: Registration },
		{ url: "page-lock-screen", component: LockScreen },
		{ url: "page-login", component: Login },
		{ url: "page-forgot-password", component: ForgotPassword },
		{ url: "page-error-400", component: Error400 },
		{ url: "page-error-403", component: Error403 },
		{ url: "page-error-404", component: Error404 },
		{ url: "page-error-500", component: Error500 },
		{ url: "page-error-503", component: Error503 },
	];
	let path = window.location.pathname;
	path = path.split("/");
	path = path[path.length - 1];

	let pagePath = path.split("-").includes("page");

	const [progress, setProgress] = useState(0);
	const [prevLoc, setPrevLoc] = useState("");
	const location = useLocation();

	useEffect(() => {
		setPrevLoc(location.pathname);
		setProgress(100);
		if (location.pathname === prevLoc) {
			setPrevLoc("");
		}
	}, [location]);

	useEffect(() => {
		setProgress(0);
	}, [prevLoc]);

	return (
		<>
			<div
				id={`${!pagePath ? "main-wrapper" : ""}`}
				className={`${!pagePath ? "show" : "vh-100"}  ${
					menuToggle ? "menu-toggle" : ""
				}`}
			>
				{!pagePath && <Nav />}
				<div className={`${!pagePath ? "content-body" : ""}`}>
					<div
						className={`${!pagePath ? "container-fluid" : ""}`}
						style={{ minHeight: window.screen.height - 60 }}
					>
						<LoadingBar
							color="#f11946"
							progress={progress}
						/>
						<Switch>
							{routes.map((data, i) => (
								<Route
									key={i}
									exact
									path={`/${data.url}`}
									component={data.component}
								/>
							))}
						</Switch>
					</div>
				</div>
				{!pagePath && <Footer />}
			</div>
		</>
	);
};

export default Markup;
