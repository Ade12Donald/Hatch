async function NameToID(names, Model, fieldName) {
  const docs = await Model.find({
    [fieldName]: { $in: names },
  }).select(`_id ${fieldName}`);

  const found = new Set(docs.map((doc) => doc[fieldName]));

  const missing = names.filter((name) => !found.has(name));

  if (missing.length > 0) {
    const err = new Error(`${fieldName} not found`);
    err.notFound = missing;
    throw err;
  }

  return names.map((name) => docs.find((doc) => doc[fieldName] === name)._id);
}
export default NameToID;
