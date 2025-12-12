
// --- Text To Speech Service ---
export class TextToSpeech {
  private static instance: TextToSpeech;
  private synthesis: SpeechSynthesis;

  private constructor() {
    this.synthesis = window.speechSynthesis;
  }

  public static getInstance(): TextToSpeech {
    if (!TextToSpeech.instance) {
      TextToSpeech.instance = new TextToSpeech();
    }
    return TextToSpeech.instance;
  }

  public speak(text: string, lang: string = 'en-US', rate: number = 0.9): void {
    if (!this.synthesis) {
      console.warn("Speech Synthesis not supported");
      return;
    }
    
    this.synthesis.cancel(); // Stop any current speech
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = rate;

    // Intelligent voice selection
    const voices = this.synthesis.getVoices();
    const preferredVoice = voices.find(voice => 
      voice.name.includes('Google US English') || 
      (voice.lang === 'en-US' && voice.name.includes('Samantha'))
    );
    
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    this.synthesis.speak(utterance);
  }

  public stop(): void {
    if (this.synthesis) {
      this.synthesis.cancel();
    }
  }
}

// --- Speech Recognition Service ---
export class SpeechRecognizer {
  private recognition: any;
  public isSupported: boolean;

  constructor(lang: string = 'en-US') {
    const IWindow = window as any;
    const SpeechRecognition = IWindow.SpeechRecognition || IWindow.webkitSpeechRecognition;
    this.isSupported = !!SpeechRecognition;
    
    if (this.isSupported) {
      this.recognition = new SpeechRecognition();
      this.recognition.lang = lang;
      this.recognition.interimResults = false;
      this.recognition.maxAlternatives = 1;
    }
  }

  public start(
    onStart: () => void,
    onResult: (text: string) => void,
    onError: (error: any) => void,
    onEnd: () => void
  ): void {
    if (!this.isSupported) {
      alert("您的瀏覽器不支援語音辨識功能 (Web Speech API)。請嘗試使用 Chrome 或 Safari。");
      return;
    }

    // Bind callbacks
    this.recognition.onstart = onStart;
    
    this.recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      onResult(transcript);
    };

    this.recognition.onerror = (event: any) => {
      onError(event.error);
    };

    this.recognition.onend = onEnd;

    try {
      this.recognition.start();
    } catch(e) {
      console.error("Failed to start recognition", e);
      onEnd();
    }
  }

  public stop(): void {
    if (this.recognition) {
      this.recognition.stop();
    }
  }
}

// --- Evaluation Service ---
export class SpeechEvaluator {
  private static normalize(text: string): string {
    return text.toLowerCase()
      .replace(/[.,?!;:'"()-]/g, "") // Remove punctuation
      .replace(/\s+/g, " ") // Collapse whitespace
      .trim();
  }

  // Calculate Levenshtein Distance (Edit Distance)
  private static levenshteinDistance(a: string, b: string): number {
    const matrix = [];

    // Increment along the first column of each row
    for (let i = 0; i <= b.length; i++) {
      matrix[i] = [i];
    }

    // Increment each column in the first row
    for (let j = 0; j <= a.length; j++) {
      matrix[0][j] = j;
    }

    // Fill in the rest of the matrix
    for (let i = 1; i <= b.length; i++) {
      for (let j = 1; j <= a.length; j++) {
        if (b.charAt(i - 1) === a.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1, // substitution
            Math.min(
              matrix[i][j - 1] + 1, // insertion
              matrix[i - 1][j] + 1 // deletion
            )
          );
        }
      }
    }

    return matrix[b.length][a.length];
  }

  public static evaluate(spoken: string, target: string): boolean {
    const normSpoken = this.normalize(spoken);
    const normTarget = this.normalize(target);

    // 1. Exact match (Fastest)
    if (normSpoken === normTarget) return true;

    // 2. Fuzzy Match (Algorithmic Logic)
    // Calculate similarity percentage. If > 80%, accept it.
    const distance = this.levenshteinDistance(normSpoken, normTarget);
    const maxLength = Math.max(normSpoken.length, normTarget.length);
    
    // Avoid division by zero
    if (maxLength === 0) return true; 

    const similarity = 1.0 - (distance / maxLength);
    
    // Threshold: 0.8 (80%) similarity implies a pass
    if (similarity >= 0.8) {
      return true;
    }
    
    return false;
  }
}
