import { Reporter } from 'gatsby';
import { SyliusSourcePluginOptions } from '../schemas/Plugin';

export type ReportType =
  | 'panic'
  | 'error'
  | 'success'
  | 'info'
  | 'warn'
  | 'log';

export function reportDebug(
  reporter: Reporter,
  options: SyliusSourcePluginOptions,
  message: string,
  type: ReportType = 'info',
): void {
  if (!options.debug) {
    return;
  }

  report(reporter, message, type);
}

export function report(
  reporter: Reporter,
  message: string,
  type: ReportType = 'info',
): void {
  reporter[type](`[sylius-rest] ${message}`);
}
