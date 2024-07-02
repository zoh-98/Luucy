const { colors } = import('../func/colors.js');
const clearScreenDown = (color, message) => {
    console.log(colors.hex(color, message))
 };
 export default clearScreenDown;