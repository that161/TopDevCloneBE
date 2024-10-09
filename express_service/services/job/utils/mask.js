const bs58 = require("bs58");

function maskId(id, dbType) {
  const combinedString = `${id}:${dbType}`;
  const buffer = Buffer.from(combinedString, "utf8");
  const masked_id = bs58.encode(buffer);
  return masked_id;
}

function unmaskId(encoded, dbType) {
  const decoded = bs58.decode(encoded);

  const combinedString = String.fromCharCode(...decoded);
  const [idString, dbTypeString] = combinedString.split(":");
  const original_id = parseInt(idString, 10);

  if (dbType !== dbTypeString) {
    throw new Error("Invalid database type!");
  }
  return original_id;
}

module.exports = { maskId, unmaskId };
