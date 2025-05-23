// (() => {
//   const canvas = document.getElementById("fcfsCanvas");
//   const ctx = canvas.getContext("2d");
//   canvas.width = 900;
//   canvas.height = 500;

//   let students = [];
//   let queue = [];
//   let gateOpen = true;
//   let simulationRunning = false;
//   let currentMovingStudent = null;

//   // Queue and gate positions
//   const queueStartX = 400; // Starting X position of the queue
//   const queueStartY = 230; // Y position of the queue
//   const queueSpacing = 30;  // Space between students in the queue
//   const gateX = 820; // X position of the gate center
//   const gateY = 230; // Y position of the gate center

//   // Initial random placement of students
//   function initStudents() {
//     students = [];
//     for (let i = 0; i < 10; i++) {
//       students.push({
//         x: Math.random() * 300 + 50,
//         y: Math.random() * 400 + 50,
//         inQueue: false,
//         targetX: null,
//         targetY: null,
//       });
//     }
//     queue = [];
//     currentMovingStudent = null;
//   }

//   function draw() {
//     ctx.clearRect(0, 0, canvas.width, canvas.height);

//     // Draw gate base
//     ctx.fillStyle = "#222";
//     ctx.fillRect(400, 190, 40, gateOpen ? 10 : 80); // gate opens/closes vertically

//     // Draw queue path 1
//     ctx.strokeStyle = "#444";
//     ctx.lineWidth = 3;
//     ctx.beginPath();
//     ctx.moveTo(400, 270);
//     ctx.lineTo(1000, 270);
//     ctx.stroke();

//      // Draw queue path 2
//     ctx.strokeStyle = "#444";
//     ctx.lineWidth = 3;
//     ctx.beginPath();
//     ctx.moveTo(400, 200);
//     ctx.lineTo(1000, 200);
//     ctx.stroke();

//      // Draw queue path 3 bottom
//     ctx.strokeStyle = "#444";
//     ctx.lineWidth = 3;
//     ctx.beginPath();
//     ctx.moveTo(400, 270);
//     ctx.lineTo(700, 50500);
//     ctx.stroke(); 
    
//     // Draw queue path 4 top
//     ctx.strokeStyle = "#444";
//     ctx.lineWidth = 3;
//     ctx.beginPath();
//     ctx.moveTo(400, 200);
//     ctx.lineTo(700, -50500);
//     ctx.stroke();

//     // Draw guard room
//     ctx.strokeStyle = "#555";
//     ctx.lineWidth = 2;
//     ctx.strokeRect(350, 270, 50, 60);

//     // Draw guard (circle)
//     ctx.fillStyle = "#555";
//     ctx.beginPath();
//     ctx.arc(375, 300, 10, 0, Math.PI * 2);
//     ctx.fill();

//     // Draw students
//     for (const student of students) {
//       ctx.beginPath();
//       ctx.fillStyle = "#007bff";
//       ctx.shadowColor = "rgba(0,123,255,0.3)";
//       ctx.shadowBlur = 10;
//       ctx.arc(student.x, student.y, 12, 0, Math.PI * 2);
//       ctx.fill();
//       ctx.shadowBlur = 0;
//       ctx.strokeStyle = "#004085";
//       ctx.lineWidth = 2;
//       ctx.stroke();
//     }
//   }

//   // Move a single student towards a target position smoothly
//   function moveStudentTowards(student, targetX, targetY, speed = 0.07) {
//     const dx = targetX - student.x;
//     const dy = targetY - student.y;
//     const distance = Math.sqrt(dx * dx + dy * dy);
//     if (distance < 1) { //NPC movement
//       student.x = targetX;
//       student.y = targetY;
//       return true; // arrived
//     } else {
//       student.x += dx * speed;
//       student.y += dy * speed;
//       return false; // moving
//     }
//   }

//   function updateStudentMovement() {
//     // First move students into their queue positions
//     let anyoneStillQueueing = false;
//     for (const student of students) {
//       if (student.inQueue) {
//         const arrived = moveStudentTowards(student, student.targetX, student.targetY);
//         if (arrived) {
//           student.inQueue = false;
//           // Add to queue once arrived at line
//           queue.push(student);
//         } else {
//           anyoneStillQueueing = true;
//         }
//       }
//     }

//     // If no one still moving to queue and no student moving to gate, start processing queue
//     if (!anyoneStillQueueing && currentMovingStudent === null && gateOpen && simulationRunning) {
//       processNextStudentToGate();
//     }

//     // Move the current student toward the gate if any
//     if (currentMovingStudent) {
//       const arrivedGate = moveStudentTowards(currentMovingStudent, gateX, gateY);
//       if (arrivedGate) {
//         // Remove from students list (student has passed gate)
//         students = students.filter(s => s !== currentMovingStudent);
//         currentMovingStudent = null;

//         // Automatically move next in queue if gate open and more students remain
//         if (gateOpen && queue.length > 0) {
//           processNextStudentToGate();
//         }
//         // If no more students, end simulation
//         if (students.length === 0) {
//           simulationRunning = false;
//           alert("All students have passed the gate!");
//           document.getElementById("startBtn").disabled = false;
//         }
//       }
//     }
//   }

//   function processNextStudentToGate() {
//     if (queue.length > 0) {
//       currentMovingStudent = queue.shift();
//     }
//   }

//   function startSimulation() {
//     if (!simulationRunning) {
//       simulationRunning = true;
//       // Reset queue and assign queue targets
//       queue = [];
//       currentMovingStudent = null;

//       students.forEach((student, index) => {
//         student.targetX = queueStartX + index * queueSpacing;
//         student.targetY = queueStartY;
//         student.inQueue = true;
//       });

//       document.getElementById("startBtn").disabled = false;
//     }
//   }

//   function toggleGate() {
//     gateOpen = !gateOpen;
//     const gateBtn = document.getElementById("gateBtn");
//     gateBtn.textContent = gateOpen ? "Close Gate" : "Open Gate";

//     // If gate opens and simulation running, process queue
//     if (gateOpen && simulationRunning && currentMovingStudent === null && queue.length > 0) {
//       processNextStudentToGate();
//     }
//   }

//   function animate() {
//     draw();
//     if (simulationRunning) {
//       updateStudentMovement();
//     }
//     requestAnimationFrame(animate);
//   }

//   // Initialization
//   initStudents();
//   animate();

//   // Setup buttons
//   document.getElementById("startBtn").addEventListener("click", startSimulation);
//   document.getElementById("gateBtn").addEventListener("click", toggleGate);
// }
// );