import { Injectable, ConsoleLogger } from '@nestjs/common';
import chalk from 'chalk';

@Injectable()
export class ColorfulLogger extends ConsoleLogger {
  log(message: string) {
    super.log(chalk.greenBright(message)); // normal logs in green
  }

  error(message: string, trace?: string) {
    super.error(chalk.red.bold(message), trace);
  }

  warn(message: string) {
    super.warn(chalk.yellow(message));
  }

  debug(message: string) {
    super.debug(chalk.blueBright(message));
  }

  verbose(message: string) {
    super.verbose(chalk.magenta(message));
  }
}
