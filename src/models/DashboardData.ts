import { Position } from 'vscode';
import { BlockFieldData } from './BlockFieldData';
import { ContentType } from '.';

export interface DashboardData {
  type: string;
  data?: ViewData;
}

export interface ViewData {
  filePath?: string;
  fieldName?: string;
  position?: Position;
  fileTitle?: string;
  contentType?: ContentType;
  selection?: string;
  range?: SnippetRange;
  snippetInfo?: SnippetInfo;
  pageBundle?: boolean;
  metadataInsert?: boolean;
  blockData?: BlockFieldData;
  parents?: string[];
  multiple?: string[];
  value?: string;

  // File fields
  type: 'file' | 'media';
  fileExtensions?: string[];
}

export interface SnippetRange {
  start: Position;
  end: Position;
}

export interface SnippetInfo {
  id: string;
  fields: SnippetInfoField[];
}

export interface SnippetInfoField {
  name: string;
  value: string;
}
