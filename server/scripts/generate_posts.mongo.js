/* eslint-disable */
// const express = require('express');

// const app = express();

const db = require('../app/models');

db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('connected to the database!');
  })
  .catch((err) => {
    console.log('cannot connect to the database!', err);
    process.exit();
  });

  const Issue = db.issues;

// TODO not working :(
function generateData() {
  
    const owners = ["Ravan", "Eddie", "Pieta", "Parvati", "Victor"];
    const statuses = ["New", "Assigned", "Fixed", "Closed"];
    let initialCount;
     Issue.countDocuments()
     .then((result) => {
       console.log(result);
       initialCount = result;
       for (let i = 0; i < 100; i += 1) {
        const randomCreatedDate =
          new Date() - Math.floor(Math.random() * 60) * 1000 * 60 * 60 * 24;
        const created = new Date(randomCreatedDate);
        const randomDueDate =
          new Date() - Math.floor(Math.random() * 60) * 1000 * 60 * 60 * 24;
        const due = new Date(randomDueDate);
        const owner = owners[Math.floor(Math.random() * 5)];
        const status = statuses[Math.floor(Math.random() * 4)];
        const effort = Math.ceil(Math.random() * 20);
        const title = `Lorem ipsum dolor sit amet, ${i}`;
        const id = initialCount + i + 1;
        console.log("type id ", typeof id, " ", initialCount);
        const issue =  new Issue ({
          id,
          title,
          created,
          due,
          owner,
          status,
          effort,
        });
        issue.save(issue);
      }
     })
     .catch((err) => {
       console.log(error);
     });
    console.log(initialCount)

  
  //const count = db.issues.count();
  //db.counters.update({ _id: "issues" }, { $set: { current: count } });
  //console.log("New issue count:", count);
  };


generateData();




