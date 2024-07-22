import path from 'path';
import fs from 'fs';

export function findRoot(startDir: string): string {
  let currentDir = startDir;

  while (currentDir !== path.parse(currentDir).root) {
    if (
      fs.existsSync(path.join(currentDir, 'pnpm-workspace.yaml')) ||
      (fs.existsSync(path.join(currentDir, 'package.json')) &&
        JSON.parse(
          fs.readFileSync(path.join(currentDir, 'package.json'), 'utf8')
        ).workspaces)
    ) {
      return currentDir;
    }
    currentDir = path.dirname(currentDir);
  }

  throw new Error('root not found');
}
