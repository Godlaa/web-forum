// src/App.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import Forum from '../src/pages/Forum';
import { Context } from '../src/index';
import '@testing-library/jest-dom';
import UserStore from '../src/store/UserStore';
import QuestionStore from '../src/store/QuestionStore';

test('renders Forum component with context', () => {
  render(
    <Context.Provider value={{
      user_store: new UserStore(),
      question_store: new QuestionStore(),
    }}>
      <Forum />
    </Context.Provider>
  );
  
  const headingElement = screen.getByRole('heading', { name: /forum/i });
  expect(headingElement).toBeInTheDocument();
});
