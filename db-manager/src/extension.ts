import * as vscode from 'vscode';
import { ResultPanel } from './ResultPanel';

export function activate(context: vscode.ExtensionContext) {

	console.log('Congratulations, your extension "db-manager" is now active!');

	let disposable = vscode.commands.registerCommand('db-manager.helloWorld', () => {
		ResultPanel.createOrShow(context.extensionUri);
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() { }
