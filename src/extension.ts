import * as vscode from 'vscode'

type MessageType =
  | { type: 'updateSettings'; payload: any }
  | { type: 'refreshStats'; payload?: undefined }
  | { type: 'error'; payload: string }
  | { type: 'success'; payload: string };

export async function activate(context: vscode.ExtensionContext) {
  console.log('Debug: Extension activating');

  try {
    const { NextWebviewPanel } = await import('./NextWebview')
    console.log('Debug: Successfully imported NextWebviewPanel');

    // Register webview commands
    context.subscriptions.push(
      vscode.commands.registerCommand('NextWebview1.start', async () => {
        console.log('Debug: Starting View1');
        try {
          NextWebviewPanel.getInstance({
            extensionUri: context.extensionUri,
            route: 'view1',
            title: 'Extension Settings',
            viewId: 'ghnextA',
            handleMessage: (message: MessageType) => {
              console.log('Debug: Received message in View1:', message);
              switch (message.type) {
                case 'updateSettings':
                  const config = vscode.workspace.getConfiguration('vscodeReactWebviews')
                  Object.entries(message.payload).forEach(([key, value]) => {
                    config.update(key, value, vscode.ConfigurationTarget.Global)
                  })
                  vscode.window.showInformationMessage('Settings updated successfully')
                  break

                case 'error':
                  vscode.window.showErrorMessage(message.payload)
                  break

                case 'success':
                  vscode.window.showInformationMessage(message.payload)
                  break
              }
            }
          })
        } catch (error) {
          console.error('Debug: Error starting View1:', error);
          vscode.window.showErrorMessage(`Failed to start View1: ${error}`);
        }
      }),
      vscode.commands.registerCommand('NextWebview2.start', async () => {
        console.log('Debug: Starting View2');
        try {
          NextWebviewPanel.getInstance({
            extensionUri: context.extensionUri,
            route: 'view2',
            title: 'Project Statistics',
            viewId: 'ghnextB',
            handleMessage: (message: MessageType) => {
              console.log('Debug: Received message in View2:', message);
              switch (message.type) {
                case 'refreshStats':
                  const workspaceFolders = vscode.workspace.workspaceFolders
                  if (workspaceFolders) {
                    const stats = {
                      totalFiles: 156,
                      fileTypes: {
                        typescript: 45,
                        javascript: 32,
                        json: 12,
                        markdown: 8,
                        other: 59,
                      },
                      linesOfCode: 12453,
                      recentCommits: [
                        { id: 1, message: 'Update dependencies', time: '2 hours ago' },
                        { id: 2, message: 'Fix navigation bug', time: '5 hours ago' },
                        { id: 3, message: 'Add new feature', time: '1 day ago' },
                      ]
                    }
                  }
                  break

                case 'error':
                  vscode.window.showErrorMessage(message.payload)
                  break

                case 'success':
                  vscode.window.showInformationMessage(message.payload)
                  break
              }
            }
          })
        } catch (error) {
          console.error('Debug: Error starting View2:', error);
          vscode.window.showErrorMessage(`Failed to start View2: ${error}`);
        }
      })
    )

    console.log('Debug: Extension activated successfully');
  } catch (error) {
    console.error('Debug: Error during extension activation:', error);
    vscode.window.showErrorMessage(`Failed to activate extension: ${error}`);
  }
}
