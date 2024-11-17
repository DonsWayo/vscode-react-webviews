import React, { FunctionComponent } from 'react'

type ToggleProps = {
  checked: boolean
  title: string
  label?: string
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Toggle: FunctionComponent<ToggleProps> = ({
  checked,
  title,
  label,
  handleChange,
}) => {
  return (
    <div className="flex flex-col space-y-1">
      <label className="flex items-center space-x-3 cursor-pointer">
        <input
          type="checkbox"
          checked={checked}
          onChange={handleChange}
          className="vscode-checkbox"
        />
        <div className="flex flex-col">
          <span className="text-vscode-settings-header font-medium">
            {title}
          </span>
          {label && (
            <span className="text-sm text-vscode-description">
              {label}
            </span>
          )}
        </div>
      </label>
    </div>
  )
}

export default Toggle
