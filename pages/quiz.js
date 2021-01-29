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

function QuestionWidget({
  questions,
  userName,
  totalQuestions,
  currentQuestion,
  onSubmit,
}) {
  const questionId = `question__${currentQuestion}`;
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

        <form onSubmit={(event) => {
          event.preventDefault();
          onSubmit();
        }}
        >
          { questions.alternatives.map((alternative, index) => {
            const alternativeId = `alternative__${index}`;
            return (
              <Widget.Topic as="label" htmlFor={alternativeId} key={alternativeId}>
                <input id={alternativeId} type="radio" name={questionId} />
                {alternative}
              </Widget.Topic>
            );
          }) }

          <Button type="submit">
            Enviar
          </Button>
        </form>

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

  useEffect(() => {
    const url = window.location.href;
    const newUrl = new URL(url);
    const params = newUrl.searchParams.get('name');

    setName(params);

    setTimeout(() => {
      setScreenState(screenStates.QUIZ);
    }, 1000);
  }, []);

  function handleSubmit() {
    const next = currentQuestion + 1 < totalQuestions;

    if (next) {
      setCurrentQuestion(currentQuestion + 1);
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
        />

        )}

        { screenState === screenStates.LOADING && (

        <LoadingWidget />

        )}

        { screenState === screenStates.RESULT && (

        <h1> PA RA BÉNS </h1>

        )}

      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/michellimadesigner" />
    </QuizBackground>
  );
}

export default Quiz;
