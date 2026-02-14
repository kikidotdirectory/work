let printedSheets = ["home"]

// open new receipt on link click
async function printSheet(sheetName) {
  try {
    const response = await fetch(`sheets/${sheetName}/index.html`);
    const sheetContent = await response.text();

    const printer = document.getElementById("printer");
    const sheet = document.createElement("article");
    sheet.innerHTML = sheetContent;
    sheet.id = sheetName;

    printer.append(sheet);
  } catch (error) {
    console.error(`Error printing ${sheetName}:`, error);
  }
}
