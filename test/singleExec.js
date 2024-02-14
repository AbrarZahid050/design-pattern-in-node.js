const function1 = (arg, callback) => {
  callback(arg);
};

// operations defined elsewhere and ready to execute
const operations = [
  { func: function1, args: "args1" },
  { func: function1, args: "args2" },
  { func: function1, args: "args3" },
];

function executeFunctionWithArgs(operation, callback) {
  // executes function
  const { args, func } = operation;
  func(args, callback);
}

function serialProcedure(operation) {
  if (!operation) process.exit(0); // finished
  executeFunctionWithArgs(operation, function (result) {
    console.log("-> [executeFunctionWithArgs] ", result);
    // continue AFTER callback
    serialProcedure(operations.shift());
  });
}

serialProcedure(operations.shift());
