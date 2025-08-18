



// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom'; // Import useNavigate
// import axios from 'axios';

// const ClerkPage = () => {
//   const [items, setItems] = useState([]);
//   const [groupedItems, setGroupedItems] = useState({});
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');

//   const navigate = useNavigate(); // Create navigate function

//   useEffect(() => {
//     fetchItems();
//   }, []);

//   const fetchItems = async () => {
//     try {
//       const res = await axios.get('http://localhost:5000/api/items/items');
//       const data = res.data;

//       const grouped = {};
//       data.forEach(item => {
//         if (!grouped[item.name]) {
//           grouped[item.name] = [];
//         }
//         grouped[item.name].push(item);
//       });

//       setItems(data);
//       setGroupedItems(grouped);
//     } catch (err) {
//       console.error(err);
//       setError('Failed to fetch items');
//     }
//   };

//   const handleDelete = async (id) => {
//     const confirmDelete = window.confirm('Are you sure you want to delete this item?');
//     if (!confirmDelete) return;

//     try {
//       setError('');
//       setSuccess('');

//       await axios.delete(`http://localhost:5000/api/items/items/${id}`);

//       const newItems = items.filter(item => item.id !== id);

//       const newGrouped = {};
//       newItems.forEach(item => {
//         if (!newGrouped[item.name]) {
//           newGrouped[item.name] = [];
//         }
//         newGrouped[item.name].push(item);
//       });

//       setItems(newItems);
//       setGroupedItems(newGrouped);

//       setSuccess('Item deleted successfully.');
//     } catch (err) {
//       console.error('Failed to delete item:', err);
//       setError('Failed to delete item. Try again later.');
//     }
//   };

//   const handleUpdate = (id) => {
//     navigate(`/update-item/${id}`);
//   };

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-semibold mb-4">Grouped Items by Name</h1>

//       {error && <p className="text-red-500 mb-4">{error}</p>}
//       {success && <p className="text-green-600 mb-4">{success}</p>}

//       <table className="w-full border-collapse border border-gray-300">
//         <thead>
//           <tr className="bg-gray-100">
//             <th className="border p-2">Name</th>
//             <th className="border p-2">Serial No</th>
//             <th className="border p-2">Description</th>
//             <th className="border p-2">Quantity</th>
//             <th className="border p-2">Available</th>
//             <th className="border p-2">Created At</th>
//             <th className="border p-2">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {Object.entries(groupedItems).map(([name, items]) =>
//             items.map((item, idx) => (
//               <tr key={item.id}>
//                 {idx === 0 ? (
//                   <td className="border p-2" rowSpan={items.length}>
//                     {name}
//                   </td>
//                 ) : null}
//                 <td className="border p-2">{item.serial_no}</td>
//                 <td className="border p-2">{item.description}</td>
//                 <td className="border p-2">{item.quantity}</td>
//                 <td className="border p-2">{item.is_available ? 'Yes' : 'No'}</td>
//                 <td className="border p-2">{new Date(item.created_at).toLocaleString()}</td>
//                 <td className="border p-2 text-center space-x-2">
//                   <button
//                     onClick={() => handleUpdate(item.id)}
//                     className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
//                   >
//                     Update
//                   </button>
//                   <button
//                     onClick={() => handleDelete(item.id)}
//                     className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default ClerkPage;


// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { Card } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Badge } from '@/components/ui/badge';
// import { 
//   Table, 
//   TableBody, 
//   TableCell, 
//   TableHead, 
//   TableHeader, 
//   TableRow 
// } from '@/components/ui/table';
// import { 
//   Edit3, 
//   Trash2, 
//   Package, 
//   CheckCircle, 
//   XCircle, 
//   Search,
//   Filter,
//   Plus
// } from 'lucide-react';

// const ClerkPage = () => {
//   const [items, setItems] = useState([]);
//   const [groupedItems, setGroupedItems] = useState({});
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [isLoading, setIsLoading] = useState(true);

//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchItems();
//   }, []);

//   const fetchItems = async () => {
//     try {
//       setIsLoading(true);
//       const res = await axios.get('http://localhost:5000/api/items/items');
//       const data = res.data;

//       const grouped = {};
//       data.forEach(item => {
//         if (!grouped[item.name]) {
//           grouped[item.name] = [];
//         }
//         grouped[item.name].push(item);
//       });

//       setItems(data);
//       setGroupedItems(grouped);
//     } catch (err) {
//       console.error(err);
//       setError('Failed to fetch items');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleDelete = async (id) => {
//     const confirmDelete = window.confirm('Are you sure you want to delete this item?');
//     if (!confirmDelete) return;

//     try {
//       setError('');
//       setSuccess('');

//       await axios.delete(`http://localhost:5000/api/items/items/${id}`);

//       const newItems = items.filter(item => item.id !== id);

//       const newGrouped = {};
//       newItems.forEach(item => {
//         if (!newGrouped[item.name]) {
//           newGrouped[item.name] = [];
//         }
//         newGrouped[item.name].push(item);
//       });

//       setItems(newItems);
//       setGroupedItems(newGrouped);

//       setSuccess('Item deleted successfully.');
//     } catch (err) {
//       console.error('Failed to delete item:', err);
//       setError('Failed to delete item. Try again later.');
//     }
//   };

//   const handleUpdate = (id) => {
//     navigate(`/update-item/${id}`);
//   };

//   const filteredGroupedItems = Object.entries(groupedItems).filter(([name]) =>
//     name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const LoadingSkeleton = () => (
//     <div className="space-y-4">
//       {[...Array(5)].map((_, i) => (
//         <div key={i} className="bg-card/50 rounded-lg p-4 animate-pulse">
//           <div className="h-4 bg-muted rounded w-1/4 mb-2"></div>
//           <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
//           <div className="h-4 bg-muted rounded w-1/2"></div>
//         </div>
//       ))}
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-gradient-background">
//       {/* Header Section */}
//       <div className="bg-card/10 backdrop-blur-xl border-b border-border/50 sticky top-0 z-10">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
//           <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//             <div className="flex items-center gap-3">
//               <div className="p-3 bg-gradient-primary rounded-xl shadow-glow">
//                 <Package className="h-8 w-8 text-primary-foreground" />
//               </div>
//               <div>
//                 <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
//                   Inventory Management
//                 </h1>
//                 <p className="text-muted-foreground mt-1">
//                   Manage your items efficiently
//                 </p>
//               </div>
//             </div>
            
//             <Button 
//               onClick={() => navigate('/add-item')}
//               className="bg-gradient-secondary hover:shadow-accent transition-all duration-300 sm:w-auto w-full"
//             >
//               <Plus className="h-4 w-4 mr-2" />
//               Add New Item
//             </Button>
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* Search and Filter Section */}
//         <Card className="mb-8 bg-card/50 backdrop-blur-xl border-border/50 shadow-elegant">
//           <div className="p-6">
//             <div className="flex flex-col sm:flex-row gap-4">
//               <div className="relative flex-1">
//                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//                 <input
//                   type="text"
//                   placeholder="Search items by name..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="w-full pl-10 pr-4 py-3 bg-input border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
//                 />
//               </div>
//               <Button variant="outline" className="sm:w-auto w-full">
//                 <Filter className="h-4 w-4 mr-2" />
//                 Filter
//               </Button>
//             </div>
//           </div>
//         </Card>

//         {/* Alert Messages */}
//         {error && (
//           <Card className="mb-6 border-destructive/20 bg-destructive/5 animate-fade-in">
//             <div className="p-4 flex items-center gap-3">
//               <XCircle className="h-5 w-5 text-destructive" />
//               <p className="text-destructive font-medium">{error}</p>
//             </div>
//           </Card>
//         )}

//         {success && (
//           <Card className="mb-6 border-success/20 bg-success/5 animate-fade-in">
//             <div className="p-4 flex items-center gap-3">
//               <CheckCircle className="h-5 w-5 text-success" />
//               <p className="text-success font-medium">{success}</p>
//             </div>
//           </Card>
//         )}

//         {/* Loading State */}
//         {isLoading ? (
//           <LoadingSkeleton />
//         ) : (
//           <>
//             {/* Desktop Table View */}
//             <Card className="hidden lg:block bg-card/50 backdrop-blur-xl border-border/50 shadow-elegant animate-fade-in">
//               <div className="overflow-x-auto">
//                 <Table>
//                   <TableHeader>
//                     <TableRow className="border-border/50 bg-muted/30">
//                       <TableHead className="font-semibold text-foreground">Name</TableHead>
//                       <TableHead className="font-semibold text-foreground">Serial No</TableHead>
//                       <TableHead className="font-semibold text-foreground">Description</TableHead>
//                       <TableHead className="font-semibold text-foreground">Quantity</TableHead>
//                       <TableHead className="font-semibold text-foreground">Available</TableHead>
//                       <TableHead className="font-semibold text-foreground">Created</TableHead>
//                       <TableHead className="font-semibold text-foreground text-center">Actions</TableHead>
//                     </TableRow>
//                   </TableHeader>
//                   <TableBody>
//                     {filteredGroupedItems.map(([name, items]) =>
//                       items.map((item, idx) => (
//                         <TableRow 
//                           key={item.id} 
//                           className="border-border/30 hover:bg-muted/20 transition-colors duration-200"
//                         >
//                           {idx === 0 ? (
//                             <TableCell 
//                               className="font-medium text-foreground bg-gradient-primary bg-clip-text text-transparent" 
//                               rowSpan={items.length}
//                             >
//                               {name}
//                             </TableCell>
//                           ) : null}
//                           <TableCell className="font-mono text-sm">{item.serial_no}</TableCell>
//                           <TableCell className="max-w-xs truncate">{item.description}</TableCell>
//                           <TableCell>
//                             <Badge variant="outline" className="font-medium">
//                               {item.quantity}
//                             </Badge>
//                           </TableCell>
//                           <TableCell>
//                             <Badge 
//                               variant={item.is_available ? "default" : "destructive"}
//                               className={item.is_available ? "bg-success" : ""}
//                             >
//                               {item.is_available ? (
//                                 <><CheckCircle className="h-3 w-3 mr-1" /> Available</>
//                               ) : (
//                                 <><XCircle className="h-3 w-3 mr-1" /> Unavailable</>
//                               )}
//                             </Badge>
//                           </TableCell>
//                           <TableCell className="text-sm text-muted-foreground">
//                             {new Date(item.created_at).toLocaleDateString()}
//                           </TableCell>
//                           <TableCell>
//                             <div className="flex items-center justify-center gap-2">
//                               <Button
//                                 onClick={() => handleUpdate(item.id)}
//                                 size="sm"
//                                 variant="outline"
//                                 className="h-8 w-8 p-0 hover:bg-primary hover:text-primary-foreground transition-all duration-200"
//                               >
//                                 <Edit3 className="h-3 w-3" />
//                               </Button>
//                               <Button
//                                 onClick={() => handleDelete(item.id)}
//                                 size="sm"
//                                 variant="outline"
//                                 className="h-8 w-8 p-0 hover:bg-destructive hover:text-destructive-foreground transition-all duration-200"
//                               >
//                                 <Trash2 className="h-3 w-3" />
//                               </Button>
//                             </div>
//                           </TableCell>
//                         </TableRow>
//                       ))
//                     )}
//                   </TableBody>
//                 </Table>
//               </div>
//             </Card>

//             {/* Mobile Card View */}
//             <div className="lg:hidden space-y-4">
//               {filteredGroupedItems.map(([name, items]) => (
//                 <Card 
//                   key={name} 
//                   className="bg-card/50 backdrop-blur-xl border-border/50 shadow-elegant animate-fade-in"
//                 >
//                   <div className="p-4">
//                     <h3 className="text-lg font-semibold mb-3 bg-gradient-primary bg-clip-text text-transparent">
//                       {name}
//                     </h3>
//                     <div className="space-y-3">
//                       {items.map((item) => (
//                         <div 
//                           key={item.id} 
//                           className="p-4 bg-muted/30 rounded-lg border border-border/30"
//                         >
//                           <div className="flex justify-between items-start mb-2">
//                             <div className="space-y-1">
//                               <p className="text-sm font-medium text-muted-foreground">Serial No</p>
//                               <p className="font-mono text-sm">{item.serial_no}</p>
//                             </div>
//                             <Badge 
//                               variant={item.is_available ? "default" : "destructive"}
//                               className={item.is_available ? "bg-success" : ""}
//                             >
//                               {item.is_available ? (
//                                 <><CheckCircle className="h-3 w-3 mr-1" /> Available</>
//                               ) : (
//                                 <><XCircle className="h-3 w-3 mr-1" /> Unavailable</>
//                               )}
//                             </Badge>
//                           </div>
                          
//                           <div className="space-y-2 mb-3">
//                             <div>
//                               <p className="text-sm font-medium text-muted-foreground">Description</p>
//                               <p className="text-sm">{item.description}</p>
//                             </div>
//                             <div className="flex justify-between">
//                               <div>
//                                 <p className="text-sm font-medium text-muted-foreground">Quantity</p>
//                                 <Badge variant="outline">{item.quantity}</Badge>
//                               </div>
//                               <div>
//                                 <p className="text-sm font-medium text-muted-foreground">Created</p>
//                                 <p className="text-sm">{new Date(item.created_at).toLocaleDateString()}</p>
//                               </div>
//                             </div>
//                           </div>
                          
//                           <div className="flex gap-2">
//                             <Button
//                               onClick={() => handleUpdate(item.id)}
//                               variant="outline"
//                               size="sm"
//                               className="flex-1 hover:bg-primary hover:text-primary-foreground transition-all duration-200"
//                             >
//                               <Edit3 className="h-4 w-4 mr-2" />
//                               Update
//                             </Button>
//                             <Button
//                               onClick={() => handleDelete(item.id)}
//                               variant="outline"
//                               size="sm"
//                               className="flex-1 hover:bg-destructive hover:text-destructive-foreground transition-all duration-200"
//                             >
//                               <Trash2 className="h-4 w-4 mr-2" />
//                               Delete
//                             </Button>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 </Card>
//               ))}
//             </div>

//             {filteredGroupedItems.length === 0 && !isLoading && (
//               <Card className="bg-card/50 backdrop-blur-xl border-border/50 shadow-elegant animate-fade-in">
//                 <div className="p-12 text-center">
//                   <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
//                   <h3 className="text-xl font-semibold mb-2">No items found</h3>
//                   <p className="text-muted-foreground mb-6">
//                     {searchTerm ? 'Try adjusting your search terms' : 'Start by adding your first item'}
//                   </p>
//                   <Button 
//                     onClick={() => navigate('/add-item')}
//                     className="bg-gradient-primary hover:shadow-glow transition-all duration-300"
//                   >
//                     <Plus className="h-4 w-4 mr-2" />
//                     Add First Item
//                   </Button>
//                 </div>
//               </Card>
//             )}
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ClerkPage;

// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { QRCodeCanvas } from 'qrcode.react';
// import { QrReader } from 'react-qr-reader';

// const ClerkPage = () => {
//   const [items, setItems] = useState([]);
//   const [groupedItems, setGroupedItems] = useState({});
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');
//   const [isLoading, setIsLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [scanResult, setScanResult] = useState(null);

//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchItems();
//   }, []);

//   const fetchItems = async () => {
//     try {
//       setIsLoading(true);
//       const res = await axios.get('http://localhost:5000/api/items/items');
//       const data = res.data;

//       const grouped = {};
//       data.forEach(item => {
//         grouped[item.name] ??= [];
//         grouped[item.name].push(item);
//       });

//       setItems(data);
//       setGroupedItems(grouped);
//       setIsLoading(false);
//     } catch (err) {
//       console.error(err);
//       setError('Failed to fetch items');
//       setIsLoading(false);
//     }
//   };

//   const handleDelete = async (id) => {
//     const confirmDelete = window.confirm('Are you sure you want to delete this item?');
//     if (!confirmDelete) return;

//     try {
//       setError('');
//       setSuccess('');
//       setIsLoading(true);

//       await axios.delete(`http://localhost:5000/api/items/items/${id}`);

//       const newItems = items.filter(item => item.id !== id);
//       const newGrouped = {};
//       newItems.forEach(item => {
//         newGrouped[item.name] ??= [];
//         newGrouped[item.name].push(item);
//       });

//       setItems(newItems);
//       setGroupedItems(newGrouped);
//       setIsLoading(false);
//       setSuccess('Item deleted successfully.');
//       setTimeout(() => setSuccess(''), 3000);
//     } catch (err) {
//       console.error('Failed to delete item:', err);
//       setError('Failed to delete item. Try again later.');
//       setIsLoading(false);
//     }
//   };

//   const handleUpdate = (id) => {
//     navigate(`/update-item/${id}`);
//   };

//   const filteredGroups = Object.entries(groupedItems).filter(([name]) =>
//     name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="p-4 md:p-8">
//       <div className="max-w-7xl mx-auto">
//         <h1 className="text-3xl font-bold mb-6">Inventory Management</h1>

//         {/* Items Table */}
//         {!isLoading && (
//           <div className="bg-white rounded-xl shadow-md overflow-hidden">
//             <div className="overflow-x-auto">
//               <table className="min-w-full divide-y divide-gray-200">
//                 <thead className="bg-gray-50">
//                   <tr>
//                     <th className="px-6 py-3 text-left text-xs font-medium">Name</th>
//                     <th className="px-6 py-3 text-left text-xs font-medium">Serial No</th>
//                     <th className="px-6 py-3 text-left text-xs font-medium">Description</th>
//                     <th className="px-6 py-3 text-left text-xs font-medium">Quantity</th>
//                     <th className="px-6 py-3 text-left text-xs font-medium">Status</th>
//                     <th className="px-6 py-3 text-left text-xs font-medium">QR Code</th>
//                     <th className="px-6 py-3 text-left text-xs font-medium">Created At</th>
//                     <th className="px-6 py-3 text-right text-xs font-medium">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody className="bg-white divide-y divide-gray-200">
//                   {filteredGroups.length > 0 ? (
//                     filteredGroups.map(([name, items]) =>
//                       items.map((item, idx) => (
//                         <tr key={item.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
//                           {idx === 0 && (
//                             <td rowSpan={items.length} className="px-6 py-4 font-medium">
//                               {name}
//                             </td>
//                           )}
//                           <td className="px-6 py-4">{item.serial_no}</td>
//                           <td className="px-6 py-4">{item.description || 'N/A'}</td>
//                           <td className="px-6 py-4">{item.quantity}</td>
//                           <td className="px-6 py-4">{item.is_available ? 'Available' : 'Unavailable'}</td>
//                           <td className="px-6 py-4">
//                             <QRCodeCanvas
//                               value={JSON.stringify({
//                                 name: item.name,
//                                 serial_no: item.serial_no,
//                                 description: item.description,
//                                 quantity: item.quantity,
//                                 is_available: item.is_available,
//                               })}
//                               size={80}
//                             />
//                           </td>
//                           <td className="px-6 py-4">{new Date(item.created_at).toLocaleDateString()}</td>
//                           <td className="px-6 py-4 text-right">
//                             <button onClick={() => handleUpdate(item.id)} className="px-3 py-1 mr-2 bg-yellow-200 rounded">
//                               Edit
//                             </button>
//                             <button onClick={() => handleDelete(item.id)} className="px-3 py-1 bg-red-200 rounded">
//                               Delete
//                             </button>
//                           </td>
//                         </tr>
//                       ))
//                     )
//                   ) : (
//                     <tr>
//                       <td colSpan="8" className="px-6 py-4 text-center">
//                         {searchTerm ? 'No items match your search' : 'No items found'}
//                       </td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         )}

//         {/* QR Code Scanner */}
//         <div className="mt-8 p-4 bg-gray-50 rounded-lg shadow">
//           <h2 className="text-xl font-semibold mb-3">Scan Item QR Code</h2>
//           <QrReader
//             constraints={{ facingMode: 'environment' }}
//             onResult={(result, error) => {
//               if (result) {
//                 try {
//                   const data = JSON.parse(result?.text);
//                   setScanResult(data);
//                 } catch (e) {
//                   setError('Invalid QR code data');
//                 }
//               }
//             }}
//             style={{ width: '300px' }}
//           />
//           {scanResult && (
//             <div className="mt-4 p-3 bg-white border rounded">
//               <h3 className="font-bold">{scanResult.name}</h3>
//               <p>Serial: {scanResult.serial_no}</p>
//               <p>Description: {scanResult.description}</p>
//               <p>Quantity: {scanResult.quantity}</p>
//               <p>Status: {scanResult.is_available ? 'Available' : 'Unavailable'}</p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ClerkPage;

// corect one

// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { QRCodeCanvas } from 'qrcode.react';
// import { QrReader } from 'react-qr-reader';
// import { io } from 'socket.io-client';

// // Connect to Socket.IO backend
// const socket = io('http://localhost:5000');

// const ClerkPage = () => {
//   const [items, setItems] = useState([]);
//   const [groupedItems, setGroupedItems] = useState({});
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');
//   const [isLoading, setIsLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [scanResult, setScanResult] = useState(null);

//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchItems();

//     // Listen for real-time new items
//     socket.on('new_item', (newItem) => {
//       setItems(prev => [newItem, ...prev]);

//       setGroupedItems(prev => {
//         const newGrouped = { ...prev };
//         newGrouped[newItem.name] ??= [];
//         newGrouped[newItem.name].unshift(newItem);
//         return newGrouped;
//       });
//     });

//     return () => {
//       socket.off('new_item');
//     };
//   }, []);

//   const fetchItems = async () => {
//     try {
//       setIsLoading(true);
//       const res = await axios.get('http://localhost:5000/api/items/items');
//       const data = res.data;

//       const grouped = {};
//       data.forEach(item => {
//         grouped[item.name] ??= [];
//         grouped[item.name].push(item);
//       });

//       setItems(data);
//       setGroupedItems(grouped);
//       setIsLoading(false);
//     } catch (err) {
//       console.error(err);
//       setError('Failed to fetch items');
//       setIsLoading(false);
//     }
//   };

//   const handleDelete = async (id) => {
//     const confirmDelete = window.confirm('Are you sure you want to delete this item?');
//     if (!confirmDelete) return;

//     try {
//       setError('');
//       setSuccess('');
//       setIsLoading(true);

//       await axios.delete(`http://localhost:5000/api/items/items/${id}`);

//       const newItems = items.filter(item => item.id !== id);
//       const newGrouped = {};
//       newItems.forEach(item => {
//         newGrouped[item.name] ??= [];
//         newGrouped[item.name].push(item);
//       });

//       setItems(newItems);
//       setGroupedItems(newGrouped);
//       setIsLoading(false);
//       setSuccess('Item deleted successfully.');
//       setTimeout(() => setSuccess(''), 3000);
//     } catch (err) {
//       console.error('Failed to delete item:', err);
//       setError('Failed to delete item. Try again later.');
//       setIsLoading(false);
//     }
//   };

//   const handleUpdate = (id) => {
//     navigate(`/update-item/${id}`);
//   };

//   const formatDate = (dateStr) => {
//     if (!dateStr) return 'N/A';
//     const date = new Date(dateStr);
//     if (isNaN(date.getTime())) return 'Invalid Date';
//     return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
//   };

//   const filteredGroups = Object.entries(groupedItems).filter(([name]) =>
//     name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="p-4 md:p-8">
//       <div className="max-w-7xl mx-auto">
//         <h1 className="text-3xl font-bold mb-6">Inventory Management</h1>

//         {/* Items Table */}
//         {!isLoading && (
//           <div className="bg-white rounded-xl shadow-md overflow-hidden">
//             <div className="overflow-x-auto">
//               <table className="min-w-full divide-y divide-gray-200">
//                 <thead className="bg-gray-50">
//                   <tr>
//                     <th className="px-6 py-3 text-left text-xs font-medium">Name</th>
//                     <th className="px-6 py-3 text-left text-xs font-medium">Serial No</th>
//                     <th className="px-6 py-3 text-left text-xs font-medium">Description</th>
//                     <th className="px-6 py-3 text-left text-xs font-medium">Quantity</th>
//                     <th className="px-6 py-3 text-left text-xs font-medium">Status</th>
//                     <th className="px-6 py-3 text-left text-xs font-medium">QR Code</th>
//                     <th className="px-6 py-3 text-left text-xs font-medium">Created At</th>
//                     <th className="px-6 py-3 text-right text-xs font-medium">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody className="bg-white divide-y divide-gray-200">
//                   {filteredGroups.length > 0 ? (
//                     filteredGroups.map(([name, items]) =>
//                       items.map((item, idx) => (
//                         <tr key={item.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
//                           {idx === 0 && (
//                             <td rowSpan={items.length} className="px-6 py-4 font-medium">
//                               {name}
//                             </td>
//                           )}
//                           <td className="px-6 py-4">{item.serial_no}</td>
//                           <td className="px-6 py-4">{item.description || 'N/A'}</td>
//                           <td className="px-6 py-4">{item.quantity}</td>
//                           <td className="px-6 py-4">{item.is_available ? 'Available' : 'Unavailable'}</td>
//                           <td className="px-6 py-4">
//                             <QRCodeCanvas
//                               value={JSON.stringify({
//                                 name: item.name,
//                                 serial_no: item.serial_no,
//                                 description: item.description,
//                                 quantity: item.quantity,
//                                 is_available: item.is_available,
//                               })}
//                               size={80}
//                             />
//                           </td>
//                           <td className="px-6 py-4">{formatDate(item.created_at)}</td>
//                           <td className="px-6 py-4 text-right">
//                             <button onClick={() => handleUpdate(item.id)} className="px-3 py-1 mr-2 bg-yellow-200 rounded">
//                               Edit
//                             </button>
//                             <button onClick={() => handleDelete(item.id)} className="px-3 py-1 bg-red-200 rounded">
//                               Delete
//                             </button>
//                           </td>
//                         </tr>
//                       ))
//                     )
//                   ) : (
//                     <tr>
//                       <td colSpan="8" className="px-6 py-4 text-center">
//                         {searchTerm ? 'No items match your search' : 'No items found'}
//                       </td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         )}

//         {/* QR Code Scanner */}
//         <div className="mt-8 p-4 bg-gray-50 rounded-lg shadow">
//           <h2 className="text-xl font-semibold mb-3">Scan Item QR Code</h2>
//           <QrReader
//             constraints={{ facingMode: 'environment' }}
//             onResult={(result, error) => {
//               if (result) {
//                 try {
//                   const data = JSON.parse(result?.text);
//                   setScanResult(data);
//                 } catch (e) {
//                   setError('Invalid QR code data');
//                 }
//               }
//             }}
//             style={{ width: '300px' }}
//           />
//           {scanResult && (
//             <div className="mt-4 p-3 bg-white border rounded">
//               <h3 className="font-bold">{scanResult.name}</h3>
//               <p>Serial: {scanResult.serial_no}</p>
//               <p>Description: {scanResult.description}</p>
//               <p>Quantity: {scanResult.quantity}</p>
//               <p>Status: {scanResult.is_available ? 'Available' : 'Unavailable'}</p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ClerkPage;
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { QRCodeCanvas } from "qrcode.react";
import { io } from "socket.io-client";
import {
  PrinterIcon,
  PlusCircleIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  SearchIcon,
  PackageIcon,
} from "lucide-react";
import Footer from "../../components/Footer/Footer"; // ✅ custom footer

// Connect to Socket.IO backend
const socket = io("http://localhost:5000");

const ClerkPage = () => {
  const [items, setItems] = useState([]);
  const [groupedItems, setGroupedItems] = useState({});
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4; // ✅ max 4 items per page

  const navigate = useNavigate();

  useEffect(() => {
    fetchItems();

    // Listen for real-time new items
    socket.on("new_item", (newItem) => {
      setItems((prev) => [newItem, ...prev]);
      setGroupedItems((prev) => {
        const newGrouped = { ...prev };
        newGrouped[newItem.name] ??= [];
        newGrouped[newItem.name].unshift(newItem);
        return newGrouped;
      });
    });

    return () => {
      socket.off("new_item");
    };
  }, []);

  const fetchItems = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get("http://localhost:5000/api/items/items");
      const data = res.data;

      const grouped = {};
      data.forEach((item) => {
        grouped[item.name] ??= [];
        grouped[item.name].push(item);
      });

      setItems(data);
      setGroupedItems(grouped);
      setIsLoading(false);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch items");
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (!confirmDelete) return;

    try {
      setError("");
      setSuccess("");
      setIsLoading(true);

      await axios.delete(`http://localhost:5000/api/items/items/${id}`);

      const newItems = items.filter((item) => item.id !== id);
      const newGrouped = {};
      newItems.forEach((item) => {
        newGrouped[item.name] ??= [];
        newGrouped[item.name].push(item);
      });

      setItems(newItems);
      setGroupedItems(newGrouped);
      setIsLoading(false);
      setSuccess("Item deleted successfully.");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      console.error("Failed to delete item:", err);
      setError("Failed to delete item. Try again later.");
      setIsLoading(false);
    }
  };

  const handleUpdate = (id) => {
    navigate(`/Clerk/update-item/${id}`);
  };

  const handleAddItem = () => {
    navigate("/Clerk/add-item");
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "N/A";
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return "Invalid Date";
    return date.toLocaleDateString();
  };

  const printQRCode = (item) => {
    const printWindow = window.open("", "_blank");
    printWindow.document.write(`
      <html>
        <head>
          <title>QR Code - ${item.name}</title>
          <style>
            body { text-align: center; padding: 20px; font-family: Arial; }
            h3 { margin-bottom: 5px; }
            p { margin: 5px 0; }
            .qr-container { margin: 20px auto; }
          </style>
        </head>
        <body>
          <h3>${item.name}</h3>
          <p>Serial: ${item.serial_no}</p>
          <p>Quantity: ${item.quantity}</p>
          <div class="qr-container">
            <img src="${document
              .getElementById(`qr-${item.id}`)
              .toDataURL()}" width="200" height="200">
          </div>
          <p>${new Date().toLocaleDateString()}</p>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  const filteredGroups = Object.entries(groupedItems)
    .filter(
      ([name, items]) =>
        name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        items.some((item) =>
          item.serial_no.toLowerCase().includes(searchTerm.toLowerCase())
        )
    )
    .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const totalPages = Math.ceil(
    Object.entries(groupedItems).filter(
      ([name, items]) =>
        name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        items.some((item) =>
          item.serial_no.toLowerCase().includes(searchTerm.toLowerCase())
        )
    ).length / itemsPerPage
  );

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold flex items-center">
              <PackageIcon className="mr-2" /> Inventory Management
            </h1>
            <button
              onClick={handleAddItem}
              className="flex items-center px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800 transition-colors"
            >
              <PlusCircleIcon className="mr-2" /> Add Item
            </button>
          </div>

          {/* Search */}
          <div className="mb-6 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search by item name or serial number..."
              className="pl-10 pr-4 py-2 w-full border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>

          {/* Alerts */}
          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
              {error}
            </div>
          )}
          {success && (
            <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg">
              {success}
            </div>
          )}

          {/* Table */}
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Serial No
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Description
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Quantity
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        QR Code
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Created At
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredGroups.length > 0 ? (
                      filteredGroups.map(([name, items]) =>
                        items.map((item, idx) => (
                          <tr
                            key={item.id}
                            className={
                              idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                            }
                          >
                            {idx === 0 && (
                              <td
                                rowSpan={items.length}
                                className="px-6 py-4 font-medium"
                              >
                                {name}
                              </td>
                            )}
                            <td className="px-6 py-4">{item.serial_no}</td>
                            <td className="px-6 py-4">
                              {item.description || "N/A"}
                            </td>
                            <td className="px-6 py-4">{item.quantity}</td>
                            <td className="px-6 py-4">
                              <span
                                className={`px-2 py-1 rounded-full text-xs ${
                                  item.is_available
                                    ? "bg-green-100 text-green-800"
                                    : "bg-red-100 text-red-800"
                                }`}
                              >
                                {item.is_available
                                  ? "Available"
                                  : "Unavailable"}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex flex-col items-center">
                                <QRCodeCanvas
                                  id={`qr-${item.id}`}
                                  value={JSON.stringify({
                                    name: item.name,
                                    serial_no: item.serial_no,
                                    description: item.description,
                                    quantity: item.quantity,
                                    is_available: item.is_available,
                                  })}
                                  size={80}
                                />
                                <button
                                  onClick={() => printQRCode(item)}
                                  className="mt-2 flex items-center text-xs text-green-700 hover:text-green-900"
                                >
                                  <PrinterIcon className="h-3 w-3 mr-1" /> Print
                                </button>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              {formatDate(item.created_at)}
                            </td>
                            <td className="px-6 py-4 text-right space-x-2">
                              <button
                                onClick={() => handleUpdate(item.id)}
                                className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded hover:bg-yellow-200 transition-colors"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleDelete(item.id)}
                                className="px-3 py-1 bg-red-100 text-red-800 rounded hover:bg-red-200 transition-colors"
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))
                      )
                    ) : (
                      <tr>
                        <td
                          colSpan="8"
                          className="px-6 py-4 text-center text-gray-500"
                        >
                          {searchTerm
                            ? "No items match your search"
                            : "No items found"}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Pagination */}
          {filteredGroups.length > 0 && (
            <div className="mt-4 flex justify-between items-center">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={`flex items-center px-3 py-1 rounded ${
                  currentPage === 1
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-green-700 hover:bg-green-100"
                }`}
              >
                <ChevronLeftIcon className="h-4 w-4 mr-1" /> Previous
              </button>
              <span className="text-sm text-gray-700">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className={`flex items-center px-3 py-1 rounded ${
                  currentPage === totalPages
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-green-700 hover:bg-green-100"
                }`}
              >
                Next <ChevronRightIcon className="h-4 w-4 ml-1" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ✅ Custom Footer */}
      <Footer />
    </div>
  );
};

export default ClerkPage;
