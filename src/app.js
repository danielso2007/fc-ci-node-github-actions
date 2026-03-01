function printMessage(message) {
  if (!message) {
    throw new Error("Message is required");
  }
  return `Message received: ${message}`;
}

if (require.main === module) {
  const input = process.argv[2];
  try {
    const result = printMessage(input);
    console.log(result);
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
}

module.exports = { printMessage };