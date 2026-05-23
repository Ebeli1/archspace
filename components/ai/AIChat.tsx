'use client';
import { useState, useRef, useEffect } from 'react';
import { Send, Paperclip, X, Download, RotateCcw, Bot } from 'lucide-react';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  imageBase64?: string;
}

interface AIChatProps {
  feature: 'studio' | 'remodel' | 'advisor';
  placeholder?: string;
  welcomeMessage: string;
  suggestions?: string[];
}

function renderMarkdown(text: string): string {
  if (!text) return '';
  
  let html = text
    // Headers
    .replace(/^### (.*$)/gm, '<h3 class="text-base font-bold text-gray-900 mt-4 mb-2">$1</h3>')
    .replace(/^## (.*$)/gm, '<h2 class="text-lg font-bold text-gray-900 mt-4 mb-2">$1</h2>')
    // Bold
    .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-gray-900">$1</strong>')
    // Lists
    .replace(/^\d+\.\s+(.*$)/gm, '<li class="ml-4 text-gray-700">$1</li>')
    .replace(/^- (.*$)/gm, '<li class="ml-4 text-gray-700">$1</li>')
    // Links
    .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-accent hover:underline">$1</a>')
    // Paragraphs
    .replace(/\n\n/g, '</p><p class="text-gray-700 leading-relaxed my-2">')
    // Tables
    .replace(/\|(.+)\|/g, (match) => {
      const cells = match.split('|').filter(c => c.trim());
      return '<tr>' + cells.map(c => `<td class="border border-gray-200 px-3 py-1 text-sm">${c.trim()}</td>`).join('') + '</tr>';
    });
  
  return `<p class="text-gray-700 leading-relaxed my-2">${html}</p>`;
}

export default function AIChat({ feature, placeholder, welcomeMessage, suggestions = [] }: AIChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'assistant', content: welcomeMessage, timestamp: new Date() },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleImageUpload = (file: File) => {
    setImageFile(file);
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setImagePreview(result);
      setImageBase64(result.split(',')[1]);
    };
    reader.readAsDataURL(file);
  };

  const sendMessage = async (text?: string) => {
    const content = (text ?? input).trim();
    if (!content || loading) return;
    setInput('');

    const userMsg: ChatMessage = {
      role: 'user',
      content,
      timestamp: new Date(),
      imageBase64: imageBase64 || undefined,
    };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setLoading(true);

    // Mock response for now
    setTimeout(() => {
      const mockResponses: Record<string, string> = {
        studio: `## ArchSpace Design Brief

**Project:** Modern 3-bedroom Bungalow  
**Style:** Yoruba-Contemporary  
**Plot/Space:** 450 sqm (approx.)  
**Estimated Budget Range:** ₦25M - ₦35M

### Room Breakdown
| Room | Dimensions | Key Features |
|------|------------|--------------|
| Living Room | 6m x 5m | Open plan, high ceiling |
| Master Bedroom | 5m x 4m | Walk-in closet, ensuite |
| Kitchen | 4m x 3.5m | Modern fitted cabinets |

### Style & Materials
- **Colour palette:** Warm whites, terracotta accents
- **Flooring:** Porcelain tiles in living areas
- **Wall finish:** Smooth skim plaster

### Next Steps
Share this brief with an architect or browse our marketplace.`,

        remodel: `## Remodel Recommendations

**Current layout assessment:** The living room and kitchen feel disconnected.

### Recommended Changes

1. **Open up kitchen wall** — Remove the wall between kitchen and dining. *Impact: medium cost*

2. **Expand master bedroom** — Convert adjacent storage into walk-in closet. *Impact: low cost*

### Estimated Revision Cost
₦50,000 - ₦80,000 for updated drawings`,

        advisor: `## My Recommendations for You

**Based on:** A modern 4-bedroom home in Lagos with contemporary style.

### 1. Modern 4-bedroom duplex
**Why this fits:** Exactly matches your requirements
**Price:** ₦45,000 | Non-exclusive license

### 2. Contemporary bungalow facade
**Why this fits:** Modern exterior design
**Price:** ₦62,000 | Exclusive license

**View these designs in our Browse page!**`
      };

      const response = mockResponses[feature] || "I'm here to help! Tell me more about what you're looking for.";

      const assistantMsg: ChatMessage = {
        role: 'assistant',
        content: response,
        timestamp: new Date(),
      };
      setMessages([...newMessages, assistantMsg]);
      setLoading(false);
      
      if (feature === 'remodel') {
        setImageFile(null);
        setImagePreview(null);
        setImageBase64(null);
      }
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const exportBrief = () => {
    const lastAssistant = [...messages].reverse().find(m => m.role === 'assistant');
    if (!lastAssistant) return;
    const blob = new Blob([lastAssistant.content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `archspace-${feature}-brief.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const resetChat = () => {
    setMessages([{ role: 'assistant', content: welcomeMessage, timestamp: new Date() }]);
    setImageFile(null);
    setImagePreview(null);
    setImageBase64(null);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-gray-100 bg-white">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-brand flex items-center justify-center">
            <Bot size={13} className="text-accent" />
          </div>
          <span className="text-xs font-medium text-gray-500">ArchSpace AI</span>
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={exportBrief} 
            title="Download brief" 
            className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Download size={14} />
          </button>
          <button 
            onClick={resetChat} 
            title="New conversation" 
            className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <RotateCcw size={14} />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 bg-gray-50/50 min-h-[400px]">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}>
            {msg.role === 'assistant' && (
              <div className="w-7 h-7 rounded-full bg-brand flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                <Bot size={13} className="text-accent" />
              </div>
            )}
            <div className={`max-w-[82%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
              msg.role === 'user' 
                ? 'bg-brand text-white rounded-br-sm' 
                : 'bg-white border border-gray-100 text-gray-800 rounded-bl-sm shadow-sm'
            }`}>
              {msg.role === 'assistant' ? (
                msg.content ? (
                  <div className="ai-prose" dangerouslySetInnerHTML={{ __html: renderMarkdown(msg.content) }} />
                ) : (
                  <span className="inline-block w-1.5 h-4 bg-accent animate-pulse align-middle" />
                )
              ) : (
                <>
                  {msg.imageBase64 && (
                    <img 
                      src={`data:image/jpeg;base64,${msg.imageBase64}`} 
                      alt="Uploaded plan" 
                      className="rounded-lg mb-2 max-h-40 object-cover"
                    />
                  )}
                  <p>{msg.content}</p>
                </>
              )}
            </div>
          </div>
        ))}
        
        {/* Suggestions */}
        {messages.length === 1 && suggestions.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4 justify-center">
            {suggestions.map((suggestion, idx) => (
              <button
                key={idx}
                onClick={() => handleSuggestionClick(suggestion)}
                className="px-3 py-1.5 bg-white border border-gray-200 rounded-full text-xs text-gray-600 hover:border-accent hover:text-accent transition-colors"
              >
                {suggestion}
              </button>
            ))}
          </div>
        )}
        
        <div ref={bottomRef} />
      </div>

      {/* Image Preview */}
      {imagePreview && (
        <div className="px-4 py-2 bg-white border-t border-gray-100 flex items-center gap-3">
          <img src={imagePreview} alt="Attached plan" className="h-12 w-16 object-cover rounded-lg border border-gray-200" />
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-gray-700 truncate">{imageFile?.name}</p>
            <p className="text-xs text-gray-400">Floor plan attached — describe what you'd like to change</p>
          </div>
          <button 
            onClick={() => { setImageFile(null); setImagePreview(null); setImageBase64(null); }}
            className="text-gray-400 hover:text-gray-700"
          >
            <X size={14} />
          </button>
        </div>
      )}

      {/* Input */}
      <div className="px-4 py-3 bg-white border-t border-gray-100">
        <div className="flex items-end gap-2 bg-gray-50 rounded-xl border border-gray-200 px-3 py-2 focus-within:border-accent/50 focus-within:ring-2 focus-within:ring-accent/10 transition-all">
          {feature === 'remodel' && (
            <>
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="text-gray-400 hover:text-accent transition-colors mb-0.5 flex-shrink-0"
                title="Attach floor plan"
              >
                <Paperclip size={16} />
              </button>
              <input 
                ref={fileInputRef} 
                type="file" 
                accept="image/*" 
                className="hidden" 
                onChange={e => { if (e.target.files?.[0]) handleImageUpload(e.target.files[0]); }} 
              />
            </>
          )}
          <textarea
            rows={1}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder || 'Type your message...'}
            className="flex-1 bg-transparent text-sm resize-none focus:outline-none max-h-32 py-0.5 placeholder:text-gray-400"
            style={{ lineHeight: '1.5' }}
          />
          <button 
            onClick={() => sendMessage()}
            disabled={!input.trim() || loading}
            className="bg-brand text-white p-1.5 rounded-lg hover:bg-brand-light disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex-shrink-0 mb-0.5"
          >
            <Send size={14} />
          </button>
        </div>
        <p className="text-[10px] text-gray-400 text-center mt-1.5">
          Powered by Claude — ArchSpace AI may make mistakes
        </p>
      </div>
    </div>
  );
}