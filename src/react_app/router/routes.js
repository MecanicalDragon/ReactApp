// Get public path
const publicPath = process.env.ASSET_PATH;

// Pages
export const index = () => `${publicPath}`;
export const pageOne = () => `${publicPath}page1`;
export const pageTwo = () => `${publicPath}page2`;
export const pageThree = () => `${publicPath}page3`;
export const login = () => `${publicPath}login`;
export const denied = () => `${publicPath}denied`;
export const dnd = () => `${publicPath}dnd`;