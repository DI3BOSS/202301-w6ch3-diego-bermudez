import chalk from "chalk";
import inquirer from "inquirer";
import { createSpinner } from "nanospinner";

const delayBetweenQuestions = 1650;
let userName: string;

const askForUserName = async () => {
  const answers = await inquirer.prompt({
    name: "userName",
    type: "input",
    message: "Cual es tu nombre?",
    default() {
      return "Bootcamper";
    },
  });

  userName = answers.userName;
};

const delay = (time: number) =>
  new Promise((setTime) => setTimeout(setTime, time));

const gameStart = async () => {
  const gameTitle = chalk.green(`
  
  ¿ERES UN EXPERTO BOOTCAMPER?`);

  await delay(delayBetweenQuestions);
  console.log(gameTitle);

  console.log(`
    ${chalk.bold(`TRES MAGISTRAL QUOTES...
    `)} 
    Si aciertas las tres ${chalk.bgGreen(" TOT PERFE ")}
    Si fallas una ${chalk.bgRed(" Challengecito ")} y para casa...
  `);
};

const firstQuoteQuestion = async () => {
  const answers = await inquirer.prompt({
    name: "firstQuote",
    type: "list",
    message: "To'guapo, lo coches...",
    choices: ["...cagando", "...volando", "...aparcando"],
  });

  return answerChecker(answers.firstQuote === "...volando");
};

const secondQuoteQuestion = async () => {
  const answers = await inquirer.prompt({
    name: "secondQuote",
    type: "list",
    message: "Esto está...",
    choices: [
      "...perfectamente testeado",
      "...perfectamente alineado",
      "...perfectamente implementado",
    ],
  });

  return answerChecker(answers.secondQuote === "...perfectamente alineado");
};

const thirdQuoteQuestion = async () => {
  const answers = await inquirer.prompt({
    name: "thirdQuote",
    type: "list",
    message: "¿Por qué no tienes...",
    choices: [
      "...las bragas bien puestas?",
      "...las devtools abiertas?",
      "...las neuronas despiertas?",
    ],
  });

  return answerChecker(answers.thirdQuote === "...las devtools abiertas?");
};

const winnerChecker = async () => {
  console.clear();

  console.log(
    chalk.bgGreen(
      ` ¡Felicidades, ${chalk.bold(
        "userName"
      )}! Has vivido a tope la mitad del Bootcamp! `
    )
  );
  process.exit(0);
};

const answerChecker = async (isRightAnswered: boolean) => {
  const loader = createSpinner("mmm...").start();
  await delay(delayBetweenQuestions);

  if (isRightAnswered) {
    loader.success({ text: `${userName}, vale, bien` });
  } else {
    loader.error({ text: `¡no OC, challengcito y pa' casa, ${userName}!` });
    process.exit(1);
  }
};

console.clear();
await gameStart();
await askForUserName();
await firstQuoteQuestion();
await secondQuoteQuestion();
await thirdQuoteQuestion();
winnerChecker();
