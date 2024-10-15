import React from 'react'
import SprintMenu from './pages/SprintMenu'
import TaskDashboard from './pages/TaskDashboard';
import TeamMenu from './pages/TeamMenu';
import SprintDashboard from './pages/SprintDashboard';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Navigate } from 'react-router';
import SprintPlanning from './pages/SprintPlanning';
import UserProfile from './pages/UserProfile';
import AdminView from './pages/AdminView';
import AdminPanel from './pages/AdminPanel';
import Login from './pages/Login';
import HelpCenter from './pages/HelpCenter';
export const UserContext = React.createContext();

export default function App() {

	const [signedIn, setSignedIn] = React.useState(sessionStorage.getItem("sessionToken") ? true : false);

	return(
		<UserContext.Provider value={{signedIn, setSignedIn}}>
			<Router>
				<Routes>
					<Route path ='/' element={signedIn ? <Navigate to='/taskDashboard'/> : <Login/>}/>
					<Route path = '/taskDashboard' element={signedIn ? <TaskDashboard/> : <Navigate to='/'/>}/>
					<Route path = '/sprint' element={signedIn ? <SprintMenu/> : <Navigate to='/'/>}/>
					<Route path = '/team' element={signedIn ? <TeamMenu/> : <Navigate to='/'/>}/>
					<Route path = '/helpCenter' element={signedIn ? <HelpCenter/> : <Navigate to='/'/>}/>
					<Route path = '/userProfile' element={signedIn ? <UserProfile/> : <Navigate	to='/'/>}/>
					<Route path = '/adminPanel' element={signedIn ? <AdminPanel/> : <Navigate to='/'/>}/>
					<Route path = '/adminView' element={signedIn ? <AdminView/> : <Navigate to='/'/>}/>
					<Route path = '/sprintDashboard/:_id/:status/:sprintName/:startDate/:endDate' element={signedIn ? <SprintDashboard/> : <Navigate to='/'/>}/>
					<Route path = '/sprintPlanning/:_id/:sprintName/:startDate/:endDate' element={signedIn ? <SprintPlanning/> : <Navigate to='/'/>}/>
				</Routes>
			</Router>
		</UserContext.Provider>
	)
}