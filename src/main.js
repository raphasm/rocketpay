import './css/index.css'

const ccColor1 = document.querySelector('.cc-bg svg g > path ')

const ccColor2 = document.querySelector('.cc-bg svg g g:nth-child(2) path ')

const imgCard = document.querySelector('.cc-logo span img')

// Passando o type como parametro para usar ele para referenciar as propriedades do obj
function setCardColor(type) {
  const colors = {
    visa: ['#2D57F2', '#436D99'],
    mastercard: ['#C69347', '#DF6F29'],
    default: ['black', 'gray']
  }
  console.log([type][0]) // usando o parametro type para pegar as propriedades e as posiçoes delas
  ccColor1.setAttribute('fill', colors[type][0]) // quando usa '[type]' referencia as propriedades va 'colors'
  ccColor2.setAttribute('fill', colors[type][1])
  imgCard.setAttribute('src', `cc-${type}.svg`)
}

setCardColor('visa')
