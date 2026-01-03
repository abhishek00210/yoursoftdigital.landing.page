// // components/Preloader.jsx
// import React, { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import logo from "../Images/Logo/logo.png";

// const Preloader = ({ children }) => {
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // Simulate loading time or wait for resources
//     const timer = setTimeout(() => {
//       setLoading(false);
//     }, 2000); // 2 seconds

//     return () => clearTimeout(timer);
//   }, []);

//   return (
//     <>
//       <AnimatePresence mode="wait">
//         {loading && (
//           <motion.div
//             key="preloader"
//             initial={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             transition={{ duration: 0.5 }}
//             className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#0D2342]"
//           >
//             <div className="text-center">
//               {/* Animated Logo */}
//               <motion.img
//                 src={logo}
//                 alt="Loading..."
//                 className="h-20 w-auto mb-8"
//                 initial={{ opacity: 0, scale: 0.8 }}
//                 animate={{ 
//                   opacity: 1, 
//                   scale: [0.8, 1.1, 1],
//                 }}
//                 transition={{ duration: 0.8 }}
//               />
              
//               {/* Loading Bar */}
//               <div className="w-48 h-1 bg-white/20 rounded-full overflow-hidden">
//                 <motion.div
//                   className="h-full bg-[#17C3B2] rounded-full"
//                   initial={{ width: 0 }}
//                   animate={{ width: "100%" }}
//                   transition={{ duration: 1.8, ease: "easeInOut" }}
//                 />
//               </div>
              
//               {/* Loading Text */}
//               <motion.p
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ delay: 0.5 }}
//                 className="text-white/60 text-sm mt-4"
//               >
//                 Loading...
//               </motion.p>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
      
//       {/* Main Content */}
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: loading ? 0 : 1 }}
//         transition={{ duration: 0.5 }}
//       >
//         {children}
//       </motion.div>
//     </>
//   );
// };

// export default Preloader;