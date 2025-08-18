// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// const RoleRedirector = () => {
//   const navigate = useNavigate();

//   useEffect(() => {
//     const storedUser = JSON.parse(localStorage.getItem("user"));

//     if (!storedUser || !storedUser.role) {
//       navigate("/login");
//     } else {
//       switch (storedUser.role) {
//         case "admin":
//           navigate("/admin/dashboard");
//           break;
//         case "manager":
//           navigate("/manager/dashboard");
//           break;
//         case "clerk":
//           navigate("/clerk/dashboard");
//           break;
//         case "staff":
//           navigate("/staff/dashboard");
//           break;
//         default:
//           navigate("/unauthorized");
//       }
//     }
//   }, [navigate]);

//   return null; // No UI
// };

// export default RoleRedirector;


import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RoleRedirector = () => {
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));

      if (!storedUser || !storedUser.role) {
        // Default for guests or missing user
        navigate("/login");
      } else {
        switch (storedUser.role) {
          case "admin":
            navigate("/admin/dashboard");
            break;
          case "manager":
            navigate("/manager/dashboard");
            break;
          case "clerk":
            navigate("/clerk/dashboard");
            break;
          case "staff":
            navigate("/staff/dashboard");
            break;
          case "guest":
            navigate("/guest");
            break;
          default:
            navigate("/guest"); // fallback for unknown roles
        }
      }
    } catch (err) {
      console.error("Error parsing user from localStorage:", err);
      navigate("/guest");
    }
  }, [navigate]);

  return null; // Component has no UI
};

export default RoleRedirector;
