(function(){
  'use strict'

  const cardThemes = [`card-bg--type-1`, `card-bg--type-2`, `card-bg--type-3`]
  const cardColors = document.querySelectorAll(`.card-themes a`)
  const buttonsActions = document.querySelectorAll(`.btn-actions button`)

  const templateCardDefault = `
    <div class="card card--animation card-bg--type-1 radius-xl shadow-xl m-auto">
      <div class="card-bg card-bg--type-1 radius-xl shadow-xl"></div>
      <div class="card-ellipse-top"></div>
      <div class="card-ellipse-bottom"></div>
      <div class="card-name">Mastercard</div>
      <div class="card-logo"><img src="./assets/mastercard_logo.png" alt="Logo cartão de crédito"></div>
      <div class="card-number">0000 0000 0000 0000</div>
      <div class="card-holder">NOME DO TITULAR</div>
      <div class="card-expiry-date">09/25</div>
    </div>
  `;

  const templateVerticalCard = `
    <div class="card-vertical card--animation card-bg--type-1 radius-xl shadow-xl m-auto">
      <div class="card-vertical-bg card-bg--type-1 radius-xl shadow-xl"></div>
      <div class="card-vertical-ellipse-top"></div>
      <div class="card-vertical-ellipse-bottom "></div>
      <div class="card-vertical-logo"><img src="./assets/mastercard_logo.png" alt="Logo cartão de crédito"></div>
      <div class="card-vertical-name">Credit Card</div>
      <div class="card-vertical-number">0000 0000 0000 0000</div>
      <div class="card-vertical-chip"><img src="./assets/card-vertical-chip.svg" alt="Logo cartão de crédito"></div>
      <div class="card-vertical-expiry-date">09/25</div>
    </div>
  `;
  
  function init() {
    changeCard(templateCardDefault, 'default')
    bindEvents()
  }

  function bindEvents() {
    cardColors.forEach(cardColor => {
      cardColor.addEventListener('click', (event) => addCardTheme(event.currentTarget))
    })

    buttonsActions.forEach(button => {
      button.addEventListener(`click`, (event) => addCardType(event.currentTarget))  
    })
  }

  function addCardTheme(target) {
    let content  = target.parentNode.parentNode
    let theme    = target.getAttribute(`data-theme`)
    let card     = content.querySelector('.section-credit-card > div')
    let cardType = _getCardType(content.querySelector('.section-credit-card'))
    let cardBg   = card.firstElementChild
    
    const themeClass = `card-bg--type-${theme}`
    const animateClass = cardType === `default` ? `card-bg--animation` : `card-vertical-bg--animation`

    cardBg.classList.remove(...cardThemes)
    cardBg.classList.add(`${animateClass}`, `${themeClass}`)
    
    setTimeout(() => {
      card.classList.remove(...cardThemes)
      card.classList.add(themeClass)
      cardBg.classList.remove(`${animateClass}`)
    }, 1000 * 0.5)
  }

  function addCardType(target) {
    let type = _getCardType(target)
    let template = type === `default` ? templateCardDefault : templateVerticalCard
        
    changeCard(template, type)
  }

  function changeCard(template, cardType) {
    const cardContainer = document.querySelector(`.section-credit-card`) 
    
    cardContainer.setAttribute(`data-card-type`, cardType || `default`)
    cardContainer.innerHTML = template
  }

  function _getCardType(target) {
    return target.getAttribute(`data-card-type`)
  }

  init()

})();