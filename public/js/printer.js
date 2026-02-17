let printedSheets = ["home"];

// open new receipt on link click
function printSheet(sheetName) {
  const sheet = document.getElementById(sheetName);
  if (sheet.matches(`#${sheetName}.printed`)) {
    return;
  } else {
    const lastPrintedSheet = document.getElementById(
      printedSheets[printedSheets.length - 1],
    );
    lastPrintedSheet.after(sheet);
    sheet.className = "printed";
    console.log("printed");
  }
}
