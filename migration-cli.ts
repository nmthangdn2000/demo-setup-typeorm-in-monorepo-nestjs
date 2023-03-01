import { spawn } from 'child_process';
import { Command } from 'commander';
import { readdirSync } from 'fs';
import * as inquirer from 'inquirer';

const program = new Command();

const promptFunc = async (action: ACTION) => {
  const dirs = readdirSync('apps', { withFileTypes: true })
    .filter((dir) => dir.isDirectory())
    .map((dir) => dir.name);

  const prompt = inquirer.createPromptModule();

  return prompt([
    /* Pass your questions in here */
    {
      type: 'list',
      name: 'project',
      message: 'Which project would you like to migrate?',
      choices: dirs,
    },
  ])
    .then((answers) => {
      // Use user feedback for... whatever!!
      console.log(answers);
      if (action == ACTION.GENERATE) {
        // Generate migration
        return spawn(
          'npm',
          [
            'run',
            'typeorm',
            'migration:generate',
            '--',
            `apps/${answers.project}/src/database/migrations/migration`,
            '-d',
            `apps/${answers.project}/src/database/ormconfig.ts`,
          ],
          { stdio: 'inherit' },
        );
      }

      if (action == ACTION.RUN) {
        // Run migration
        return spawn(
          'npm',
          [
            'run',
            'typeorm',
            'migration:run',
            '--',
            '-d',
            `apps/${answers.project}/src/database/ormconfig.ts`,
          ],
          { stdio: 'inherit' },
        );
      }

      if (action == ACTION.REVERT) {
        // Revert migration
        return spawn(
          'npm',
          [
            'run',
            'typeorm',
            'migration:revert',
            '--',
            '-d',
            `apps/${answers.project}/src/database/ormconfig.ts`,
          ],
          { stdio: 'inherit' },
        );
      }
    })
    .catch((error) => {
      if (error.isTtyError) {
        // Prompt couldn't be rendered in the current environment
      } else {
        // Something else went wrong
      }
    });
};

enum ACTION {
  GENERATE = 'generate',
  RUN = 'run',
  REVERT = 'revert',
}

program
  .command('migration')
  .description('CLI for migrations')
  .argument('<action>', 'migration action: generate, run, revert')
  .action((action) => {
    if (
      action !== ACTION.GENERATE &&
      action !== ACTION.RUN &&
      action !== ACTION.REVERT
    ) {
      console.log('Invalid action');
      return;
    }

    promptFunc(action);
  });

program.parse(process.argv);
