import { GitListener } from './listeners/general/GitListener';
import * as vscode from 'vscode';
import { COMMAND_NAME, CONTEXT, EXTENSION_NAME } from './constants';

// Type definitions for removed dashboard functionality
import * as React from 'react';
import { SortingSetting } from './models/SortingSetting';

export type SortingOption = SortingSetting;

export enum SortOption {
  FileNameAsc = 'fileNameAsc',
  FileNameDesc = 'fileNameDesc',
  AltAsc = 'altAsc',
  AltDesc = 'altDesc',
  CaptionAsc = 'captionAsc',
  CaptionDesc = 'captionDesc',
  SizeAsc = 'sizeAsc',
  SizeDesc = 'sizeDesc',
  DateAsc = 'dateAsc',
  DateDesc = 'dateDesc'
}

export interface Page {
  title?: string;
  slug?: string;
  path?: string;
  date?: string;
  draft?: boolean;
  fmRelFilePath?: string;
  fmFilePath?: string;
  [key: string]: any;
}

// Dummy objects to avoid errors when removing dashboard functionality
// eslint-disable-next-line @typescript-eslint/no-empty-function
export const Dashboard = {
  isOpen: false,
  viewData: {
    type: 'file' as const,
    data: {
      type: 'file' as const,
      filePath: ''
    }
  },
  filePath: '',
  getWebview: () => ({
    asWebviewUri: (uri: any) => ({ toString: () => '' })
  }),
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  postWebviewMessage: (message: any) => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  resetViewData: () => {},
  sendMediaFiles: () => {
    // Stub method for removed dashboard functionality
  }, // eslint-disable-line @typescript-eslint/no-empty-function
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  mediaUpdate: () => {},
  getSettings: () => {
    // Stub method for removed dashboard functionality
    return Promise.resolve({});
  }, // eslint-disable-line @typescript-eslint/no-empty-function
};

export const DashboardCommand = {
  mediaUpdate: 'mediaUpdate'
};
export const DashboardMessage = {
  getMode: 'getMode'
};
export const DashboardMediaListener = {
  sendMediaFiles: () => {}
};
export const DashboardSettingsListener = {
  getSettings: (clear?: boolean) => {}
};
export const PagesListener = {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  refresh: () => {},
  getPagesData: (force: boolean, callback: (pages: any[]) => void) => callback([])
};
// Simple I10nProvider component for removed functionality
export const I10nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => React.createElement(React.Fragment, null, children);

// Simple Settings interface for removed functionality (removed to avoid conflict with Settings class)
interface RemovedSettings {
  [key: string]: any;
}
import { MarkdownFoldingProvider } from './providers/MarkdownFoldingProvider';
import { PanelProvider } from './panelWebView/PanelProvider';
import {
  debounceCallback,
  Logger,
  parseWinPath,
  Settings as SettingsHelper
} from './helpers';
import ContentProvider from './providers/ContentProvider';
import { ModeSwitch } from './services/ModeSwitch';
import { PagesParser } from './services/PagesParser';
import { ContentType, Extension } from './helpers';
import * as l10n from '@vscode/l10n';
import {
  Backers,
  Diagnostics,
  Wysiwyg,
  Content,
  Cache,
  Template,
  Project,
  Preview,
  Folders,
  Article,
  Settings,
  StatusListener,
  Chatbot,
  Taxonomy
} from './commands';
import { join } from 'path';
import { Terminal } from './services';
import { i18n } from './commands/i18n';
import { UriHandler } from './providers/UriHandler';

let pageUpdateDebouncer: { (fnc: any, time: number): void };
// eslint-disable-next-line @typescript-eslint/no-unused-vars
let editDebounce: { (fnc: any, time: number): void };
let collection: vscode.DiagnosticCollection;

export async function activate(context: vscode.ExtensionContext) {
  const { subscriptions, extensionUri, extensionPath } = context;

  const extension = Extension.getInstance(context);

  Logger.info(`Activating ${EXTENSION_NAME} version ${Extension.getInstance().version}...`);

  // Set development context
  if (!Extension.getInstance().isProductionMode) {
    vscode.commands.executeCommand('setContext', CONTEXT.isDevelopment, true);
  }

  // Sponsor check
  Backers.init(context);

  // Make sure the EN language file is loaded
  if (!vscode.l10n.uri) {
    l10n.config({
      fsPath: vscode.Uri.file(join(parseWinPath(extensionPath), `/l10n/bundle.l10n.json`)).fsPath
    });
  } else {
    l10n.config({
      fsPath: vscode.l10n.uri.fsPath
    });
  }

  // Make sure the terminal windows are closed
  Terminal.closeLocalServerTerminal();

  if (!extension.checkIfExtensionCanRun()) {
    return undefined;
  }

  await SettingsHelper.init();
  extension.migrateSettings();

  SettingsHelper.checkToPromote();

  collection = vscode.languages.createDiagnosticCollection('frontMatter');

  // Multilingual commands
  i18n.register();

  // Setting commands
  // Settings.registerCommands(); // Removed for light version
  SettingsHelper.registerCommands();

  // Register the explorer view
  const explorerSidebar = PanelProvider.getInstance(extensionUri);
  const PanelView = vscode.window.registerWebviewViewProvider(
    PanelProvider.viewType,
    explorerSidebar,
    {
      webviewOptions: {
        retainContextWhenHidden: true
      }
    }
  );

  // Folding the front matter of markdown files
  MarkdownFoldingProvider.register();

  // Register the taxonomy commands
  Taxonomy.registerCommands(subscriptions);

  // Register all the article commands and listeners
  Article.registerCommands(subscriptions);
  Article.registerListeners(subscriptions);

  // Template creation
  Template.registerCommands();

  // Content creation
  ContentType.registerCommands();
  Content.registerCommands();
  Folders.registerCommands();

  // Project commands
  Project.registerCommands();

  // Collapse all sections in the webview
  const collapseAll = vscode.commands.registerCommand(COMMAND_NAME.collapseSections, () => {
    PanelProvider.getInstance()?.collapseAll();
  });

  // Things to do when configuration changes
  SettingsHelper.startListening();

  // Create the status bar
  const fmStatusBarItem = vscode.window.createStatusBarItem(
    'fm-statusBarItem',
    vscode.StatusBarAlignment.Right,
    -100
  );
  // fmStatusBarItem.command = COMMAND_NAME.dashboard;
  fmStatusBarItem.text = `$(fm-logo) ${extension.getVersion().installedVersion}`;
  fmStatusBarItem.tooltip = EXTENSION_NAME;
  fmStatusBarItem.show();

  // Register listeners that make sure the status bar updates
  pageUpdateDebouncer = debounceCallback();
  subscriptions.push(
    vscode.window.onDidChangeActiveTextEditor(() =>
      triggerPageUpdate(`onDidChangeActiveTextEditor`)
    )
  );
  subscriptions.push(
    vscode.window.onDidChangeTextEditorSelection((e) => {
      if (e.kind === vscode.TextEditorSelectionChangeKind.Mouse) {
        pageUpdateDebouncer(() => triggerPageUpdate(`onDidChangeTextEditorSelection`), 200);
      }
    })
  );
  subscriptions.push(
    vscode.workspace.onDidChangeTextDocument((TextDocumentChangeEvent) => {
      const filePath = TextDocumentChangeEvent.document.uri.fsPath;
      if (filePath && !filePath.toLowerCase().startsWith(`extension-output`)) {
        MarkdownFoldingProvider.triggerHighlighting();
        pageUpdateDebouncer(() => triggerPageUpdate(`onDidChangeTextEditorSelection`), 200);
      }
    })
  );

  // Automatically run the command
  triggerPageUpdate(`main`);

  // Webview for preview
  Preview.init();
  subscriptions.push(
    vscode.commands.registerCommand(COMMAND_NAME.preview, () => Preview.open(extensionPath))
  );

  // Open docs
  subscriptions.push(
    vscode.commands.registerCommand(COMMAND_NAME.docs, () => {
      vscode.commands.executeCommand(
        `simpleBrowser.show`,
        `https://${extension.isBetaVersion() ? `beta.` : ``}frontmatter.codes/docs`
      );
    })
  );

  // Chat to the bot
  subscriptions.push(
    vscode.commands.registerCommand(COMMAND_NAME.chatbot, () => Chatbot.open(extensionPath))
  );

  // Create the editor experience for bulk scripts
  subscriptions.push(
    vscode.workspace.registerTextDocumentContentProvider(
      ContentProvider.scheme,
      new ContentProvider()
    )
  );

  // What you see, is what you get
  Wysiwyg.registerCommands(subscriptions);

  // Mode switching
  ModeSwitch.register();

  // Diagnostics
  Diagnostics.registerCommands();

  // Git
  GitListener.init();

  // Once everything is registered, the page parsing can start in the background
  PagesParser.start();

  // Cache commands
  Cache.registerCommands();

  // Register the URI handler
  UriHandler.register();

  // Subscribe all commands
  subscriptions.push(PanelView, collapseAll, fmStatusBarItem);

  // eslint-disable-next-line no-console
  console.log(`𝖥𝗋𝗈𝗇𝗍 𝖬𝖺𝗍𝗍𝖾𝗋 𝖢𝖬𝖲 𝖺𝖼𝗍𝗂𝗏𝖺𝗍𝖾𝖽! 𝖱𝖾𝖺𝖽𝗒 𝗍𝗈 𝗌𝗍𝖺𝗋𝗍 𝗐𝗋𝗂𝗍𝗂𝗇𝗀... 👩‍💻🧑‍💻👨‍💻`);
}

// eslint-disable-next-line @typescript-eslint/no-empty-function
export function deactivate() {}

const triggerPageUpdate = async (location: string) => {
  Logger.verbose(`Trigger page update: ${location}`);
  pageUpdateDebouncer(() => {
    StatusListener.verify(collection);
  }, 1000);

  if (location === 'onDidChangeActiveTextEditor') {
    await PanelProvider.openOnSupportedFile();
    PanelProvider.getInstance()?.updateCurrentFile();
  }
};
