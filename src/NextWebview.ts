import * as vscode from 'vscode'
import { nanoid } from 'nanoid'

type NextWebviewOptions = {
  extensionUri: vscode.Uri
  route: string
  title: string
  viewId: string
  scriptUri?: vscode.Uri
  styleUri?: vscode.Uri
  nonce?: string
  handleMessage?: (message: any) => any
}

abstract class NextWebview {
  protected readonly _opts: Required<NextWebviewOptions>

  public constructor(options: NextWebviewOptions) {
    this._opts = Object.assign(
      {
        scriptUri: vscode.Uri.joinPath(
          options.extensionUri,
          'out/webviews/index.js'
        ),
        styleUri: vscode.Uri.joinPath(
          options.extensionUri,
          'out/webviews/style.css'
        ),
        nonce: nanoid(),
        handleMessage: () => { },
      },
      options
    )
  }

  protected getWebviewOptions(): vscode.WebviewOptions {
    return {
      enableScripts: true,
      localResourceRoots: [
        vscode.Uri.joinPath(this._opts.extensionUri, 'out'),
        vscode.Uri.joinPath(this._opts.extensionUri, 'out/webviews')
      ]
    }
  }

  protected handleMessage(message: any): void {
    this._opts.handleMessage(message)
  }

  protected _getContent(webview: vscode.Webview) {
    const scriptUri = webview.asWebviewUri(this._opts.scriptUri)
    const styleUri = webview.asWebviewUri(this._opts.styleUri)
    const nonce = this._opts.nonce

    return /* html */ `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src ${webview.cspSource} 'unsafe-inline'; script-src 'nonce-${nonce}'; img-src ${webview.cspSource} https: data:; font-src ${webview.cspSource};">
          <title>${this._opts.title}</title>
          <script nonce="${nonce}">
            const vscode = acquireVsCodeApi();
            window.acquireVsCodeApi = () => vscode;
          </script>
          <link href="${styleUri}" rel="stylesheet" />
        </head>
        <body>
          <div id="root" data-route="${this._opts.route}"></div>
          <script nonce="${nonce}" src="${scriptUri}"></script>
        </body>
      </html>
    `
  }

  public abstract update(): void
}

export class NextWebviewPanel extends NextWebview implements vscode.Disposable {
  private static instances: { [id: string]: NextWebviewPanel } = {}
  private readonly panel: vscode.WebviewPanel
  private _disposables: vscode.Disposable[] = []

  public static getInstance(
    opts: NextWebviewOptions & { column?: vscode.ViewColumn }
  ): NextWebviewPanel {
    const _opts = Object.assign(
      {
        column: vscode.window.activeTextEditor
          ? vscode.window.activeTextEditor.viewColumn
          : undefined,
      },
      opts
    )

    let instance = NextWebviewPanel.instances[_opts.viewId]
    if (instance) {
      instance.panel.reveal(_opts.column)
    } else {
      instance = new NextWebviewPanel(_opts)
      NextWebviewPanel.instances[_opts.viewId] = instance
    }

    return instance
  }

  private constructor(
    opts: NextWebviewOptions & { column?: vscode.ViewColumn }
  ) {
    super(opts)
    this.panel = vscode.window.createWebviewPanel(
      opts.route,
      opts.title,
      opts.column || vscode.ViewColumn.One,
      this.getWebviewOptions()
    )
    this.update()

    this.panel.onDidDispose(() => this.dispose(), null, this._disposables)
    this.panel.webview.onDidReceiveMessage(
      this.handleMessage,
      this,
      this._disposables
    )
  }

  public update() {
    this.panel.title = this._opts.title
    this.panel.webview.html = this._getContent(this.panel.webview)
  }

  public dispose() {
    delete NextWebviewPanel.instances[this._opts.viewId]
    this.panel.dispose()
    while (this._disposables.length) {
      const x = this._disposables.pop()
      if (x) {
        x.dispose()
      }
    }
  }
}

export class NextWebviewSidebar
  extends NextWebview
  implements vscode.WebviewViewProvider {
  private _webview?: vscode.WebviewView

  public resolveWebviewView(
    webviewView: vscode.WebviewView,
    context: vscode.WebviewViewResolveContext<unknown>,
    token: vscode.CancellationToken
  ): void | Thenable<void> {
    this._webview = webviewView
    this._webview.webview.options = this.getWebviewOptions()
    this.update()
    this._webview.webview.onDidReceiveMessage(this.handleMessage, this)
  }

  update(): void {
    if (this._webview) {
      this._webview.webview.html = this._getContent(this._webview.webview)
    }
  }
}
