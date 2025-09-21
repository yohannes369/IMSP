

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const AdminPage = () => {
//   const [users, setUsers] = useState([]);
//   const [selectedRole, setSelectedRole] = useState({});

//   // Fetch users from backend
//   const fetchUsers = async () => {
//     try {
//       const res = await axios.get('http://localhost:5000/api/admin/users');
//       setUsers(res.data);
//     } catch (error) {
//       console.error('Error fetching users:', error);
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   // Change role handler
//   const handleRoleChange = async (email) => {
//     try {
//       const role = selectedRole[email];
//       if (!role) return alert('Please select a role before updating.');

//       await axios.post('http://localhost:5000/api/admin/change-role', { email, role });
//       alert('Role updated successfully');
//       fetchUsers(); // Refresh list
//     } catch (error) {
//       console.error('Error updating role:', error);
//       alert('Failed to update role');
//     }
//   };

//   // Activate user handler
//   const handleActivateUser = async (id) => {
//     try {
//       await axios.patch(`http://localhost:5000/api/admin/users/${id}/activate`);
//       alert('User activated successfully');
//       fetchUsers();
//     } catch (error) {
//       console.error('Error activating user:', error);
//       alert('Failed to activate user');
//     }
//   };

//   // Deactivate user handler
//   const handleDeactivateUser = async (id) => {
//     try {
//       await axios.patch(`http://localhost:5000/api/admin/users/${id}/deactivate`);
//       alert('User deactivated successfully');
//       fetchUsers();
//     } catch (error) {
//       console.error('Error deactivating user:', error);
//       alert('Failed to deactivate user');
//     }
//   };
  

//   // viwu user info code

//   return (
//     <div>
//       <h2>User Management</h2>
//       <table border="1" cellPadding="8" cellSpacing="0">
//         <thead>
//           <tr>
//             <th>Email</th>
//             <th>Current Role</th>
//             <th>Status</th>
//             <th>Change Role</th>
//             <th>Activate / Deactivate</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.map((user) => (
//             <tr key={user.id}>
//               <td>{user.email}</td>
//               <td>{user.role}</td>
//               <td>{user.isActive ? 'Active' : 'Inactive'}</td>
//               <td>
//                 <select
//                   value={selectedRole[user.email] || ''}
//                   onChange={(e) =>
//                     setSelectedRole({ ...selectedRole, [user.email]: e.target.value })
//                   }
//                 >
//                   <option value="">-- Select Role --</option>
//                   <option value="admin">Admin</option>
//                   <option value="manager">Manager</option>
//                   <option value="staff">Staff</option>
//                   <option value="clerk">Clerk</option>
//                 </select>
//                 <button onClick={() => handleRoleChange(user.email)}>Update</button>
//               </td>
//               <td>
//                 {user.isActive ? (
//                   <button onClick={() => handleDeactivateUser(user.id)}>Deactivate</button>
//                 ) : (
//                   <button onClick={() => handleActivateUser(user.id)}>Activate</button>
//                 )}
//               </td>
//             </tr>
//           ))}
//           {users.length === 0 && (
//             <tr>
//               <td colSpan="5" style={{ textAlign: 'center' }}>
//                 No users found.
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default AdminPage;

//corect one

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const AdminPage = () => {
//   const [users, setUsers] = useState([]);
//   const [selectedRole, setSelectedRole] = useState({});

//   // Fetch users from backend
//   const fetchUsers = async () => {
//     try {
//       const res = await axios.get('http://localhost:5000/api/admin/users');
//       setUsers(res.data);
//     } catch (error) {
//       console.error('Error fetching users:', error);
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   // Change role handler
//   const handleRoleChange = async (email) => {
//     try {
//       const role = selectedRole[email];
//       if (!role) return alert('Please select a role before updating.');

//       await axios.post('http://localhost:5000/api/admin/change-role', { email, role });
//       alert('Role updated successfully');
//       fetchUsers();
//     } catch (error) {
//       console.error('Error updating role:', error);
//       alert('Failed to update role');
//     }
//   };

//   // Activate user
//   const handleActivateUser = async (id) => {
//     try {
//       await axios.patch(`http://localhost:5000/api/admin/users/${id}/activate`);
//       alert('User activated successfully');
//       fetchUsers();
//     } catch (error) {
//       console.error('Error activating user:', error);
//       alert('Failed to activate user');
//     }
//   };

//   // Deactivate user
//   const handleDeactivateUser = async (id) => {
//     try {
//       await axios.patch(`http://localhost:5000/api/admin/users/${id}/deactivate`);
//       alert('User deactivated successfully');
//       fetchUsers();
//     } catch (error) {
//       console.error('Error deactivating user:', error);
//       alert('Failed to deactivate user');
//     }
//   };

//   // Delete user
//   const handleDeleteUser = async (id) => {
//     if (!window.confirm('Are you sure you want to delete this user?')) return;

//     try {
//       await axios.delete(`http://localhost:5000/api/admin/users/${id}`);
//       alert('User deleted successfully');
//       fetchUsers();
//     } catch (error) {
//       console.error('Error deleting user:', error);
//       alert('Failed to delete user');
//     }
//   };

//   return (
//     <div>
//       <h2>User Management</h2>
//       <table border="1" cellPadding="8" cellSpacing="0">
//         <thead>
//           <tr>
//             <th>Email</th>
//             <th>Current Role</th>
//             <th>Status</th>
//             <th>Change Role</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.map((user) => (
//             <tr key={user.id}>
//               <td>{user.email}</td>
//               <td>{user.role}</td>
//               <td>{user.isActive ? 'Active' : 'Inactive'}</td>
//               <td>
//                 <select
//                   value={selectedRole[user.email] || ''}
//                   onChange={(e) =>
//                     setSelectedRole({ ...selectedRole, [user.email]: e.target.value })
//                   }
//                 >
//                   <option value="">-- Select Role --</option>
//                   <option value="admin">Admin</option>
//                   <option value="manager">Manager</option>
//                   <option value="staff">Staff</option>
//                   <option value="clerk">Clerk</option>
//                 </select>
//                 <button onClick={() => handleRoleChange(user.email)}>Update</button>
//               </td>
//               <td>
//                 {user.isActive ? (
//                   <button onClick={() => handleDeactivateUser(user.id)}>Deactivate</button>
//                 ) : (
//                   <button onClick={() => handleActivateUser(user.id)}>Activate</button>
//                 )}
//                 <button
//                   onClick={() => handleDeleteUser(user.id)}
//                   style={{ marginLeft: '8px', backgroundColor: 'red', color: 'white' }}
//                 >
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//           {users.length === 0 && (
//             <tr>
//               <td colSpan="5" style={{ textAlign: 'center' }}>
//                 No users found.
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default AdminPage;

// coorect

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import Footer from "../../components/Footer/Footer";
// import { FiPlusCircle } from 'react-icons/fi';

// const UserManagment = () => {
//   const [users, setUsers] = useState([]);
//   const [filteredUsers, setFilteredUsers] = useState([]);
//   const [selectedRole, setSelectedRole] = useState({});
//   const [searchTerm, setSearchTerm] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [usersPerPage] = useState(5);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   // Fetch users from backend
//   const fetchUsers = async () => {
//     try {
//       setLoading(true);
//       const res = await axios.get('http://localhost:5000/api/admin/users');
//       setUsers(res.data);
//       setFilteredUsers(res.data);
//       setError(null);
//     } catch (error) {
//       console.error('Error fetching users:', error);
//       setError('Failed to fetch users. Please try again later.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   // Filter users based on search term
//   useEffect(() => {
//     const filtered = users.filter(user =>
//       user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       user.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       (user.firstName && user.firstName.toLowerCase().includes(searchTerm.toLowerCase())) ||
//       (user.lastName && user.lastName.toLowerCase().includes(searchTerm.toLowerCase())) ||
//       (user.phone && user.phone.includes(searchTerm)) ||
//       (user.gender && user.gender.toLowerCase().includes(searchTerm.toLowerCase()))
//     );
//     setFilteredUsers(filtered);
//     setCurrentPage(1);
//   }, [searchTerm, users]);

//   // Change role handler
//   const handleRoleChange = async (email) => {
//     try {
//       const role = selectedRole[email];
//       if (!role) {
//         alert('Please select a role before updating.');
//         return;
//       }

//       if (!window.confirm(`Are you sure you want to change this user's role to ${role}?`)) {
//         return;
//       }

//       await axios.post('http://localhost:5000/api/admin/change-role', { email, role });
//       alert('Role updated successfully');
//       fetchUsers();
//     } catch (error) {
//       console.error('Error updating role:', error);
//       alert('Failed to update role');
//     }
//   };

//   // Activate user
//   const handleActivateUser = async (id) => {
//     try {
//       if (!window.confirm('Are you sure you want to activate this user?')) return;
      
//       await axios.patch(`http://localhost:5000/api/admin/users/${id}/activate`);
//       alert('User activated successfully');
//       fetchUsers();
//     } catch (error) {
//       console.error('Error activating user:', error);
//       alert('Failed to activate user');
//     }
//   };

//   // Deactivate user
//   const handleDeactivateUser = async (id) => {
//     try {
//       if (!window.confirm('Are you sure you want to deactivate this user?')) return;
      
//       await axios.patch(`http://localhost:5000/api/admin/users/${id}/deactivate`);
//       alert('User deactivated successfully');
//       fetchUsers();
//     } catch (error) {
//       console.error('Error deactivating user:', error);
//       alert('Failed to deactivate user');
//     }
//   };

//   // Delete user
//   const handleDeleteUser = async (id) => {
//     if (!window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) return;

//     try {
//       await axios.delete(`http://localhost:5000/api/admin/users/${id}`);
//       alert('User deleted successfully');
//       fetchUsers();
//     } catch (error) {
//       console.error('Error deleting user:', error);
//       alert('Failed to delete user');
//     }
//   };

//   // Navigate to add user page
//   const handleAddUser = () => {
//     navigate('/admin/users/add');
//   };

//   // Pagination
//   const indexOfLastUser = currentPage * usersPerPage;
//   const indexOfFirstUser = indexOfLastUser - usersPerPage;
//   const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
//   const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

//   // Status badge component
//   const StatusBadge = ({ active }) => (
//     <span className={`px-2 py-1 rounded-full text-xs font-semibold ${active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
//       {active ? 'Active' : 'Inactive'}
//     </span>
//   );

//   // Role badge component
//   const RoleBadge = ({ role }) => {
//     const roleColors = {
//       admin: 'bg-purple-100 text-purple-800',
//       manager: 'bg-yellow-100 text-yellow-800',
//       staff: 'bg-blue-100 text-blue-800',
//       clerk: 'bg-teal-100 text-teal-800'
//     };
    
//     return (
//       <span className={`px-2 py-1 rounded-full text-xs font-semibold ${roleColors[role] || 'bg-gray-100 text-gray-800'}`}>
//         {role}
//       </span>
//     );
//   };

//   // Pagination helper
//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   return (
//     <div className="min-h-screen flex flex-col bg-gray-50">
//       <div className="container mx-auto px-4 py-8 flex-grow">
//         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
//           <h2 className="text-2xl font-bold text-gray-800">User Management</h2>
//           {/* <button
//             onClick={handleAddUser}
//             className="flex items-center px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-md shadow-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
//           >
//             {/* <FiPlusCircle className="mr-2" />
//             Add User
//           </button> */} 
//         </div>

//         <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
//           <div className="relative flex-grow">
//             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//               <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
//                 <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
//               </svg>
//             </div>
//             <input
//               type="text"
//               placeholder="Search by name, email, role, phone, or gender..."
//               className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//           </div>
//           <button
//             onClick={fetchUsers}
//             className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//           >
//             Refresh Users
//           </button>
//         </div>

//         {error && (
//           <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
//             <div className="flex">
//               <div className="flex-shrink-0">
//                 <svg className="h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
//                   <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
//                 </svg>
//               </div>
//               <div className="ml-3">
//                 <p className="text-sm text-red-700">{error}</p>
//               </div>
//             </div>
//           </div>
//         )}

//         {loading ? (
//           <div className="flex justify-center items-center py-12">
//             <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//           </div>
//         ) : (
//           <>
//             <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg bg-white">
//               <table className="min-w-full divide-y divide-gray-200">
//                 <thead className="bg-gray-50">
//                   <tr>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">First Name</th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Name</th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gender</th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Change Role</th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody className="bg-white divide-y divide-gray-200">
//                   {currentUsers.length > 0 ? (
//                     currentUsers.map((user) => (
//                       <tr key={user.id} className="hover:bg-gray-50 transition-colors">
//                         <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{user.firstName}</td>
//                         <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{user.lastName}</td>
//                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
//                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.phone || '-'}</td>
//                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.gender || '-'}</td>
//                         <td className="px-6 py-4 whitespace-nowrap text-sm"><RoleBadge role={user.role} /></td>
//                         <td className="px-6 py-4 whitespace-nowrap text-sm"><StatusBadge active={user.isActive} /></td>
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <div className="flex items-center space-x-2">
//                             <select
//                               value={selectedRole[user.email] || ''}
//                               onChange={(e) => setSelectedRole({ ...selectedRole, [user.email]: e.target.value })}
//                               className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
//                             >
//                               <option value="">-- Select Role --</option>
//                               <option value="admin">Admin</option>
//                               <option value="manager">Manager</option>
//                               <option value="staff">Staff</option>
//                               <option value="clerk">Clerk</option>
//                             </select>
//                             <button
//                               onClick={() => handleRoleChange(user.email)}
//                               disabled={!selectedRole[user.email]}
//                               className={`inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white ${selectedRole[user.email] ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-gray-400 cursor-not-allowed'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500`}
//                             >
//                               Update
//                             </button>
//                           </div>
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                           <div className="flex space-x-2">
//                             {user.isActive ? (
//                               <button onClick={() => handleDeactivateUser(user.id)} className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">Deactivate</button>
//                             ) : (
//                               <button onClick={() => handleActivateUser(user.id)} className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500">Activate</button>
//                             )}
//                             <button onClick={() => handleDeleteUser(user.id)} className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">Delete</button>
//                           </div>
//                         </td>
//                       </tr>
//                     ))
//                   ) : (
//                     <tr>
//                       <td colSpan="9" className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">No users found matching your search.</td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>
//             </div>

//             {/* Pagination */}
//             {filteredUsers.length > usersPerPage && (
//               <div className="flex items-center justify-between mt-4">
//                 <div className="text-sm text-gray-700">
//                   Showing <span className="font-medium">{indexOfFirstUser + 1}</span> to <span className="font-medium">{Math.min(indexOfLastUser, filteredUsers.length)}</span> of <span className="font-medium">{filteredUsers.length}</span> users
//                 </div>
//                 <div className="flex space-x-2">
//                   <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} className={`px-3 py-1 rounded-md ${currentPage === 1 ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'}`}>Previous</button>
//                   {Array.from({ length: totalPages }, (_, i) => (
//                     <button key={i + 1} onClick={() => paginate(i + 1)} className={`px-3 py-1 rounded-md ${currentPage === i + 1 ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}>{i + 1}</button>
//                   ))}
//                   <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages} className={`px-3 py-1 rounded-md ${currentPage === totalPages ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'}`}>Next</button>
//                 </div>
//               </div>
//             )}
//           </>
//         )}
//       </div>

//       <div className="w-full">
//         <Footer />
//       </div>
//     </div>
//   );
// };
// export default UserManagment;
import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Footer from "../../components/Footer/Footer";
import { FiPlusCircle, FiRefreshCw } from 'react-icons/fi';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedRole, setSelectedRole] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch users from backend
  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axios.get('http://localhost:5000/api/admin/users');
      setUsers(res.data);
      setFilteredUsers(res.data);
      setError(null);
    } catch (error) {
      console.error('Error fetching users:', error);
      setError('Failed to fetch users. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // Filter users based on search term
  useEffect(() => {
    const filtered = users.filter(user =>
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (user.firstName && user.firstName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (user.lastName && user.lastName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (user.phone && user.phone.includes(searchTerm)) ||
      (user.gender && user.gender.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setFilteredUsers(filtered);
    setCurrentPage(1);
  }, [searchTerm, users]);

  // Change role handler
  const handleRoleChange = async (email) => {
    try {
      const role = selectedRole[email];
      if (!role) {
        alert('Please select a role before updating.');
        return;
      }

      if (!window.confirm(`Are you sure you want to change this user's role to ${role}?`)) {
        return;
      }

      await axios.post('http://localhost:5000/api/admin/change-role', { email, role });
      alert('Role updated successfully');
      fetchUsers();
    } catch (error) {
      console.error('Error updating role:', error);
      alert('Failed to update role');
    }
  };

  // Activate user
  const handleActivateUser = async (id) => {
    try {
      if (!window.confirm('Are you sure you want to activate this user?')) return;
      
      await axios.patch(`http://localhost:5000/api/admin/users/${id}/activate`);
      alert('User activated successfully');
      fetchUsers();
    } catch (error) {
      console.error('Error activating user:', error);
      alert('Failed to activate user');
    }
  };

  // Deactivate user
  const handleDeactivateUser = async (id) => {
    try {
      if (!window.confirm('Are you sure you want to deactivate this user?')) return;
      
      await axios.patch(`http://localhost:5000/api/admin/users/${id}/deactivate`);
      alert('User deactivated successfully');
      fetchUsers();
    } catch (error) {
      console.error('Error deactivating user:', error);
      alert('Failed to deactivate user');
    }
  };

  // Delete user
  const handleDeleteUser = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) return;

    try {
      await axios.delete(`http://localhost:5000/api/admin/users/${id}`);
      alert('User deleted successfully');
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('Failed to delete user');
    }
  };

  // Navigate to add user page
  const handleAddUser = () => {
    navigate('/admin/users/add');
  };

  // Pagination
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  // Status badge component
  const StatusBadge = ({ active }) => (
    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
      {active ? 'Active' : 'Inactive'}
    </span>
  );

  // Role badge component with ICT role support
  const RoleBadge = ({ role }) => {
    const roleColors = {
      admin: 'bg-purple-100 text-purple-800',
      manager: 'bg-yellow-100 text-yellow-800',
      staff: 'bg-blue-100 text-blue-800',
      clerk: 'bg-teal-100 text-teal-800',
      ict: 'bg-indigo-100 text-indigo-800' // Added ICT role color
    };
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${roleColors[role] || 'bg-gray-100 text-gray-800'}`}>
        {role}
      </span>
    );
  };

  // Pagination helper
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Generate pagination buttons with limits for mobile
  const renderPaginationButtons = () => {
    const buttons = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    // Previous button
    buttons.push(
      <button 
        key="prev" 
        onClick={() => paginate(currentPage - 1)} 
        disabled={currentPage === 1}
        className={`px-3 py-1 rounded-md ${currentPage === 1 ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
      >
        Previous
      </button>
    );

    // Page number buttons
    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => paginate(i)}
          className={`px-3 py-1 rounded-md ${currentPage === i ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
        >
          {i}
        </button>
      );
    }

    // Next button
    buttons.push(
      <button 
        key="next" 
        onClick={() => paginate(currentPage + 1)} 
        disabled={currentPage === totalPages}
        className={`px-3 py-1 rounded-md ${currentPage === totalPages ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
      >
        Next
      </button>
    );

    return buttons;
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <div className="container mx-auto px-2 sm:px-4 py-6 sm:py-8 flex-grow">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-3 sm:gap-4">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800">User Management</h2>
          <button
            onClick={handleAddUser}
            className="flex items-center px-3 sm:px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-md shadow-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 text-sm sm:text-base"
          >
            <FiPlusCircle className="mr-1 sm:mr-2" />
            Add User
          </button>
        </div>

        <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search by name, email, role, phone, or gender..."
              className="block w-full pl-9 sm:pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button
            onClick={fetchUsers}
            className="inline-flex items-center px-3 sm:px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <FiRefreshCw className="mr-1 sm:mr-2" />
            <span className="hidden sm:inline">Refresh Users</span>
            <span className="sm:hidden">Refresh</span>
          </button>
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-4 sm:mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center py-8 sm:py-12">
            <div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <>
            <div className="shadow overflow-x-auto border-b border-gray-200 rounded-lg bg-white">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">First Name</th>
                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Name</th>
                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">Phone</th>
                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Gender</th>
                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Change Role</th>
                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentUsers.length > 0 ? (
                    currentUsers.map((user) => (
                      <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm font-medium">{user.firstName}</td>
                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm font-medium">{user.lastName}</td>
                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500 truncate max-w-xs">{user.email}</td>
                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden sm:table-cell">{user.phone || '-'}</td>
                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden md:table-cell">{user.gender || '-'}</td>
                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm"><RoleBadge role={user.role} /></td>
                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm"><StatusBadge active={user.isActive} /></td>
                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                          <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
                            <select
                              value={selectedRole[user.email] || ''}
                              onChange={(e) => setSelectedRole({ ...selectedRole, [user.email]: e.target.value })}
                              className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                            >
                              <option value="">-- Select Role --</option>
                              <option value="admin">Admin</option>
                              <option value="manager">Manager</option>
                              <option value="staff">Staff</option>
                              <option value="clerk">Clerk</option>
                              <option value="ict">ICT</option> {/* Added ICT role option */}
                            </select>
                            <button
                              onClick={() => handleRoleChange(user.email)}
                              disabled={!selectedRole[user.email]}
                              className={`inline-flex justify-center items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white ${selectedRole[user.email] ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-gray-400 cursor-not-allowed'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500`}
                            >
                              Update
                            </button>
                          </div>
                        </td>
                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex flex-col sm:flex-row sm:space-x-2 space-y-2 sm:space-y-0">
                            {user.isActive ? (
                              <button onClick={() => handleDeactivateUser(user.id)} className="inline-flex justify-center items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">Deactivate</button>
                            ) : (
                              <button onClick={() => handleActivateUser(user.id)} className="inline-flex justify-center items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500">Activate</button>
                            )}
                            <button onClick={() => handleDeleteUser(user.id)} className="inline-flex justify-center items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">Delete</button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="9" className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">No users found matching your search.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {filteredUsers.length > usersPerPage && (
              <div className="flex flex-col sm:flex-row items-center justify-between mt-4 space-y-4 sm:space-y-0">
                <div className="text-sm text-gray-700">
                  Showing <span className="font-medium">{indexOfFirstUser + 1}</span> to <span className="font-medium">{Math.min(indexOfLastUser, filteredUsers.length)}</span> of <span className="font-medium">{filteredUsers.length}</span> users
                </div>
                <div className="flex flex-wrap justify-center gap-2">
                  {renderPaginationButtons()}
                </div>
              </div>
            )}
          </>
        )}
      </div>

      <div className="w-full">
        <Footer />
      </div>
    </div>
  );
};

export default UserManagement;