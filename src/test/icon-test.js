const {writeFileSync} = require('fs');
const {
  getIconForExtension,
  ICON_SIZE_MEDIUM 
} = require('system-icon');
 
getIconForExtension(".ext", ICON_SIZE_MEDIUM, (err, result) => {
  if (err) {
    console.error(err);
  } else {
    writeFileSync("icon.png", result);
  }
});