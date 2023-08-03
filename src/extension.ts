import * as vscode from 'vscode';
import { reservedKeywords } from './reservedKeywords'; // ここで予約語リストをインポート

export function activate(context: vscode.ExtensionContext) {
	let convertToUppercase = vscode.commands.registerCommand('sql-letters-conversion.convertToUppercase', () => {
		// Convert to uppercase logic
		const editor = vscode.window.activeTextEditor;
		if (editor) {
			const document = editor.document;
			const text = document.getText();
			// 予約語リストを使用して正規表現を生成
			const regex = new RegExp(`\\b(?:${reservedKeywords.join('|')})\\b`, 'gi');

			const transformedText = text.replace(regex, (match) => match.toUpperCase()); // 予約語を大文字に置換
			editor.edit((editBuilder) => {
				editBuilder.replace(new vscode.Range(document.positionAt(0), document.positionAt(text.length)), transformedText);
			});
		}
	});

	let convertToLowercase = vscode.commands.registerCommand('sql-letters-conversion.convertToLowercase', () => {
		// Convert to lowercase logic
		const editor = vscode.window.activeTextEditor;
		if (editor) {
			const document = editor.document;
			const text = document.getText();
			// 予約語リストを使用して正規表現を生成
			const regex = new RegExp(`\\b(?:${reservedKeywords.join('|')})\\b`, 'gi');

			const transformedText = text.replace(regex, (match) => match.toLowerCase()); // 予約語を小文字に置換
			editor.edit((editBuilder) => {
				editBuilder.replace(new vscode.Range(document.positionAt(0), document.positionAt(text.length)), transformedText);
			});
		}
	});

	context.subscriptions.push(convertToUppercase);
	context.subscriptions.push(convertToLowercase);
}
// This method is called when your extension is deactivated
export function deactivate() {}