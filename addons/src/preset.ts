function managerEntries(entry = []) {
  return [...entry, require.resolve("./register")]; //👈 Addon implementation
}

function config(entry = []) {
  return [...entry, require.resolve("./preview")];
}

module.exports = { managerEntries, config };
