'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as resolver from './resolver';
import * as fs from 'fs';
import * as path from 'path';
import * as mkdirp from 'mkdirp';

const openFile = (fileName: string) => {
  vscode.workspace
    .openTextDocument(fileName)
    .then(vscode.window.showTextDocument);
};

const prompt = (fileName: string, cb: any) => {
  let options = {
    placeHolder: `Create ${fileName}?`,
  };
  vscode.window.showQuickPick(['Yes', 'No'], options).then(function (answer) {
    if (answer === 'Yes') {
      cb();
    }
  });
};

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export const activate = (context: vscode.ExtensionContext) => {
  // The command has been defined in the package.json file
  // Now provide the implementation of the command with  registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand(
    'extension.hanamiGoToSpec',
    () => {
      // The code you place here will be executed every time your command is executed

      // Display a message box to the user
      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        return; // No open text editor
      }

      const document = editor.document;
      const fileName: string = document.fileName;
      const related: string = resolver.getRelated(fileName);
      const relative: string = vscode.workspace.asRelativePath(related);
      const fileExists: boolean = fs.existsSync(related);
      const dirname: string = path.dirname(related);

      //console.log('fileExists', fileExists);

      if (fileExists) {
        openFile(related);
      } else {
        prompt(relative, function () {
          mkdirp.sync(dirname);
          fs.closeSync(fs.openSync(related, 'w'));
          openFile(related);
        });
      }
    },
  );

  context.subscriptions.push(disposable);
};

// this method is called when your extension is deactivated
export const deactivate = () => {};
