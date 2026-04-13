class SaveNatureGame {
  constructor() {
    this.currentLanguage = 'en';
    this.currentChapter = 0;
    this.currentSceneIndex = 0;
    this.score = 0;
    this.inventory = [];
    this.quests = [];
    this.gameState = 'menu';
    this.hintUsed = false;
    
    window.currentLanguage = this.currentLanguage;
    this.init();
  }
  
  init() {
    this.render();
    this.attachEventListeners();
  }
  
  attachEventListeners() {
    const app = document.getElementById('app');
    app.addEventListener('click', (e) => {
      if (e.target.classList.contains('btn-language')) {
        this.setLanguage(e.target.dataset.lang);
      }
      if (e.target.classList.contains('btn-new-game')) {
        this.newGame();
      }
      if (e.target.classList.contains('btn-load-game')) {
        this.loadGame();
      }
      if (e.target.classList.contains('btn-save')) {
        this.save();
      }
      if (e.target.classList.contains('btn-choice')) {
        this.makeChoice(parseInt(e.target.dataset.choice));
      }
      if (e.target.classList.contains('btn-hint')) {
        this.showHint();
      }
      if (e.target.classList.contains('btn-submit')) {
        this.submitAnswer();
      }
      if (e.target.classList.contains('btn-next')) {
        this.nextScene();
      }
      if (e.target.classList.contains('btn-restart')) {
        this.newGame();
      }
    });
  }
  
  setLanguage(lang) {
    this.currentLanguage = lang;
    window.currentLanguage = lang;
    this.render();
  }
  
  newGame() {
    this.currentChapter = 0;
    this.currentSceneIndex = 0;
    this.score = 0;
    this.inventory = [];
    this.quests = [];
    this.gameState = 'playing';
    this.hintUsed = false;
    this.render();
  }
  
  save() {
    const saveData = {
      currentChapter: this.currentChapter,
      currentSceneIndex: this.currentSceneIndex,
      score: this.score,
      inventory: this.inventory,
      quests: this.quests,
      language: this.currentLanguage,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem('saveNatureGame_save', JSON.stringify(saveData));
    this.showNotification(t('gameSaved'));
  }
  
  loadGame() {
    const saved = localStorage.getItem('saveNatureGame_save');
    if (!saved) {
      this.showNotification(t('noSaveFound'));
      this.newGame();
      return;
    }
    
    const saveData = JSON.parse(saved);
    this.currentChapter = saveData.currentChapter;
    this.currentSceneIndex = saveData.currentSceneIndex;
    this.score = saveData.score;
    this.inventory = saveData.inventory;
    this.quests = saveData.quests;
    this.currentLanguage = saveData.language;
    window.currentLanguage = this.currentLanguage;
    this.gameState = 'playing';
    this.hintUsed = false;
    
    this.showNotification(t('gameLoaded'));
    this.render();
  }
  
  makeChoice(choiceIndex) {
    const scene = this.getCurrentScene();
    if (!scene || !scene.choices) return;
    
    const choice = scene.choices[choiceIndex];
    if (!choice) return;
    
    this.score += choice.points || 0;
    this.currentSceneIndex = gameData.chapters[this.currentChapter].scenes.findIndex(
      s => s.id === choice.nextScene
    );
    
    if (this.currentSceneIndex === -1) {
      if (choice.nextScene === 'chapter_2') {
        this.currentChapter = 1;
        this.currentSceneIndex = 0;
      } else if (choice.nextScene === 'chapter_3') {
        this.currentChapter = 2;
        this.currentSceneIndex = 0;
      } else if (choice.nextScene === 'game_end') {
        this.gameState = 'end';
      }
    }
    
    this.hintUsed = false;
    this.render();
  }
  
  submitAnswer() {
    const scene = this.getCurrentScene();
    if (!scene || scene.type !== 'riddle') return;
    
    const input = document.getElementById('riddle-input');
    const userAnswer = input.value.trim().toLowerCase();
    const correctAnswer = t(scene.answerKey).toLowerCase();
    
    if (userAnswer === correctAnswer) {
      this.score += scene.points || 30;
      this.showNotification(t('correct'));
      this.currentSceneIndex++;
      this.hintUsed = false;
      setTimeout(() => this.render(), 800);
    } else {
      this.showNotification(t('incorrect'));
      input.value = '';
    }
  }
  
  showHint() {
    if (this.hintUsed) return;
    this.hintUsed = true;
    this.showNotification(t('hintUsed'));
    this.render();
  }
  
  nextScene() {
    this.currentSceneIndex++;
    this.hintUsed = false;
    
    if (this.currentSceneIndex >= gameData.chapters[this.currentChapter].scenes.length) {
      this.currentChapter++;
      this.currentSceneIndex = 0;
      
      if (this.currentChapter >= gameData.chapters.length) {
        this.gameState = 'end';
      }
    }
    
    this.render();
  }
  
  showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.getElementById('app').appendChild(notification);
    
    setTimeout(() => {
      notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => notification.remove(), 300);
    }, 2000);
  }
  
  getCurrentScene() {
    if (this.currentChapter >= gameData.chapters.length) return null;
    const chapter = gameData.chapters[this.currentChapter];
    return chapter.scenes[this.currentSceneIndex] || null;
  }
  
  render() {
    const app = document.getElementById('app');
    
    if (this.gameState === 'menu') {
      app.innerHTML = this.renderMenu();
    } else if (this.gameState === 'playing') {
      app.innerHTML = this.renderGame();
    } else if (this.gameState === 'end') {
      app.innerHTML = this.renderEnding();
    }
    
    this.attachEventListeners();
  }
  
  renderMenu() {
    return `
      <div class="menu">
        <div class="menu-content">
          <h1 class="game-title">${t('title')}</h1>
          <p class="game-subtitle">${t('subtitle')}</p>
          <div class="menu-buttons">
            <button class="btn btn-new-game">${t('newGame')}</button>
            <button class="btn btn-load-game">${t('loadGame')}</button>
          </div>
          <div class="language-selector">
            <p>${t('language')}:</p>
            <button class="btn btn-language" data-lang="en">English</button>
            <button class="btn btn-language" data-lang="de">Deutsch</button>
          </div>
        </div>
      </div>
    `;
  }
  
  renderGame() {
    const scene = this.getCurrentScene();
    if (!scene) return '<div class="game">Game loaded. Click next to continue.</div>';
    
    let content = '';
    
    if (scene.type === 'dialogue') {
      content = this.renderDialogue(scene);
    } else if (scene.type === 'riddle') {
      content = this.renderRiddle(scene);
    } else if (scene.type === 'end_scene') {
      content = this.renderEndScene(scene);
    }
    
    return `
      <div class="game">
        <div class="sidebar">
          <div class="sidebar-section">
            <h3>${t('chapter')}</h3>
            <p>${this.currentChapter + 1}/3</p>
          </div>
          <div class="sidebar-section">
            <h3>${t('score')}</h3>
            <p class="score-value">${this.score}</p>
          </div>
          <div class="sidebar-section">
            <h3>${t('inventory')}</h3>
            <p>${this.inventory.length > 0 ? this.inventory.join(', ') : 'Empty'}</p>
          </div>
          <div class="sidebar-actions">
            <button class="btn btn-small btn-save">${t('save')}</button>
            <button class="btn btn-small btn-load-game">${t('load')}</button>
            <select class="language-select">
              <option value="en" ${this.currentLanguage === 'en' ? 'selected' : ''}>English</option>
              <option value="de" ${this.currentLanguage === 'de' ? 'selected' : ''}>Deutsch</option>
            </select>
          </div>
        </div>
        <div class="main-content">
          ${content}
        </div>
      </div>
    `;
  }
  
  renderDialogue(scene) {
    const choicesHTML = scene.choices.map((choice, idx) => 
      `<button class="btn btn-choice" data-choice="${idx}">${t(choice.textKey)}</button>`
    ).join('');
    
    return `
      <div class="scene">
        <div class="character-name">${t(scene.characterKey)}</div>
        <div class="dialogue-text">"${t(scene.dialogueKey)}"</div>
        <div class="choices">
          ${choicesHTML}
        </div>
      </div>
    `;
  }
  
  renderRiddle(scene) {
    return `
      <div class="scene">
        <div class="riddle-container">
          <h2 class="riddle-title">${t('answerQuestion')}</h2>
          <p class="riddle-text">"${t(scene.questionKey)}"</p>
          <input type="text" id="riddle-input" class="riddle-input" placeholder="${t('yourAnswer')}" />
          <div class="riddle-actions">
            <button class="btn btn-submit">${t('submit')}</button>
            ${!this.hintUsed ? `<button class="btn btn-hint">${t('hint')}</button>` : ''}
          </div>
          ${this.hintUsed ? `<p class="hint-text">💡 ${t(scene.hintKey)}</p>` : ''}
        </div>
      </div>
    `;
  }
  
  renderEndScene(scene) {
    return `
      <div class="scene">
        <div class="character-name">${t(scene.characterKey)}</div>
        <div class="dialogue-text">"${t(scene.dialogueKey)}"</div>
        <button class="btn btn-next">${t('next')}</button>
      </div>
    `;
  }
  
  renderEnding() {
    const message = this.score >= 400 ? t('ending1') : this.score >= 200 ? t('ending2') : t('ending3');
    
    return `
      <div class="ending">
        <div class="ending-content">
          <h1 class="ending-title">🌍 ${message}</h1>
          <div class="final-stats">
            <p>${t('finalScore')}: <span class="final-score">${this.score}</span></p>
            <p>Chapters Completed: 3/3</p>
            <p class="environmental-message">Together, we can save our planet! 🌱</p>
          </div>
          <button class="btn btn-restart">${t('playAgain')}</button>
        </div>
      </div>
    `;
  }
}

// Start game
window.addEventListener('DOMContentLoaded', () => {
  window.game = new SaveNatureGame();
});
