import { input, select } from '@inquirer/prompts';
import fs from 'fs';
import path from 'path';
import pc from 'picocolors';
import {
  Node,
  ParameterDeclaration,
  Project,
  PropertyAssignment,
  PropertySignature,
  ShorthandPropertyAssignment,
  SourceFile,
  SyntaxKind,
  VariableDeclaration,
} from 'ts-morph';
import { findRoot } from './findRoot';

function toCamelCase(str: string) {
  return str.replace(/_([a-z])/g, (g) => g[1].toUpperCase());
}

function getNodeLineNumber(node: Node, sourceFile: SourceFile): number {
  const { line } = sourceFile.getLineAndColumnAtPos(node.getStart());
  return line;
}

function renameDeclaration(filePath: string) {
  return (
    declaration:
      | ShorthandPropertyAssignment
      | VariableDeclaration
      | PropertyAssignment
      | ParameterDeclaration
      | PropertySignature
  ) => {
    const oldName = declaration.getName();
    if (oldName.includes('_')) {
      const newName = toCamelCase(oldName);
      const references = declaration.findReferences();

      references.forEach((refEntry) => {
        refEntry.getReferences().forEach((ref) => {
          const refNode = ref.getNode();
          const sourceFile = ref.getSourceFile();

          if (
            Node.isIdentifier(refNode) &&
            sourceFile.getFilePath() !== filePath
          ) {
            refNode.replaceWithText(newName);
            console.log(
              pc.yellow(
                `Updated References: ${sourceFile.getFilePath()}:${getNodeLineNumber(ref.getNode(), sourceFile)}`
              )
            );
          }
        });
      });

      declaration.rename(newName);
    }
  };
}

function convertSourceFile(sourceFile: SourceFile): void {
  const rename = renameDeclaration(sourceFile.getFilePath());
  // 객체 리터럴의 속성 이름 변경
  sourceFile
    .getDescendantsOfKind(SyntaxKind.ShorthandPropertyAssignment)
    .forEach(rename);

  // 모든 변수 선언을 찾아 이름을 변경
  sourceFile.forEachDescendant((node) => {
    if (Node.isVariableDeclaration(node)) {
      rename(node);
    }
  });

  // 함수 매개변수 이름 변경
  sourceFile.getFunctions().forEach((func) => {
    func.getParameters().forEach(rename);
  });

  // 리액트 컴포넌트의 props 타입 선언 변경
  sourceFile.getInterfaces().forEach((interfaceDeclaration) => {
    interfaceDeclaration.getProperties().forEach(rename);
  });

  // 프로퍼티 이름 변경 (객체 리터럴 내부)
  sourceFile
    .getDescendantsOfKind(SyntaxKind.PropertyAssignment)
    .forEach((prop) => {
      if (Node.isIdentifier(prop.getNameNode())) {
        rename(prop);
      }
    });

  console.log(pc.green(`Updated ${sourceFile.getFilePath()}`));
}

function convertFile(filePath: string): void {
  const rootDir = findRoot(__dirname);
  const absoluteFilePath = path.resolve(rootDir, filePath);
  if (!fs.existsSync(absoluteFilePath)) {
    console.error(pc.red(`File not found: ${absoluteFilePath}`));
    return;
  }

  const project = new Project({
    tsConfigFilePath: path.resolve(rootDir, 'tsconfig.app.json'),
  });
  const sourceFile = project.addSourceFileAtPath(absoluteFilePath);
  convertSourceFile(sourceFile);
  project.saveSync();
}

function convertDirectory(directoryPath: string): void {
  const rootDir = findRoot(__dirname);
  const absoluteDirectoryPath = path.resolve(rootDir, directoryPath);
  if (!fs.existsSync(absoluteDirectoryPath)) {
    console.error(pc.red(`Directory not found: ${absoluteDirectoryPath}`));
    return;
  }

  const project = new Project({
    tsConfigFilePath: path.resolve(rootDir, 'tsconfig.app.json'),
  });
  const sourceFiles = project.addSourceFilesAtPaths(
    path.join(absoluteDirectoryPath, '**/*.{ts,tsx}')
  );

  if (sourceFiles.length === 0) {
    console.warn(`No TypeScript files found in ${absoluteDirectoryPath}`);
    return;
  }
  sourceFiles.forEach(convertSourceFile);
  project.saveSync();
}

async function main() {
  const functionType = await select({
    message: '함수를 선택하세요',
    choices: [
      {
        name: 'file',
        value: 'file',
        description: 'Modify a single file',
      },
      {
        name: 'directory',
        value: 'directory',
        description: 'Modify a directory',
      },
    ],
  });
  const message =
    functionType == 'file'
      ? 'Enter the path of the file to modify (e.g., path/to/file.ts)'
      : 'Enter the directory to modify (e.g., path/to/directory)';
  const targetPath = await input({ message, required: true });

  switch (functionType) {
    case 'file':
      convertFile(targetPath);
      break;
    case 'directory':
      convertDirectory(targetPath);
      break;
    default:
      process.exit(1);
  }
}

main();
