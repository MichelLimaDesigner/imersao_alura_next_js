/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/jsx-filename-extension */
import { useRouter } from 'next/router';

import { useState } from 'react';
import db from '../db.json';
import Widget from '../src/components/Widget';
import QuizLogo from '../src/components/QuizLogo';
import QuizBackground from '../src/components/QuizBackground';
import Footer from '../src/components/Footer';
import GitHubCorner from '../src/components/GitHubCorner';
import Input from '../src/components/Input';
import Button from '../src/components/Button';
import QuizContainer from '../src/components/QuizContainer';

export default function Home() {
  const router = useRouter();
  const [name, setName] = useState('');

  function formSub(event) {
    event.preventDefault();
    router.push(`/quiz?name=${name}`);
  }

  return (
    // eslint-disable-next-line react/react-in-jsx-scope
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        <QuizLogo />
        <Widget>
          <Widget.Header>
            <h1>
              { db.title }
            </h1>
          </Widget.Header>
          <Widget.Content>
            <p>
              { db.description }
            </p>

            {/* eslint-disable-next-line no-undef */}
            <form onSubmit={(event) => formSub(event)}>
              {/* eslint-disable-next-line max-len */}
              <Input
                onChange={(event) => setName(event.target.value)}
                placeholder="Digite seu nome"
                name="userName"
                value={name}
              />
              <Button type="submit" disabled={!name}>
                Jogar
              </Button>
            </form>
          </Widget.Content>
        </Widget>

        <Widget>
          <Widget.Content>
            <h1>Quizes da Galera</h1>

            <p>lorem ipsum dolor sit amet...</p>
          </Widget.Content>
        </Widget>
        <Footer />
      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/michellimadesigner" />
    </QuizBackground>
  );
}
