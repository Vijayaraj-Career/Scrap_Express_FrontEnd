import Customer from "../Admin Panel Pages/Customer";
import Analytics from "../Pages/Analytics";
import Sample from "../Pages/Sample";
import Dashboard from "./DashboardLayout";

export const menuItem = [
    {
      path: "/dashboard", // Parent path
      components: <Dashboard/>,
      title: "Dashboard",
      child: [
        {
          path: "sample", // Nested path (relative to parent)
          components: <Sample />,
          title: "Sample",
        },
        {
          path: "customer", // Nested path (relative to parent)
          components: <Customer/>,
          title: "Customer",
        },
      ],
    },
    {
      path: "analytics", // Parent path
      components: <Analytics/>,
      title: "Analytics",
    },
   
  ];
    

