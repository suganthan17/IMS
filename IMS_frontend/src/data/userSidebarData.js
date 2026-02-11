import {
  LayoutDashboard,
  AlertCircle,
  ListChecks,
  Activity,
  LogOut,
} from "lucide-react";

const userSidebarData = [
  {
    name: "Dashboard",
    path: "/user/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Raise Complaint",
    path: "/user/raise-complaint",
    icon: AlertCircle,
  },
  {
    name: "My Complaints",
    path: "/user/my-complaints",
    icon: ListChecks,
  },
  {
    name: "Status",
    path: "/user/status",
    icon: Activity,
  },
];

export default userSidebarData;
