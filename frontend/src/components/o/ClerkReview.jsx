
// // // import React, { useState, useEffect } from 'react';
// // // import axios from 'axios';

// // // const ClerkReview = () => {
// // //   const [request, setRequest] = useState(null);
// // //   const [clerkComment, setClerkComment] = useState('');
// // //   const [message, setMessage] = useState('');
// // //   const [loading, setLoading] = useState(false);

// // //   // Fetch one pending request
// // //   useEffect(() => {
// // //     const fetchPendingRequest = async () => {
// // //       try {
// // //         const res = await axios.get('http://localhost:5000/api/requests/clerk/pending'); 
// // //         setRequest(res.data);
// // //       } catch (err) {
// // //         setMessage('No pending requests found');
// // //       }
// // //     };
// // //     fetchPendingRequest();
// // //   }, []);

// // //   const handleReview = async (status) => {
// // //     if (!clerkComment.trim()) {
// // //       setMessage('Please enter a comment before submitting.');
// // //       return;
// // //     }

// // //     setLoading(true);
// // //     try {
// // //       await axios.put(`http://localhost:5000/api/requests/clerk/${request.id}`, {
// // //   status,
// // //   clerk_comment: clerkComment,
// // // });


// // //       setMessage(`Request ${status} successfully.`);
// // //       setRequest(null); // Optionally refresh the page or fetch next request
// // //     } catch (err) {
// // //       setMessage('Error submitting review: ' + err.response?.data?.message);
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   if (!request) {
// // //     return <div className="p-4 text-gray-700">{message || 'Loading request...'}</div>;
// // //   }

// // //   return (
// // //     <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-md space-y-4">
// // //       <h2 className="text-xl font-semibold text-center text-blue-700">Clerk Review</h2>

// // //       <div className="space-y-2 text-gray-800">
// // //         <p><strong>Staff ID:</strong> {request.staff_id}</p>
// // //         <p><strong>Item Serial:</strong> {request.item_serial}</p>
// // //         <p><strong>Quantity:</strong> {request.quantity}</p>
// // //         <p><strong>Explanation:</strong> {request.explanation}</p>
// // //       </div>

// // //       <textarea
// // //         className="w-full border p-2 rounded"
// // //         rows="3"
// // //         placeholder="Add your comment..."
// // //         value={clerkComment}
// // //         onChange={(e) => setClerkComment(e.target.value)}
// // //       />

// // //       <div className="flex justify-between">
// // //         <button
// // //           className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
// // //           onClick={() => handleReview('approved')}
// // //           disabled={loading}
// // //         >
// // //           Approve
// // //         </button>
// // //         <button
// // //           className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
// // //           onClick={() => handleReview('rejected_clerk')}
// // //           disabled={loading}
// // //         >
// // //           Reject
// // //         </button>
// // //       </div>

// // //       {message && <p className="text-sm text-center text-blue-500 mt-3">{message}</p>}
// // //     </div>
// // //   );
// // // };

// // // export default ClerkReview;
// // import React, { useState, useEffect } from 'react';
// // import axios from 'axios';


// // const ClerkReview = () => {
// //   const [pendingRequest, setPendingRequest] = useState(null);
// //   const [isLoading, setIsLoading] = useState(true);
// //   const [reviewData, setReviewData] = useState({
// //     status: 'approved',
// //     clerk_comment: '',
// //     giveItem: false
// //   });
// //   const { enqueueSnackbar } = useSnackbar();

// //   // Fetch pending request
// //   const fetchPendingRequest = async () => {
// //     try {
// //       setIsLoading(true);
// //       const response = await axios.get('http://localhost:5000/api/pending');
// //       setPendingRequest(response.data);
// //     } catch (error) {
// //       enqueueSnackbar('Failed to fetch pending request', { variant: 'error' });
// //       console.error('Fetch error:', error);
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchPendingRequest();
// //   }, []);

// //   // Handle review submission
// //   const handleReviewSubmit = async () => {
// //     try {
// //       setIsLoading(true);
// //       await axios.put(`/api/${pendingRequest.id}`, reviewData);
// //       enqueueSnackbar('Request processed successfully', { variant: 'success' });
// //       fetchPendingRequest(); // Refresh to get next pending request
// //       setReviewData({
// //         status: 'approved',
// //         clerk_comment: '',
// //         giveItem: false
// //       });
// //     } catch (error) {
// //       enqueueSnackbar('Failed to process request', { variant: 'error' });
// //       console.error('Submission error:', error);
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   if (isLoading && !pendingRequest) {
// //     return (
// //       <Box display="flex" justifyContent="center" mt={4}>
// //         <CircularProgress />
// //       </Box>
// //     );
// //   }

// //   if (!pendingRequest) {
// //     return (
// //       <Box textAlign="center" mt={4}>
// //         <Typography variant="h6">No pending requests to review</Typography>
// //       </Box>
// //     );
// //   }

// //   return (
// //     <Box maxWidth="md" mx="auto" mt={4}>
// //       <Card>
// //         <CardContent>
// //           <Typography variant="h5" gutterBottom>
// //             Review Item Request
// //           </Typography>
          
// //           <Grid container spacing={3}>
// //             <Grid item xs={12} md={6}>
// //               <Typography variant="subtitle1">Request Details</Typography>
// //               <Divider sx={{ my: 2 }} />
              
// //               <Typography><strong>Request ID:</strong> {pendingRequest.id}</Typography>
// //               <Typography><strong>Staff ID:</strong> {pendingRequest.staff_id}</Typography>
// //               <Typography><strong>Item Serial:</strong> {pendingRequest.serial_no}</Typography>
// //               <Typography><strong>Quantity:</strong> {pendingRequest.quantity}</Typography>
// //               <Typography><strong>Request Date:</strong> {new Date(pendingRequest.request_date).toLocaleString()}</Typography>
// //             </Grid>
            
// //             <Grid item xs={12} md={6}>
// //               <Typography variant="subtitle1">Review Actions</Typography>
// //               <Divider sx={{ my: 2 }} />
              
// //               <TextField
// //                 select
// //                 fullWidth
// //                 label="Status"
// //                 value={reviewData.status}
// //                 onChange={(e) => setReviewData({...reviewData, status: e.target.value})}
// //                 SelectProps={{ native: true }}
// //                 margin="normal"
// //               >
// //                 <option value="approved">Approve</option>
// //                 <option value="rejected">Reject</option>
// //               </TextField>
              
// //               <TextField
// //                 fullWidth
// //                 label="Comments"
// //                 value={reviewData.clerk_comment}
// //                 onChange={(e) => setReviewData({...reviewData, clerk_comment: e.target.value})}
// //                 margin="normal"
// //                 multiline
// //                 rows={3}
// //               />
              
// //               {reviewData.status === 'approved' && (
// //                 <Box mt={2}>
// //                   <Typography component="label" display="flex" alignItems="center">
// //                     <input
// //                       type="checkbox"
// //                       checked={reviewData.giveItem}
// //                       onChange={(e) => setReviewData({...reviewData, giveItem: e.target.checked})}
// //                       style={{ marginRight: 8 }}
// //                     />
// //                     Give items immediately
// //                   </Typography>
// //                   <Typography variant="caption" display="block">
// //                     (This will update inventory and record the transaction)
// //                   </Typography>
// //                 </Box>
// //               )}
              
// //               <Box mt={3} display="flex" justifyContent="flex-end">
// //                 <Button
// //                   variant="contained"
// //                   color="primary"
// //                   onClick={handleReviewSubmit}
// //                   disabled={isLoading}
// //                 >
// //                   {isLoading ? <CircularProgress size={24} /> : 'Submit Review'}
// //                 </Button>
// //               </Box>
// //             </Grid>
// //           </Grid>
// //         </CardContent>
// //       </Card>
// //     </Box>
// //   );
// // };

// // export default ClerkReview;

// // ClerkAddItem.jsx
// // import React, { useState } from 'react';
// // import axios from 'axios';

// // const ClerkAddItem = () => {
// //   const [formData, setFormData] = useState({
// //     name: '',
// //     description: '',
// //     quantity: '',
// //     is_available: true,
// //   });

// //   const [loading, setLoading] = useState(false);
// //   const [result, setResult] = useState(null); // holds serial_no and barcode URL
// //   const [error, setError] = useState('');

// //   const handleChange = (e) => {
// //     const { name, value, type, checked } = e.target;
// //     setFormData({
// //       ...formData,
// //       [name]: type === 'checkbox' ? checked : value,
// //     });
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setLoading(true);
// //     setError('');
// //     setResult(null);

// //     try {
// //       const response = await axios.post('http://localhost:3000/items/add', formData);
// //       setResult(response.data);
// //     } catch (err) {
// //       setError(err.response?.data?.message || 'Failed to add item');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg mt-10 border border-gray-200">
// //       <h2 className="text-xl font-semibold mb-4 text-center">Add New Item</h2>

// //       <form onSubmit={handleSubmit} className="space-y-4">
// //         <div>
// //           <label className="block text-sm font-medium">Name</label>
// //           <input
// //             type="text"
// //             name="name"
// //             required
// //             value={formData.name}
// //             onChange={handleChange}
// //             className="w-full mt-1 px-3 py-2 border rounded-md"
// //           />
// //         </div>

// //         <div>
// //           <label className="block text-sm font-medium">Description</label>
// //           <textarea
// //             name="description"
// //             value={formData.description}
// //             onChange={handleChange}
// //             className="w-full mt-1 px-3 py-2 border rounded-md"
// //             rows={3}
// //           />
// //         </div>

// //         <div>
// //           <label className="block text-sm font-medium">Quantity</label>
// //           <input
// //             type="number"
// //             name="quantity"
// //             required
// //             value={formData.quantity}
// //             onChange={handleChange}
// //             className="w-full mt-1 px-3 py-2 border rounded-md"
// //           />
// //         </div>

// //         <div className="flex items-center">
// //           <input
// //             type="checkbox"
// //             name="is_available"
// //             checked={formData.is_available}
// //             onChange={handleChange}
// //             className="mr-2"
// //           />
// //           <label>Available</label>
// //         </div>

// //         <button
// //           type="submit"
// //           disabled={loading}
// //           className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
// //         >
// //           {loading ? 'Adding...' : 'Add Item'}
// //         </button>
// //       </form>

// //       {/* Success display */}
// //       {result && (
// //         <div className="mt-6 text-center">
// //           <h3 className="text-green-600 font-semibold">Item Added Successfully!</h3>
// //           <p className="mt-2 text-sm">Serial No: <strong>{result.serial_no}</strong></p>
// //           <img
// //             src={`http://localhost:3000${result.barcode}`}
// //             alt="Generated Barcode"
// //             className="mx-auto mt-4 border p-2 bg-white"
// //           />
// //         </div>
// //       )}

// //       {/* Error message */}
// //       {error && <p className="text-red-600 mt-4 text-sm text-center">{error}</p>}
// //     </div>
// //   );
// // };

// // export default ClerkAddItem;
// import React, { useState } from "react";
// import axios from "axios";

// const ClerkScanPage = () => {
//   const [barcode, setBarcode] = useState("");
//   const [item, setItem] = useState(null);
//   const [error, setError] = useState("");

//   const handleScan = async (e) => {
//     e.preventDefault();
//     setError("");
//     setItem(null);
//     if (!barcode) return setError("Please enter or scan a barcode.");

//     try {
//       const res = await axios.get(
//         `http://localhost:5000/api/clerk/items/barcode/${barcode}`
//       );
//       setItem(res.data.data);
//     } catch (err) {
//       setError(
//         err.response?.data?.message || "Item not found or server error."
//       );
//     }
//   };

//   return (
//     <div style={{ maxWidth: 500, margin: "2rem auto" }}>
//       <h2>Scan or Enter Item Barcode</h2>
//       <form onSubmit={handleScan} style={{ marginBottom: 20 }}>
//         <input
//           type="text"
//           value={barcode}
//           onChange={(e) => setBarcode(e.target.value)}
//           placeholder="Scan or enter barcode"
//           style={{ padding: 8, width: "70%" }}
//         />
//         <button type="submit" style={{ padding: 8, marginLeft: 8 }}>
//           Search
//         </button>
//       </form>
//       {error && <div style={{ color: "red", marginBottom: 10 }}>{error}</div>}
//       {item && (
//         <div style={{ border: "1px solid #ccc", padding: 16 }}>
//           <h3>Item Info</h3>
//           <p><b>Name:</b> {item.basicInfo.name}</p>
//           <p><b>Serial No:</b> {item.basicInfo.serialNo}</p>
//           <p><b>Barcode:</b> {item.basicInfo.barcode}</p>
//           <p><b>Quantity:</b> {item.basicInfo.quantity}</p>
//           <p><b>Location:</b> {item.basicInfo.location}</p>
//           <p><b>Category:</b> {item.basicInfo.category}</p>
//           <p><b>Supplier:</b> {item.basicInfo.supplier}</p>
//           <p><b>Description:</b> {item.description}</p>
//           <p><b>Created At:</b> {item.metadata.createdAt}</p>
//           <p><b>Last Updated:</b> {item.metadata.lastUpdated}</p>
//           {item.history && item.history.length > 0 && (
//             <>
//               <h4>Recent History</h4>
//               <ul>
//                 {item.history.map((h, idx) => (
//                   <li key={idx}>
//                     {h.name} - {h.created_at}
//                   </li>
//                 ))}
//               </ul>
//             </>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default ClerkScanPage;