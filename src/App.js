import logo from './logo.svg';
import './App.scss';
import React, {useEffect, useState} from 'react';
import words from './cutdownWords'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopy } from '@fortawesome/free-solid-svg-icons'

function App() {

  let [password, setPassword ] = useState('')
  let [passwordLength, setPasswordLength] = useState(4)
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
      let randomWord = words[Math.floor(Math.random() * 6500)]
      newPassword += i === 1 ? randomWord[0].toUpperCase()  + randomWord.slice(1) : randomWord 
      if ( i === passwordLength) {
        newPassword += Math.floor(Math.random() * 100 )
      } else {
        newPassword += '_'
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
