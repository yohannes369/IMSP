// // import React, { useEffect, useState } from "react";
// // import axios from "axios";
// // import { Button } from "@/components/ui/button";
// // import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// // const StaffAcknowledgeItem = () => {
// //   const [givenItems, setGivenItems] = useState([]);

// //   // Fetch "given" items
// //   const fetchGivenItems = async () => {
// //     try {
// //       const res = await axios.get("/api/staff/given-items"); // Backend route
// //       setGivenItems(res.data);
// //     } catch (err) {
// //       console.error("Failed to load given items:", err);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchGivenItems();
// //   }, []);

// //   const handleAcknowledge = async (requestId) => {
// //     try {
// //       await axios.post("/api/staff/acknowledge-item", { requestId });
// //       alert("Acknowledged successfully");
// //       fetchGivenItems(); // Refresh list
// //     } catch (err) {
// //       console.error(err);
// //       alert("Failed to acknowledge");
// //     }
// //   };

// //   return (
// //     <div className="p-6">
// //       <h2 className="text-2xl font-bold mb-4">Items to Acknowledge</h2>
// //       {givenItems.length === 0 ? (
// //         <p>No items to acknowledge.</p>
// //       ) : (
// //         givenItems.map((item) => (
// //           <Card key={item.id} className="mb-4">
// //             <CardHeader>
// //               <CardTitle>{item.item_type} x {item.quantity}</CardTitle>
// //             </CardHeader>
// //             <CardContent>
// //               <p>Given On: {new Date(item.given_date).toLocaleString()}</p>
// //               <Button onClick={() => handleAcknowledge(item.id)} className="mt-2">
// //                 Acknowledge Receipt
// //               </Button>
// //             </CardContent>
// //           </Card>
// //         ))
// //       )}
// //     </div>
// //   );
// // };

// // export default StaffAcknowledgeItem;

// // import React, { useEffect, useState } from "react";
// // import axios from "axios";
// // import { Button } from "@/components/ui/button";
// // import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// // const StaffAcknowledgeItem = () => {
// //   const [givenItems, setGivenItems] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);

// //   // Fetch items with status 'given'
// //   const fetchGivenItems = async () => {
// //     try {
// //       const res = await axios.get("/api/staff/given-items");
// //       const items = Array.isArray(res.data) ? res.data : [];
// //       setGivenItems(items);
// //       setLoading(false);
// //     } catch (err) {
// //       console.error("Failed to load given items:", err);
// //       setError("Failed to load items");
// //       setLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchGivenItems();
// //   }, []);

// //   const handleAcknowledge = async (requestId) => {
// //     try {
// //       await axios.post("/api/staff/acknowledge-item", { requestId });
// //       alert("Acknowledged successfully");
// //       fetchGivenItems(); // Refresh the list
// //     } catch (err) {
// //       console.error(err);
// //       alert("Failed to acknowledge");
// //     }
// //   };

// //   if (loading) return <p className="p-6">Loading items...</p>;
// //   if (error) return <p className="p-6 text-red-600">{error}</p>;

// //   return (
// //     <div className="p-6">
// //       <h2 className="text-2xl font-bold mb-4">Items to Acknowledge</h2>
// //       {givenItems.length === 0 ? (
// //         <p>No items to acknowledge.</p>
// //       ) : (
// //         givenItems.map((item) => (
// //           <Card key={item.id} className="mb-4">
// //             <CardHeader>
// //               <CardTitle>
// //                 {item.item_type} x {item.quantity}
// //               </CardTitle>
// //             </CardHeader>
// //             <CardContent>
// //               <p>Given On: {new Date(item.given_date).toLocaleString()}</p>
// //               <Button
// //                 onClick={() => handleAcknowledge(item.id)}
// //                 className="mt-2"
// //               >
// //                 Acknowledge Receipt
// //               </Button>
// //             </CardContent>
// //           </Card>
// //         ))
// //       )}
// //     </div>
// //   );
// // };

// // export default StaffAcknowledgeItem;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// const StaffAcknowledgeItem = () => {
//   const [givenItems, setGivenItems] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Fetch items with status 'given'
//   const fetchGivenItems = async () => {
//     try {
//       const res = await axios.get("/api/staff/given-items");
//       const items = Array.isArray(res.data) ? res.data : [];
//       setGivenItems(items);
//       setLoading(false);
//     } catch (err) {
//       console.error("Failed to load given items:", err);
//       setError("Failed to load items");
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchGivenItems();
//   }, []);

//   const handleAcknowledge = async (requestId) => {
//     try {
//       await axios.post("/api/staff/acknowledge-item", { requestId });
//       alert("Acknowledged successfully");
//       fetchGivenItems(); // Refresh the list
//     } catch (err) {
//       console.error(err);
//       alert("Failed to acknowledge");
//     }
//   };

//   if (loading) return <p className="p-6">Loading items...</p>;
//   if (error) return <p className="p-6 text-red-600">{error}</p>;

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-4">Items to Acknowledge</h2>
//       {givenItems.length === 0 ? (
//         <p>No items to acknowledge.</p>
//       ) : (
//         givenItems.map((item) => (
//           <Card key={item.id} className="mb-4">
//             <CardHeader>
//               <CardTitle>
//                 {item.item_type} x {item.quantity}
//               </CardTitle>
//             </CardHeader>
//             <CardContent>
//               <p>Given On: {new Date(item.given_date).toLocaleString()}</p>
//               <Button
//                 onClick={() => handleAcknowledge(item.id)}
//                 className="mt-2"
//               >
//                 Acknowledge Receipt
//               </Button>
//             </CardContent>
//           </Card>
//         ))
//       )}
//     </div>
//   );
// };

// export default StaffAcknowledgeItem;
