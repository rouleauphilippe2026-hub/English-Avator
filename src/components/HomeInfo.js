/**
 * HomeInfo.js
 * Modern styled interface with halo effect and star score display
 */

class HomeInfo {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    if (!this.container) {
      console.error(`Container with id "${containerId}" not found`);
      return;
    }
    
    this.score = this.loadScore();
    this.maxScore = 100;
    this.render();
  }
  
  loadScore() {
    const saved = localStorage.getItem('userStarScore');
    return saved ? parseInt(saved, 10) : 0;
  }
  
  saveScore() {
    localStorage.setItem('userStarScore', this.score.toString());
  }
  
  addPoints(points) {
    this.score = Math.min(this.maxScore, this.score + points);
    this.saveScore();
    this.updateScoreDisplay();
    this.animateScoreChange();
  }
  
  updateScoreDisplay() {
    const scoreElement = document.getElementById('star-score-value');
    if (scoreElement) {
      scoreElement.textContent = this.score;
    }
    
    const starsElement = document.getElementById('star-display');
    if (starsElement) {
      const starCount = Math.floor(this.score / 20); // 5 stars max
      let starsHTML = '';
      for (let i = 0; i < 5; i++) {
        if (i < starCount) {
          starsHTML += '<span class="star filled">⭐</span>';
        } else {
          starsHTML += '<span class="star empty">☆</span>';
        }
      }
      starsElement.innerHTML = starsHTML;
    }
  }
  
  animateScoreChange() {
    const scoreElement = document.getElementById('star-score-value');
    if (scoreElement) {
      scoreElement.classList.add('score-pulse');
      setTimeout(() => {
        scoreElement.classList.remove('score-pulse');
      }, 600);
    }
  }
  
  render() {
    const html = `
      <div class="home-info-panel">
        <div class="halo-container">
          <div class="halo-effect"></div>
          <div class="avatar-title">
            <h1>English Avatar</h1>
            <p class="subtitle">Apprends l'anglais avec l'IA</p>
          </div>
        </div>
        
        <div class="score-container">
          <div class="score-label">Score d'étoiles</div>
          <div id="star-display" class="star-display"></div>
          <div class="score-value">
            <span id="star-score-value">${this.score}</span> / ${this.maxScore}
          </div>
        </div>
      </div>
    `;
    
    this.container.innerHTML = html;
    this.updateScoreDisplay();
  }
  
  getStyles() {
    return `
      .home-info-panel {
        text-align: center;
        padding: 20px;
        color: white;
      }
      
      .halo-container {
        position: relative;
        display: inline-block;
        margin-bottom: 30px;
      }
      
      .halo-effect {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 300px;
        height: 300px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(255, 215, 0, 0.3) 0%, rgba(255, 215, 0, 0) 70%);
        animation: halo-pulse 3s ease-in-out infinite;
        pointer-events: none;
      }
      
      @keyframes halo-pulse {
        0%, 100% {
          transform: translate(-50%, -50%) scale(1);
          opacity: 0.5;
        }
        50% {
          transform: translate(-50%, -50%) scale(1.1);
          opacity: 0.8;
        }
      }
      
      .avatar-title {
        position: relative;
        z-index: 1;
      }
      
      .avatar-title h1 {
        font-size: 3em;
        margin: 0;
        text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.5);
        background: linear-gradient(45deg, #FFD700, #FFA500);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }
      
      .subtitle {
        font-size: 1.2em;
        margin: 10px 0;
        text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.5);
      }
      
      .score-container {
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(10px);
        border-radius: 20px;
        padding: 20px;
        max-width: 400px;
        margin: 0 auto;
        border: 2px solid rgba(255, 215, 0, 0.3);
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
      }
      
      .score-label {
        font-size: 1.1em;
        margin-bottom: 10px;
        font-weight: bold;
      }
      
      .star-display {
        font-size: 2em;
        margin: 15px 0;
        letter-spacing: 5px;
      }
      
      .star.filled {
        animation: star-twinkle 1.5s ease-in-out infinite;
      }
      
      @keyframes star-twinkle {
        0%, 100% {
          opacity: 1;
          transform: scale(1);
        }
        50% {
          opacity: 0.7;
          transform: scale(1.1);
        }
      }
      
      .star.empty {
        opacity: 0.3;
      }
      
      .score-value {
        font-size: 1.5em;
        font-weight: bold;
        color: #FFD700;
      }
      
      #star-score-value {
        display: inline-block;
        transition: all 0.3s ease;
      }
      
      #star-score-value.score-pulse {
        animation: score-pulse-anim 0.6s ease-out;
      }
      
      @keyframes score-pulse-anim {
        0% {
          transform: scale(1);
        }
        50% {
          transform: scale(1.3);
          color: #FFA500;
        }
        100% {
          transform: scale(1);
        }
      }
    `;
  }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = HomeInfo;
}
