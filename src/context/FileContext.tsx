"use client"
import React, { createContext, useState, ReactNode } from 'react';

interface FileContextType {
  key: number;
  setKey: React.Dispatch<React.SetStateAction<number>>;

  showSetFile: boolean;
  setShowSetFile: React.Dispatch<React.SetStateAction<boolean>>;

  showSetList: boolean;
  setShowSetList: React.Dispatch<React.SetStateAction<boolean>>;

  showDialog: boolean;
  setShowDialog: React.Dispatch<React.SetStateAction<boolean>>;

  TextDialog: string;
  setTextDialog: React.Dispatch<React.SetStateAction<string>>;

  list: any[];
  setList: React.Dispatch<React.SetStateAction<any[]>>;

  Exlist: any[];
  setExList: React.Dispatch<React.SetStateAction<any[]>>;
  
  downloadFileItem: boolean;
  setDownloadFileItem: React.Dispatch<React.SetStateAction<boolean>>;

  download_json: boolean;
  setDownload_json: React.Dispatch<React.SetStateAction<boolean>>;
  
  download_xlsx: boolean;
  setDownload_xlsx: React.Dispatch<React.SetStateAction<boolean>>;
  
  send_drive: boolean;
  setSend_drive: React.Dispatch<React.SetStateAction<boolean>>;
  
  send_sheet: boolean;
  setSend_sheet: React.Dispatch<React.SetStateAction<boolean>>;
  
  show_return_dialog: boolean;
  setShow_return_dialog: React.Dispatch<React.SetStateAction<boolean>>;
  
  show_return_btn: boolean;
  setShow_return_btn: React.Dispatch<React.SetStateAction<boolean>>;
  
  textValue: string;
  setTextValue: React.Dispatch<React.SetStateAction<string>>;
}

export const FileContext = createContext<FileContextType | undefined>(undefined);

export function FileProvider({ children }: { children: ReactNode }) {
  const [key, setKey] = useState(0);
  const [showSetFile, setShowSetFile] = useState(false);
  const [showSetList, setShowSetList] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [TextDialog, setTextDialog] = useState("");
  
  const [list, setList] = useState<any>([]);
  const [Exlist, setExList] = useState<any>([]);

  const [downloadFileItem, setDownloadFileItem] = useState<boolean>(false);

  const[download_json, setDownload_json] = useState(false);
  const[download_xlsx, setDownload_xlsx] = useState(false);
  const[send_drive, setSend_drive] = useState(true);
  const[send_sheet, setSend_sheet] = useState(true);

  const[show_return_dialog, setShow_return_dialog] = useState(false);
  const[show_return_btn, setShow_return_btn] = useState(false);
  const[textValue, setTextValue] = useState("");
  
  return (
    <FileContext.Provider value={{
      key, setKey,
      showSetFile, setShowSetFile,
      showSetList, setShowSetList,
      showDialog, setShowDialog,
      TextDialog, setTextDialog,
      list, setList,
      Exlist, setExList,
      downloadFileItem, setDownloadFileItem,
      download_json, setDownload_json,
      download_xlsx, setDownload_xlsx,
      send_drive, setSend_drive,
      send_sheet, setSend_sheet,
      show_return_dialog, setShow_return_dialog,
      show_return_btn, setShow_return_btn,
      textValue, setTextValue,
    }}>
      {children}
    </FileContext.Provider>
  );
}

export function useFileContext() {
  const context = React.useContext(FileContext);
  if (!context) {
    throw new Error('useFileContext deve ser usado dentro de FileProvider');
  }
  return context;
}
