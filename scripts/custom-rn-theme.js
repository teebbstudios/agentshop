const path = require('path');
const fs = require('fs');
const defaultVars = require('antd-mobile-rn/lib/style/themes/default.native');
const customVars = require('../src/config/theme');
const themePath = path.resolve(require.resolve('antd-mobile-rn'), '../style/themes/default.native.js');
const themeVars = Object.assign({}, defaultVars, customVars);

if (fs.statSync(themePath).isFile()) {
    fs.writeFileSync(
        themePath,
        `var brandPrimary = "${customVars.brand_primary}"; var brandPrimaryTap = "${customVars.brand_primary_tap}";module.exports = ${JSON.stringify(themeVars)}`
    );
}
