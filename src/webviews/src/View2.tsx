import React, { FunctionComponent } from 'react';
import { VscGraph, VscFile, VscHistory } from 'react-icons/vsc';
import { Link } from 'react-router-dom';
import { useFileStats } from './appState';
import type { FileStats } from './appState';

type StatCardProps = {
  title: string;
  value: string | number;
  icon: React.ReactNode;
};

const StatCard: FunctionComponent<StatCardProps> = ({ title, value, icon }) => (
  <div className="bg-vscode-editor p-4 rounded border border-vscode-settings-dropdownListBorder">
    <div className="flex items-center space-x-2 mb-2">
      <span className="text-vscode-button">{icon}</span>
      <h3 className="text-sm text-vscode-editor">{title}</h3>
    </div>
    <div className="text-2xl font-bold text-vscode-settings-header">
      {value}
    </div>
  </div>
);

const View2: FunctionComponent = () => {
  const fileStats = useFileStats();

  return (
    <div className="min-h-screen bg-vscode-editor text-vscode-editor p-6 vscode-scrollbar">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <VscGraph className="text-2xl text-vscode-button" />
            <h1 className="text-2xl font-bold text-vscode-settings-header">
              Project Statistics
            </h1>
          </div>
          <Link
            to="/view1"
            className="vscode-button-secondary inline-flex items-center space-x-2 no-underline"
          >
            <span>Back to Settings</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard
            title="Total Files"
            value={fileStats.totalFiles}
            icon={<VscFile />}
          />
          <StatCard
            title="Lines of Code"
            value={fileStats.linesOfCode.toLocaleString()}
            icon={<VscGraph />}
          />
          <StatCard
            title="TypeScript Files"
            value={fileStats.fileTypes.typescript}
            icon={<VscFile />}
          />
        </div>

        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <VscHistory className="text-vscode-button" />
            <h2 className="text-lg text-vscode-settings-header">
              Recent Activity
            </h2>
          </div>
          <div className="space-y-2">
            {fileStats.recentCommits.map(commit => (
              <div
                key={commit.id}
                className="bg-vscode-editor p-4 rounded border border-vscode-settings-dropdownListBorder hover:bg-vscode-list-hover transition-colors"
              >
                <div className="text-vscode-editor">{commit.message}</div>
                <div className="text-sm text-vscode-description">
                  {commit.time}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-lg text-vscode-settings-header flex items-center space-x-2">
            <VscFile className="text-vscode-button" />
            <span>File Distribution</span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {Object.entries(fileStats.fileTypes).map(([type, count]) => (
              <div
                key={type}
                className="bg-vscode-editor p-4 rounded border border-vscode-settings-dropdownListBorder hover:bg-vscode-list-hover transition-colors"
              >
                <div className="text-sm text-vscode-description capitalize">
                  {type}
                </div>
                <div className="text-lg font-bold text-vscode-settings-header">
                  {count}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default View2;
