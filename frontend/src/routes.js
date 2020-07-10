/*!

=========================================================
* Light Bootstrap Dashboard React - v1.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Dashboard from "./views/Dashboard.jsx";
import UserProfile from "./views/UserProfile.jsx";
import Icons from "./views/Icons.jsx";
import AddCar from "./views/AddCar.jsx";
import AddCarType from "./views/AddCarType.js"
import EditCarType from "./views/EditCarType.js"
import AddLocation from "./views/AddLocation"
import EditLocation from "./views/EditLocation"
import AddUser from "./views/AddUser"
import BrowseUsers from "./views/BrowseUsers"
import EditMembershipFee from "./views/EditMembershipFee"
import AddAdmin from "./views/AddAdmin"
import EditCar from "./views/EditCar"
import Logout from "./views/Logout"
const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "pe-7s-graph",
    component: Dashboard,
    layout: "/admin"
  },
  {
    path: "/acceptuser",
    name: "Add User",
    icon: "pe-7s-add-user",
    component: AddUser,
    layout: "/admin"
  },
  {
    path: "/addadmin",
    name: "Add/Edit Admin",
    icon: "pe-7s-add-user",
    component: AddAdmin,
    layout: "/admin"
  },
  {
    path: "/browseusers",
    name: "Browse User",
    icon: "pe-7s-users",
    component: BrowseUsers,
    layout: "/admin"
  },
  {
    path: "/addcar",
    name: "Add Car",
    icon: "pe-7s-car",
    component: AddCar,
    layout: "/admin"
  },
  {
    path: "/editcar",
    name: "Edit Car",
    icon: "pe-7s-tools",
    component: EditCar,
    layout: "/admin"
  },
  {
    path: "/add_car_type",
    name: "Add Car Type",
    icon: "pe-7s-angle-down-circle",
    component: AddCarType,
    layout: "/admin"
  },
  {
    path: "/edit_car_type",
    name: "Edit Car Type",
    icon: "pe-7s-angle-down-circle",
    component: EditCarType,
    layout: "/admin"
  },
  
  {
    path: "/addlocation",
    name: "Add Location",
    icon: "pe-7s-shield",
    component: AddLocation,
    layout: "/admin"
  },
  {
    path: "/editlocation",
    name: "Edit Location",
    icon: "pe-7s-shield",
    component: EditLocation,
    layout: "/admin"
  },
  {
    path: "/editmembershipfee",
    name: "Edit Membership Fee",
    icon: "pe-7s-user",
    component: EditMembershipFee,
    layout: "/admin"
  },
  {
    path: "/logout",
    name: "Logout",
    icon: "pe-7s-power",
    component: Logout,
    layout: "/admin"
  }
];

export default dashboardRoutes;
