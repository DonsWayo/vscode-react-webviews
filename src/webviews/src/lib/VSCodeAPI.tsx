declare const acquireVsCodeApi: Function;

interface VSCodeApi {
  getState: () => any;
  setState: (newState: any) => any;
  postMessage: (message: any) => void;
}

type MessageType =
  | { type: 'updateSettings'; payload: any }
  | { type: 'refreshStats'; payload?: undefined }
  | { type: 'error'; payload: string }
  | { type: 'success'; payload: string };

class VSCodeWrapper {
  private readonly vscodeApi: VSCodeApi;
  private readonly messageListeners: Set<(message: MessageType) => void>;

  constructor() {
    this.vscodeApi = acquireVsCodeApi();
    this.messageListeners = new Set();

    window.addEventListener('message', event => {
      const message = event.data as MessageType;
      this.notifyListeners(message);
    });
  }

  public postMessage(message: MessageType): void {
    this.vscodeApi.postMessage(message);
  }

  public onMessage(callback: (message: MessageType) => void): () => void {
    this.messageListeners.add(callback);
    return () => this.messageListeners.delete(callback);
  }

  private notifyListeners(message: MessageType): void {
    this.messageListeners.forEach(listener => listener(message));
  }

  public getState = (): any => {
    return this.vscodeApi.getState() ?? {};
  };

  public setState = (newState: any): void => {
    if (JSON.stringify(this.getState()) !== JSON.stringify(newState)) {
      this.vscodeApi.setState(newState);
    }
  };

  public updateSettings(settings: any): void {
    this.postMessage({ type: 'updateSettings', payload: settings });
  }

  public refreshStats(): void {
    this.postMessage({ type: 'refreshStats' });
  }

  public showError(message: string): void {
    this.postMessage({ type: 'error', payload: message });
  }

  public showSuccess(message: string): void {
    this.postMessage({ type: 'success', payload: message });
  }
}

const VSCodeAPI = new VSCodeWrapper();
export default VSCodeAPI;
