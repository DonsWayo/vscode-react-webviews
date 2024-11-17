import React, { FunctionComponent } from 'react'
import { VscGear, VscSymbolColor, VscJson } from 'react-icons/vsc'
import { Link } from 'react-router-dom'
import Input from './lib/components/Input'
import Toggle from './lib/components/Toggle'
import { useSettings, useUpdateSetting } from './appState'
import type { Settings } from './appState'

const View1: FunctionComponent = () => {
  const settings = useSettings()
  const updateSetting = useUpdateSetting()

  const handleSettingChange = (key: keyof Settings, value: any) => {
    updateSetting(key, value)
  }

  return (
    <div className="min-h-screen bg-vscode-editor text-vscode-editor p-6 vscode-scrollbar">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center space-x-2">
          <VscGear className="text-2xl text-vscode-button" />
          <h1 className="text-2xl font-bold text-vscode-settings-header">
            Extension Settings
          </h1>
        </div>

        <div className="space-y-8">
          <section className="space-y-4">
            <div className="flex items-center space-x-2 text-lg text-vscode-settings-header">
              <VscJson />
              <h2>API Configuration</h2>
            </div>
            <Input
              value={settings.apiEndpoint}
              title="API Endpoint"
              label="The base URL for API requests"
              placeholder="https://api.example.com"
              handleChange={e => handleSettingChange('apiEndpoint', e.target.value)}
            />
          </section>

          <section className="space-y-4">
            <div className="flex items-center space-x-2 text-lg text-vscode-settings-header">
              <VscSymbolColor />
              <h2>Editor Preferences</h2>
            </div>
            <div className="space-y-4 bg-vscode-editor p-4 rounded border border-vscode-settings-dropdownListBorder">
              <Toggle
                title="Dark Mode"
                label="Use dark theme for extension views"
                checked={settings.darkMode}
                handleChange={e => handleSettingChange('darkMode', e.target.checked)}
              />
              <Toggle
                title="Auto Save"
                label="Automatically save changes"
                checked={settings.autoSave}
                handleChange={e => handleSettingChange('autoSave', e.target.checked)}
              />
              <Toggle
                title="Format on Save"
                label="Format code when saving"
                checked={settings.formatOnSave}
                handleChange={e => handleSettingChange('formatOnSave', e.target.checked)}
              />
              <Input
                value={settings.indentSize}
                title="Indent Size"
                label="Number of spaces for indentation"
                placeholder="2"
                handleChange={e => handleSettingChange('indentSize', e.target.value)}
              />
            </div>
          </section>
        </div>

        <div className="pt-4 border-t border-vscode-settings-dropdownListBorder">
          <Link
            to="/view2"
            className="vscode-button inline-flex items-center space-x-2 no-underline"
          >
            <span>View Project Statistics</span>
            <span>→</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default View1
