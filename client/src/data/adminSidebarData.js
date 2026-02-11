import {
  LayoutDashboard,
  ClipboardList,
  Users,
  Edit,
} from "lucide-react";

const adminSidebarData = [
  {
    name: "Dashboard",
    path: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "All Complaints",
    path: "/admin/complaints",
    icon: ClipboardList,
  },
  {
    name: "Manage Staff",
    path: "/admin/manage-staff",
    icon: Users,
  },
  {
    name: "Update Details",
    path: "/admin/update-details",
    icon: Edit,
  },
];

export default adminSidebarData;
