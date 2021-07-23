// @material-ui/icons
import Notifications from "@material-ui/icons/Notifications";
import EditIcon from '@material-ui/icons/Edit';
import AddCircleIcon from '@material-ui/icons/AddCircle';

// core components/views for Admin layout
import NewPatient from "views/NewPatient/NewPatient";
import EditPatient from "views/EditPatient/EditPatient";
import NewInjection from "views/NewInjection/NewInjection";
import ValidatePatients from "views/ValidatePatients/ValidatePatients";


const dashboardRoutes = [

  {
    path: "/AddNewPatient",
    name: "Add Patient",
    icon: AddCircleIcon,
    component: NewPatient,
    layout: "/admin"
  },
  {
    path: "/NewInjection",
    name: "New Injection",
    icon: "content_paste",
    component: NewInjection,
    layout: "/admin"
  },
  {
    path: "/EditPatient",
    name: "Edit Patient",
    icon: EditIcon,
    component: EditPatient,
    layout: "/admin"
  },
  {
    path: "/ValidatePatients",
    name: "Validate Patient",
    icon: Notifications,
    component: ValidatePatients,
    layout: "/admin"
  },

];

export default dashboardRoutes;
