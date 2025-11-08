/**
 * Update CSS variables based on theme
 */
export const updateCssVariables = (darkMode: boolean) => {
  const root = document.documentElement;
  
  if (darkMode) {
    root.style.setProperty('--vscode-input-background', '#3c3c3c');
    root.style.setProperty('--vscode-input-foreground', '#ffffff');
    root.style.setProperty('--vscode-input-border', '#3f3f46');
    root.style.setProperty('--vscode-inputOption-activeBorder', '#0078d4');
    root.style.setProperty('--vscode-button-background', '#0078d4');
    root.style.setProperty('--vscode-button-foreground', '#ffffff');
    root.style.setProperty('--vscode-button-hoverBackground', '#026ec1');
    root.style.setProperty('--vscode-dropdown-background', '#3c3c3c');
    root.style.setProperty('--vscode-dropdown-foreground', '#ffffff');
    root.style.setProperty('--vscode-dropdown-border', '#3f3f46');
    root.style.setProperty('--vscode-textLink-foreground', '#3794ff');
    root.style.setProperty('--vscode-textLink-activeForeground', '#3794ff');
    root.style.setProperty('--vscode-textSeparator-foreground', '#2a2d2e');
    root.style.setProperty('--vscode-foreground', '#cccccc');
    root.style.setProperty('--vscode-descriptionForeground', '#9e9e9e');
    root.style.setProperty('--vscode-icon-foreground', '#cccccc');
    root.style.setProperty('--vscode-quickInput-foreground', '#cccccc');
    root.style.setProperty('--vscode-quickInput-background', '#1f1f1f');
    root.style.setProperty('--vscode-quickInputTitle-background', '#ffffff1a');
    root.style.setProperty('--vscode-quickInputList-focusBackground', '#043d71');
  } else {
    root.style.setProperty('--vscode-input-background', '#ffffff');
    root.style.setProperty('--vscode-input-foreground', '#616161');
    root.style.setProperty('--vscode-input-border', '#cecece');
    root.style.setProperty('--vscode-inputOption-activeBorder', '#0078d4');
    root.style.setProperty('--vscode-button-background', '#0078d4');
    root.style.setProperty('--vscode-button-foreground', '#ffffff');
    root.style.setProperty('--vscode-button-hoverBackground', '#026ec1');
    root.style.setProperty('--vscode-dropdown-background', '#ffffff');
    root.style.setProperty('--vscode-dropdown-foreground', '#616161');
    root.style.setProperty('--vscode-dropdown-border', '#cecece');
    root.style.setProperty('--vscode-textLink-foreground', '#006ab1');
    root.style.setProperty('--vscode-textLink-activeForeground', '#006ab1');
    root.style.setProperty('--vscode-textSeparator-foreground', '#616161');
    root.style.setProperty('--vscode-foreground', '#616161');
    root.style.setProperty('--vscode-descriptionForeground', '#717171');
    root.style.setProperty('--vscode-icon-foreground', '#616161');
    root.style.setProperty('--vscode-quickInput-foreground', '#616161');
    root.style.setProperty('--vscode-quickInput-background', '#ffffff');
    root.style.setProperty('--vscode-quickInputTitle-background', '#ffffff');
    root.style.setProperty('--vscode-quickInputList-focusBackground', '#e8e8e8');
  }
};