import { SyliusSourcePluginPagePath } from '../../schemas/Plugin/Options';

export function getPathPattern(
  path: SyliusSourcePluginPagePath | undefined,
  locale: string,
  defaultPattern: string,
): string {
  if (!path) {
    return defaultPattern;
  }

  if (typeof path === 'string') {
    return path;
  }

  return path[locale] || defaultPattern;
}
