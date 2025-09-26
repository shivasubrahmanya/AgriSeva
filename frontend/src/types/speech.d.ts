declare global {
  interface SpeechRecognitionEvent {
    results: any;
  }

  interface SpeechRecognition {
    lang: string;
    continuous: boolean;
    interimResults: boolean;
    onresult: (event: SpeechRecognitionEvent) => void;
    onerror: (event: any) => void;
    onend: () => void;
    start(): void;
    stop(): void;
    abort(): void;
  }

  interface Window {
    webkitSpeechRecognition: any;
    SpeechRecognition: any;
  }
}

export {};
