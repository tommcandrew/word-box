import React from 'react'
import {Button, ButtonGroup} from  'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import './Reader.css'

const GrabbedText = (props) => {

        let knownNouns = []
        for (let i = 0; i < props.knownWords.nouns.length; i++) {
            let foreignNoun = props.knownWords.nouns[i].foreign
            knownNouns.push(foreignNoun)
        }

        let knownVerbs = []
        for (let i = 0; i < props.knownWords.verbs.length; i++) {
            let foreignInfinitive = props.knownWords.verbs[i].infinitive
            knownVerbs.push(foreignInfinitive)
            let presentForeign = props.knownWords.verbs[i].presentForeign
            knownVerbs = knownVerbs.concat(presentForeign)
        }

        let knownAdjectives = []
        for (let i = 0; i < props.knownWords.adjectives.length; i++) {
            let foreignAdjectiveFemale = props.knownWords.adjectives[i].foreign.female
            let foreignAdjectiveMale = props.knownWords.adjectives[i].foreign.male
            let foreignAdjectiveNeuter = props.knownWords.adjectives[i].foreign.neuter
            knownAdjectives.push(foreignAdjectiveFemale, foreignAdjectiveMale, foreignAdjectiveNeuter)
        }

        let knownDefArticles = []
        knownDefArticles.push(props.knownWords.defArticle.foreign.male.toLowerCase())
        knownDefArticles.push(props.knownWords.defArticle.foreign.female.toLowerCase())
        knownDefArticles.push(props.knownWords.defArticle.foreign.neuter.toLowerCase())

        let allKnownWords = []

        allKnownWords = allKnownWords.concat(knownNouns, knownVerbs, knownAdjectives, knownDefArticles)

        let allKnownWordsUpperFirstChar = allKnownWords.map(function(word, index) {
            return word.charAt(0).toUpperCase() + word.slice(1)
        })

        let allKnownWordsUpperAll = allKnownWords.map(function(word, index) {
            return word.toUpperCase()
        })

        let splitText = props.text.match(/\w+|\s+|[^\s\w]+/g)

        const knownWordStyle = {
            color: 'green'
        }
        
        const unknownWordStyle = {
            color: 'red'
        }

        let newWordArray = splitText.map(function (word, index) {
            if (!word.match(/\w+[^\0-9]/g)) {
                return word
            } else {
                
            if (allKnownWords.includes(word) || allKnownWordsUpperFirstChar.includes(word) || allKnownWordsUpperAll.includes(word)) {
            
            return (
                <span key={word+index} style={knownWordStyle}>{word}</span>
            )

        } else {
            return (
                <span key={word+index} style={unknownWordStyle}>{word}</span>
            )
        }
    }
    }
    )

        return (
            
            <div>
                    <div className='flex'> 
                        <ButtonGroup vertical className='col-lg-3 button-area'>
                            <Button variant='primary' onClick={props.editText}>Edit</Button>
                            <Button variant='primary' onClick={props.newText}>Add new text</Button>                            
                            <Button variant='danger'  onClick={props.deleteText}>Delete</Button> 
                        </ButtonGroup>
                        <div className="main-area white col-lg-6">
                        <h2 className='text-title'>{props.title}</h2>
                            <div id='grabbedText' className='text-box'>{newWordArray}</div>
                        </div>
                        <div className='col-lg-3'>
                            
                        </div>
                    </div>
                </div>
        )
}

export default GrabbedText
