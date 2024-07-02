const chalk = import('chalk');
const colors = ['red', 'yellow', 'blue', 'magenta', 'cyan'];
const bro = (data, option) => {
  switch (option) {
    case "warn":
      console.log(chalk.yellow('[ ❕ ] » ') + data);
      break;
    case "error":
      console.log(chalk.red('[ ❕ ] » ') + data);
      break;
    default:
      console.log(chalk[colors[Math.floor(Math.random() * colors.length)]](`${option} » `) + chalk[colors[Math.floor(Math.random() * colors.length)]](data));
      break;
  }
}

bro.loader = (data, option) => {
  switch (option) {
    case "warn":
      console.log(chalk.blue('[ SHELLY GLOBL ] » ') + chalk.blue(data));
      break;
    case "error":
      console.log(chalk.red('[ ERORR ] » ') + chalk.red(data));
      break;
    default:
      console.log(chalk.blue(`[ SHELLY SYSTM ] » `) + chalk.blue(data));
      break;
  }
}

export default bro;