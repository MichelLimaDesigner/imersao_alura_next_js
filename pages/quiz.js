/* eslint-disable linebreak-style */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import db from '../db.json';
import Widget from '../src/components/Widget';
import QuizLogo from '../src/components/QuizLogo';
import QuizBackground from '../src/components/QuizBackground';
import GitHubCorner from '../src/components/GitHubCorner';
// import Input from '../src/components/Input';
import Button from '../src/components/Button';
import QuizContainer from '../src/components/QuizContainer';
import AlternativesForm from '../src/components/AlternativesForm';

function LoadingWidget() {
  return (
    <Widget>
      <Widget.Header>
        <h1> Carregando </h1>
      </Widget.Header>
      <Widget.Content>
        <p> Carregando conteúdo </p>
      </Widget.Content>
    </Widget>
  );
}

function ResultWidget({ results }) {
  return (
    <Widget>
      <Widget.Header>
        <h1> Resultado </h1>
      </Widget.Header>
      <Widget.Content>
        <p>
          {`Você acertou ${results.filter((result) => result).length} questões`}
        </p>
        <ul>
          { results.map((result, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <li key={`result__${index}`}>
              { ` #${index + 1} - ${result ? 'Acertou' : 'Errou'} `}
            </li>
          )) }
        </ul>
      </Widget.Content>
    </Widget>
  );
}

function QuestionWidget({
  questions,
  userName,
  totalQuestions,
  currentQuestion,
  onSubmit,
  addResult,
}) {
  const questionId = `question__${currentQuestion}`;
  const [selectedAlternative, setSelectedAlternative] = useState(undefined);
  const isCorrect = selectedAlternative === questions.answer;
  const [formSubmited, setFormSubmited] = useState(false);
  const hasSelectedAltenative = selectedAlternative !== undefined;

  return (
    <Widget>
      <Widget.Header>
        <h1>
          {`Pergunta ${currentQuestion + 1} de ${totalQuestions} para ${userName}`}
        </h1>
      </Widget.Header>
      <img
        src={questions.image}
        alt={questions.title}
        style={{
          width: '100%',
          height: '150px',
          objectFit: 'cover',
        }}
      />

      <Widget.Content>
        <h2>
          { questions.title }
        </h2>
        <p>
          { questions.description }
        </p>

        <AlternativesForm onSubmit={(event) => {
          event.preventDefault();
          setFormSubmited(true);
          setTimeout(() => {
            onSubmit();
            addResult(isCorrect);
            setFormSubmited(false);
            setSelectedAlternative(undefined);
          }, 3000);
        }}
        >
          { questions.alternatives.map((alternative, index) => {
            const alternativeId = `alternative__${index}`;
            const alternativeStatus = isCorrect ? 'SUCESS' : 'ERROR';
            const isSelected = selectedAlternative === index;
            return (
              <Widget.Topic
                as="label"
                htmlFor={alternativeId}
                key={alternativeId}
                data-selected={isSelected}
                data-status={formSubmited && alternativeStatus}
              >
                <input
                  style={{ display: 'none' }}
                  id={alternativeId}
                  type="radio"
                  name={questionId}
                  onChange={() => setSelectedAlternative(index)}
                />
                {alternative}
              </Widget.Topic>
            );
          }) }

          <Button type="submit" disabled={!hasSelectedAltenative}>
            Enviar
          </Button>

          { formSubmited && isCorrect && <h3> Você acertou! </h3> }
          { formSubmited && !isCorrect && <h3> Você errou! </h3> }
        </AlternativesForm>

      </Widget.Content>
    </Widget>
  );
}

const screenStates = {
  QUIZ: 'QUIZ',
  LOADING: 'LOADING',
  RESULT: 'RESULT',
};

function Quiz() {
  const [name, setName] = useState('');
  const totalQuestions = db.questions.length;
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const questions = db.questions[currentQuestion];
  const [screenState, setScreenState] = useState(screenStates.LOADING);
  const [results, setResults] = useState([]);

  useEffect(() => {
    const url = window.location.href;
    const newUrl = new URL(url);
    const params = newUrl.searchParams.get('name');

    setName(params);

    setTimeout(() => {
      setScreenState(screenStates.QUIZ);
    }, 1000);
  }, []);

  function addResult(result) {
    setResults([...results, result]);
  }

  function handleSubmit() {
    const next = currentQuestion + 1 < totalQuestions;

    if (next) {
      setCurrentQuestion(currentQuestion + 1);
      const radioChecked = Array.from(document.querySelectorAll("input[type='radio']")).find((input) => input.checked);

      // eslint-disable-next-line no-unused-expressions
      radioChecked ? radioChecked.checked = false : '';
    } else {
      setScreenState(screenStates.RESULT);
    }
  }

  return (
    // eslint-disable-next-line react/react-in-jsx-scope
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        <QuizLogo />

        { screenState === screenStates.QUIZ && (

        <QuestionWidget
          questions={questions}
          userName={name}
          totalQuestions={totalQuestions}
          currentQuestion={currentQuestion}
          onSubmit={handleSubmit}
          addResult={addResult}
        />

        )}

        { screenState === screenStates.LOADING && (

        <LoadingWidget />

        )}

        { screenState === screenStates.RESULT && (

        <ResultWidget results={results} />

        )}

      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/michellimadesigner" />
    </QuizBackground>
  );
}

export default Quiz;
