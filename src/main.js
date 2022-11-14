import './css/index.css'

import IMask from 'imask'

const ccColor1 = document.querySelector('.cc-bg svg g > path ')

const ccColor2 = document.querySelector('.cc-bg svg g g:nth-child(2) path ')

const imgCard = document.querySelector('.cc-logo span img')

const cardName = document.querySelector('.cc-holder .value')
cardName.innerHTML = 'Raphael Setembre Margoni'

// Passando o type como parametro para usar ele para referenciar as propriedades do obj
function setCardColor(type) {
  const colors = {
    visa: ['#2D57F2', '#436D99'],
    mastercard: ['#C69347', '#DF6F29'],
    default: ['black', 'gray']
  }
  // usando o parametro type para pegar as propriedades e as posiçoes delas
  ccColor1.setAttribute('fill', colors[type][0]) // quando usa '[type]' referencia as propriedades va 'colors'
  ccColor2.setAttribute('fill', colors[type][1])
  imgCard.setAttribute('src', `cc-${type}.svg`)
}

setCardColor('visa')

// Pegando o input do cvc
const securityCode = document.querySelector('#security-code')

// Definindo quantos digitos pode ter no campo o '0000' significa que pode ser qualquer numero
const securityCodePatter = {
  mask: '0000' // Configurando para aceitar só 4 caracteres NUMEROS
}

const securityCodeMasked = IMask(securityCode, securityCodePatter)

const expirationDate = document.querySelector('#expiration-date')

const expirationDatePattern = {
  mask: 'MM{/}YY',

  blocks: {
    YY: {
      mask: IMask.MaskedRange,
      from: String(new Date().getFullYear()).slice(2), // só pode colocar numeros do 22 até o 32
      to: String(new Date().getFullYear() + 10).slice(2) // O slice pega os dois ultimos numeros
    },

    // Usando o slice para pegar o '22'

    MM: {
      mask: IMask.MaskedRange,
      from: 1, // Só pode colocar do 1 até o 12
      to: 12
    }
  }
}

const securityExpirationDate = IMask(expirationDate, expirationDatePattern)

const cardNumber = document.querySelector('#card-number')

const cardNumberPattern = {
  mask: [
    {
      mask: '0000 0000 0000 0000',
      regex: /^4\d{0,15}/,
      cardtype: 'visa'
    },
    {
      mask: '0000 0000 0000 0000',
      regex: /(^5[1-5]\d{0,2}|^22[2-9]\d|^2[3-7]\d{0,2})\d{0,12}/,
      cardtype: 'mastercard'
    },
    {
      mask: '0000 0000 0000 0000',
      cardtype: 'default'
    }
  ],
  dispatch: function (appended, dynamicMasked) {
    const number = (dynamicMasked.value + appended).replace(/\D/g, '') // se tiver alguma coisa sem ser numero ele vai fazer o replace de uma string vazia

    // Procurando o regex e verificando se as informações batem com o valor digitado
    const foundMask = dynamicMasked.compiledMasks.find(function (item) {
      return number.match(item.regex)
    })
    console.log(foundMask)
    return foundMask
  }
}

const cardNumberMasked = IMask(cardNumber, cardNumberPattern)

// find é uma função que vai aceitar outra função como parametro, sendo verdadeiro retorna o item, sendo falso retorna 'undifined'
// Mastercard regex:  /(^5[1-5]\d{0,2}|^22[2-9]\d|^2[3-7]\d{0,2})\d{0,12}/
