import './css/index.css'

import IMask from 'imask'

const ccColor1 = document.querySelector('.cc-bg svg > g g:nth-child(1) path')

const ccColor2 = document.querySelector('.cc-bg svg > g g:nth-child(2) path')

const imgCard = document.querySelector('.cc-logo span:nth-child(2) img')

// Passando o type como parametro para usar ele para referenciar as propriedades do obj
function setCardType(type) {
  const colors = {
    visa: ['#436D99', '#2D57F2'],
    mastercard: ['#DF6F29', '#C69347'],
    rocketseat: ['#0D6F5D', 'C3129C'],
    default: ['black', 'gray']
  }
  // quando usa '[type]' referencia as propriedades va 'colors'
  // usando o parametro type para pegar as propriedades e as posiçoes delas
  ccColor1.setAttribute('fill', colors[type][0])

  ccColor2.setAttribute('fill', colors[type][1])
  imgCard.setAttribute('src', `cc-${type}.svg`)
}

globalThis.setCardType = setCardType

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

const expirationDateMasked = IMask(expirationDate, expirationDatePattern)

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

    return foundMask
  }
}

const cardNumberMasked = IMask(cardNumber, cardNumberPattern)

document.querySelector('form').addEventListener('submit', event => {
  event.preventDefault()
})

// Usando o preventDefault para tirar o comportamento padrão de envio ('submit')

// find é uma função que vai aceitar outra função como parametro, sendo verdadeiro retorna o item, sendo falso retorna 'undifined'
// Mastercard regex:  /(^5[1-5]\d{0,2}|^22[2-9]\d|^2[3-7]\d{0,2})\d{0,12}/

const cardHolder = document.querySelector('#card-holder')

cardHolder.addEventListener('input', () => {
  const ccHolder = document.querySelector('.cc-holder .value')
  ccHolder.innerHTML =
    cardHolder.value.lenght === 0 ? 'FULANO DA SILVA' : cardHolder.value
})

// Pegando o input 'cardHolder' (campo digitado)
// Atribuindo o que foi digitado na img do cartão '.cc-holder'

securityCodeMasked.on('accept', () => {
  updatedSecurityCode(securityCodeMasked.value)
})

// O 'code' faz referencia ao securityCodeMasked
function updatedSecurityCode(code) {
  const ccSecurity = document.querySelector('.cc-security .value')
  ccSecurity.innerText = code.length === 0 ? '111' : code
}

cardNumberMasked.on('accept', () => {
  // Passando o 'cardType' como parametro para pegar o tipo do cartão
  // usando a função 'setCardType' para trocar a cor
  // O 'cardType' entra nas propriedades da mascara e busca o 'cardtype' que é o cartão
  const cardType = cardNumberMasked.masked.currentMask.cardtype
  setCardType(cardType)

  updateCardNumber(cardNumberMasked.value)
})

// O 'number' faz referencia ao cardNumberMasked
function updateCardNumber(number) {
  const ccNumber = document.querySelector('.cc-number')

  ccNumber.innerText = number.length === 0 ? '0000 0000 0000 0000' : number
}

expirationDateMasked.on('accept', () => {
  expirationCard(expirationDateMasked.value)
})

function expirationCard(expiration) {
  const ccExpiration = document.querySelector('.cc-expiration .value')
  ccExpiration.innerText = expiration.length === 0 ? '00/00' : expiration
}
