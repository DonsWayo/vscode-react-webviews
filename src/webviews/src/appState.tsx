import createVSCodeZustand from './lib/state/zustandState'

type FileStats = {
  totalFiles: number
  fileTypes: {
    typescript: number
    javascript: number
    json: number
    markdown: number
    other: number
  }
  linesOfCode: number
  recentCommits: Array<{
    id: number
    message: string
    time: string
  }>
}

type Settings = {
  apiEndpoint: string
  darkMode: boolean
  autoSave: boolean
  formatOnSave: boolean
  indentSize: string
}

type AppState = {
  settings: Settings
  fileStats: FileStats
  updateSetting: (key: keyof Settings, value: any) => void
  updateFileStats: (stats: Partial<FileStats>) => void
}

const DEFAULT_SETTINGS: Settings = {
  apiEndpoint: '',
  darkMode: true,
  autoSave: false,
  formatOnSave: true,
  indentSize: '2'
}

const DEFAULT_FILE_STATS: FileStats = {
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

// Create store with memoized actions
const useAppState = createVSCodeZustand<AppState>('appState', (set, get) => ({
  settings: DEFAULT_SETTINGS,
  fileStats: DEFAULT_FILE_STATS,
  updateSetting: (key: keyof Settings, value: any) => {
    const currentSettings = get().settings;
    if (currentSettings[key] !== value) {
      set({
        settings: {
          ...currentSettings,
          [key]: value
        }
      });
    }
  },
  updateFileStats: (stats: Partial<FileStats>) => {
    const currentStats = get().fileStats;
    set({
      fileStats: {
        ...currentStats,
        ...stats
      }
    });
  }
}));

// Selector helpers
export const useSettings = () => useAppState(state => state.settings);
export const useFileStats = () => useAppState(state => state.fileStats);
export const useUpdateSetting = () => useAppState(state => state.updateSetting);
export const useUpdateFileStats = () => useAppState(state => state.updateFileStats);

export default useAppState
export type { AppState, Settings, FileStats }
