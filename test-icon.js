const {writeFileSync} = require('fs');
const {
  getIconForPath,
  ICON_SIZE_MEDIUM
} = require('system-icon');

getIconForPath("/path/to/file_or_folder", ICON_SIZE_MEDIUM, (err, result) => {
  if (err) {
    console.error(err);
  } else {
    writeFileSync("icon.png", result);
  }
});

getIconForPath("D:/Simey/St Cyprian's Online Music Concert-8kOlOcoFGYA.mkv")