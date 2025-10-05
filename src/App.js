/**
 * App.js
 * Main application logic with modern interface, star score, and AI integration
 */

class App {
  constructor() {
    this.homeInfo = null;
    this.starParticles = null;
    this.apiEndpoint = "/api/openai";
    
    this.init();
  }
  
  init() {
    // Initialize star particles background
    this.initStarBackground();
    
    // Initialize home info panel
    this.initHomeInfo();
    
    // Setup AI question zone
    this.setupAIQuestionZone();
    
    // Setup event listeners
    this.setupEventListeners();
  }
  
  initStarBackground() {
    const canvas = document.getElementById('star-canvas');
    if (canvas && typeof StarParticles !== 'undefined') {
      this.starParticles = new StarParticles('star-canvas');
    }
  }
  
  initHomeInfo() {
    const container = document.getElementById('home-info-container');
    if (container && typeof HomeInfo !== 'undefined') {
      this.homeInfo = new HomeInfo('home-info-container');
    }
  }
  
  setupAIQuestionZone() {
    const aiZone = document.getElementById('ai-question-zone');
    if (!aiZone) return;
    
    const html = `
      <div class="ai-panel">
        <h2>💬 Pose ta question à l'IA</h2>
        <div id="ai-conversation" class="ai-conversation"></div>
        <form id="ai-question-form" class="ai-question-form">
          <input 
            type="text" 
            id="ai-question-input" 
            placeholder="Pose une question en français ou en anglais..." 
            autocomplete="off"
            required
          />
          <button type="submit" id="ai-submit-btn">
            <span class="btn-text">Envoyer</span>
            <span class="btn-loading" style="display: none;">⏳</span>
          </button>
        </form>
      </div>
    `;
    
    aiZone.innerHTML = html;
  }
  
  setupEventListeners() {
    const form = document.getElementById('ai-question-form');
    if (form) {
      form.addEventListener('submit', (e) => this.handleAIQuestion(e));
    }
  }
  
  async handleAIQuestion(event) {
    event.preventDefault();
    
    const input = document.getElementById('ai-question-input');
    const submitBtn = document.getElementById('ai-submit-btn');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoading = submitBtn.querySelector('.btn-loading');
    const question = input.value.trim();
    
    if (!question) return;
    
    // Add user message to conversation
    this.addMessageToConversation(question, 'user');
    
    // Clear input
    input.value = '';
    
    // Show loading state
    submitBtn.disabled = true;
    btnText.style.display = 'none';
    btnLoading.style.display = 'inline';
    
    try {
      // Call AI API
      const response = await fetch(this.apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: question })
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      const aiReply = data.reply || "Désolé, je n'ai pas pu générer de réponse.";
      
      // Add AI response to conversation
      this.addMessageToConversation(aiReply, 'ai');
      
      // Award points for asking a question
      if (this.homeInfo) {
        this.homeInfo.addPoints(5);
      }
      
    } catch (error) {
      console.error('Error calling AI:', error);
      this.addMessageToConversation(
        "❌ Erreur: Impossible de contacter l'IA. Veuillez réessayer.",
        'error'
      );
    } finally {
      // Reset button state
      submitBtn.disabled = false;
      btnText.style.display = 'inline';
      btnLoading.style.display = 'none';
    }
  }
  
  addMessageToConversation(text, type) {
    const conversation = document.getElementById('ai-conversation');
    if (!conversation) return;
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `ai-message ${type}`;
    
    const icon = type === 'user' ? '👤' : type === 'error' ? '⚠️' : '🤖';
    messageDiv.innerHTML = `
      <span class="message-icon">${icon}</span>
      <span class="message-text">${this.escapeHtml(text)}</span>
    `;
    
    conversation.appendChild(messageDiv);
    
    // Scroll to bottom
    conversation.scrollTop = conversation.scrollHeight;
    
    // Animate message entry
    setTimeout(() => {
      messageDiv.classList.add('visible');
    }, 10);
  }
  
  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
  
  getStyles() {
    return `
      /* Star background */
      #star-canvas {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: -1;
        background: linear-gradient(135deg, #1e3c72 0%, #2a5298 50%, #7e22ce 100%);
      }
      
      /* AI Question Zone */
      .ai-panel {
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(10px);
        border-radius: 20px;
        padding: 30px;
        max-width: 800px;
        margin: 30px auto;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
      }
      
      .ai-panel h2 {
        margin-top: 0;
        color: #1e3c72;
        text-align: center;
      }
      
      .ai-conversation {
        min-height: 300px;
        max-height: 400px;
        overflow-y: auto;
        margin-bottom: 20px;
        padding: 15px;
        background: #f5f5f5;
        border-radius: 15px;
        border: 2px solid #e0e0e0;
      }
      
      .ai-message {
        margin-bottom: 15px;
        padding: 12px 15px;
        border-radius: 15px;
        display: flex;
        gap: 10px;
        align-items: flex-start;
        opacity: 0;
        transform: translateY(10px);
        transition: all 0.3s ease;
      }
      
      .ai-message.visible {
        opacity: 1;
        transform: translateY(0);
      }
      
      .ai-message.user {
        background: #e3f2fd;
        border-left: 4px solid #2196f3;
      }
      
      .ai-message.ai {
        background: #f1f8e9;
        border-left: 4px solid #8bc34a;
      }
      
      .ai-message.error {
        background: #ffebee;
        border-left: 4px solid #f44336;
      }
      
      .message-icon {
        font-size: 1.2em;
        flex-shrink: 0;
      }
      
      .message-text {
        flex: 1;
        line-height: 1.5;
        word-wrap: break-word;
      }
      
      .ai-question-form {
        display: flex;
        gap: 10px;
      }
      
      #ai-question-input {
        flex: 1;
        padding: 15px;
        border: 2px solid #ddd;
        border-radius: 10px;
        font-size: 1em;
        transition: border-color 0.3s;
      }
      
      #ai-question-input:focus {
        outline: none;
        border-color: #2196f3;
      }
      
      #ai-submit-btn {
        padding: 15px 30px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border: none;
        border-radius: 10px;
        font-size: 1em;
        font-weight: bold;
        cursor: pointer;
        transition: transform 0.2s, box-shadow 0.2s;
        min-width: 120px;
      }
      
      #ai-submit-btn:hover:not(:disabled) {
        transform: translateY(-2px);
        box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
      }
      
      #ai-submit-btn:disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }
      
      /* Responsive */
      @media (max-width: 768px) {
        .ai-panel {
          padding: 20px;
          margin: 20px 10px;
        }
        
        .ai-question-form {
          flex-direction: column;
        }
        
        #ai-submit-btn {
          width: 100%;
        }
      }
    `;
  }
}

// Initialize app when DOM is ready
if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      window.app = new App();
    });
  } else {
    window.app = new App();
  }
}

// Export for use in modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = App;
}
