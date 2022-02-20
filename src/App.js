import logo from './logo.svg';
import './App.scss';
import React, {useEffect, useState} from 'react';
import words from './cutdownWords'




import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopy } from '@fortawesome/free-solid-svg-icons'


import Select from 'react-select'



function App() {

  let [password, setPassword ] = useState('')
  let [passwordLength, setPasswordLength] = useState(3)
  let [ spacingCharacter, setSpacingCharacter] = useState('_')
  let [ digitAmount, setDigitAmount ] = useState('2')

  let [loading, setLoading] = useState(false)
  let [showCopyMessage, setShowCopyMessage] = useState(false)

  // let filteredWords = words.filter( v => v.length < 6 && v.length > 3 && v[v.length - 1] != 's')
  // let log = '[\n'
  // filteredWords.forEach(v => log += `'${v}',\n`)

  //TODO: keep going through words -- im at index 6400 going u

  let generatePassword = (e) => {
    e.preventDefault()

    let newPassword = ''

    for (let i = 1; i <= passwordLength; i++) {
      //chose a random word from the wordbank
      let randomWord = words[Math.floor(Math.random() * 6500)]

      //first word gets capitalized
      newPassword += i === 1 ? randomWord[0].toUpperCase()  + randomWord.slice(1) : randomWord 

      //if its the last word append a random number -- else just put a spacing character
      if ( i === parseInt(passwordLength) ) {
        let digits = ''
        for( let i2 = 0; i2 < parseInt(digitAmount); i2++){ digits += Math.floor(Math.random() * 10) }
        newPassword += digits
      } else {
        newPassword += spacingCharacter
      }
    }

    //one at a time
    if (loading) return
    
    //transition for loading
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setPassword(newPassword)

    }, 600)

  }


  let copyToClipboard = () => {

    navigator.clipboard.writeText(password);
    setShowCopyMessage(true)
    setTimeout(() => {
      setShowCopyMessage(false)
    }, 200)
  }


  return (
    <>
    <div className='container'>
      <div className='button'>
        <button onClick={generatePassword}>Generate</button>
      </div>
      <div className='controls'>
              <div className='slider'>
                  <span >Number of Words</span>
                  <input type='range' min='2' max='5' onChange={e => setPasswordLength(e.target.value) } value={passwordLength} />
                  <span>{passwordLength}</span>
              </div>
              <div className='slider'>
                  <span >Number of Digits</span>
                  <input type='range' min='0' max='5' onChange={e => setDigitAmount(e.target.value) } value={digitAmount} />
                  <span>{digitAmount}</span>
              </div>
              <div className='select'>
                <span>Spacing Character</span>
                <select onChange={ e => setSpacingCharacter(e.target.value)} value={spacingCharacter} >
                  <option value='_'>_</option>
                  <option value='-'>-</option>
                  <option value='.'>.</option>
                  <option value='$'>$</option>
                  <option value=':'>:</option>
                </select>
              </div>
      </div>
      <div className={`password `}>
        <div
          onClick={copyToClipboard}
          className={`field ${password.length ? '' : 'hide'} ${loading && 'loading'}`} style={{width: password.length > 0 ? `${password.length + 5}rem` : '30rem'}} 
        > 
          {password} <FontAwesomeIcon className={`copy-icon ${password.length ? '' : 'hide'} `} icon={faCopy} /> 
        </div>
      </div>
    </div>
    <div className={`copied ${showCopyMessage ? '' : 'hide'}`}>
      Copied to Clipboard!
    </div>
    </>
    
  );
}

export default App;
