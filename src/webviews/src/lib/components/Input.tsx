import React, { FunctionComponent } from 'react'

type InputProps = {
  value: string
  title: string
  label?: string
  placeholder?: string
  success?: string
  error?: string
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Input: FunctionComponent<InputProps> = ({
  value,
  title,
  label,
  placeholder,
  success,
  error,
  handleChange,
}) => {
  return (
    <div className="flex flex-col space-y-1">
      <label className="flex flex-col space-y-1">
        <span className="text-vscode-settings-header font-medium">
          {title}
        </span>
        {label && (
          <span className="text-sm text-vscode-description">
            {label}
          </span>
        )}
      </label>
      <input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className={`
          vscode-input
          ${error ? 'border-red-500' : ''}
          ${success ? 'border-green-500' : ''}
        `}
      />
      {error && (
        <span className="text-sm text-red-500">{error}</span>
      )}
      {success && (
        <span className="text-sm text-green-500">{success}</span>
      )}
    </div>
  )
}

export default Input
