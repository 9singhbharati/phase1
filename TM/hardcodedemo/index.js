// const tasks = [
//     {
//         id:1,
//         name: "task1",
//         start:Date('2000-01-15'),
//         end:Date('2000-2-16'),
//         subtask:[
//             {
//                 id:1,
//                 name: "subtask task1",
//                 start:Date('2000-01-15'),
//                 end:Date('2000-2-16'),
//             }
//         ]
//     },
//
//     {
//         id:2,
//         name: "task2",
//         start:Date('2000-10-15'),
//         end:Date('2000-12-16'),
//         subtask:[
//             {
//                 id:2,
//                 name: "subtask task2",
//                 start:Date('2000-01-15'),
//                 end:Date('2000-2-16'),
//             }
//         ]
//     }
//
//
// ]
//
// // Accessing Alice's scores
// const aliceScores = tasks.find(obj => obj.subtask);
//
// console.log(aliceScores); // Output: [92, 88, 95]
//
// // Find the object representing Alice
// const aliceObject = tasks.find(obj => obj.id === 1);
//
// // Check if Alice exists in the array
// if (aliceObject) {
//     // Push the new score (96) to Alice's scores array
//     aliceObject.subtask.push({
//         id:2,
//         name: "subtask task2",
//         start:Date('2000-01-15'),
//         end:Date('2000-2-16'),
//     });
// } else {
//     console.log('id  not found in the array.');
// }
//
// console.log(tasks);
//
// // Define the filtering condition in a callback function
// //const filteredArray = tasks.filter(obj => obj.id == 1);
//
// console.log("filtered task")
// //console.log(filteredArray);
//
//
// const f = tasks.filter(obj =>
//     obj.id == (1)||
//     obj.name == ("task1") ||
//     obj.start == ('2000-01-15') || // Convert Date to yyyy-mm-dd format
//     obj.end == ('2000-2-16')   // Convert Date to yyyy-mm-dd format
// );
//
// console.log(f);


