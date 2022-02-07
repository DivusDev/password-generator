import logo from './logo.svg';
import './App.scss';
import React from 'react';
import words from './cutdownWords'

function App() {

  let [password, setPassword ] = React.useState('')
  let [passwordLength, setPasswordLength] = React.useState(4)

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

    setPassword(newPassword)

  }


  return (
    <div className="">
      <button onClick={generatePassword}>Generate</button>
      <div> Password: {password}</div>
    </div>
  );
}

export default App;
