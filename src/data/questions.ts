
import { Question } from '../../types';

export const questions: Question[] = [
  {
    id: '1',
    text: 'What does `useEffect` with an empty dependency array `[]` do?',
    options: [
      { id: 'a', text: 'Runs on every render' },
      { id: 'b', text: 'Runs once after the initial mount only' },
      { id: 'c', text: 'Runs only when the component unmounts' },
      { id: 'd', text: 'Prevents the component from rendering' }
    ],
    correctOptionId: 'b',
    stack: 'Frontend',
    category: 'react'
  },
  {
    id: '2',
    text: 'What is the correct way to prevent infinite re-renders in `useEffect` when setting state?',
    options: [
      { id: 'a', text: 'Remove the dependency array' },
      { id: 'b', text: 'Use a functional update or proper dependency management' },
      { id: 'c', text: 'Wrap the setState in a try-catch block' },
      { id: 'd', text: 'Use `useMemo` instead of `useEffect`' }
    ],
    correctOptionId: 'b',
    stack: 'Frontend',
    category: 'react'
  },
  {
    id: '3',
    text: 'What is the primary difference between `useCallback` and `useMemo`?',
    options: [
      { id: 'a', text: 'useCallback is for values, useMemo is for functions' },
      { id: 'b', text: 'useCallback returns a memoized function, useMemo returns a memoized value' },
      { id: 'c', text: 'useCallback is for class components, useMemo is for functional' },
      { id: 'd', text: 'There is no difference' }
    ],
    correctOptionId: 'b',
    stack: 'Frontend',
    category: 'react'
  },
  {
    id: '4',
    text: 'Which hook would you use to store a mutable value that does not trigger a re-render?',
    options: [
      { id: 'a', text: 'useState' },
      { id: 'b', text: 'useReducer' },
      { id: 'c', text: 'useRef' },
      { id: 'd', text: 'useContext' }
    ],
    correctOptionId: 'c',
    stack: 'Frontend',
    category: 'react'
  },
  {
    id: '5',
    text: 'What will `typeof NaN` return in JavaScript?',
    options: [
      { id: 'a', text: '"number"' },
      { id: 'b', text: '"NaN"' },
      { id: 'c', text: '"undefined"' },
      { id: 'd', text: '"object"' }
    ],
    correctOptionId: 'a',
    stack: 'Frontend',
    category: 'algorithms'
  },
  {
    id: '6',
    text: 'Which method is used to combine two or more arrays?',
    options: [
      { id: 'a', text: 'append()' },
      { id: 'b', text: 'concat()' },
      { id: 'c', text: 'join()' },
      { id: 'd', text: 'push()' }
    ],
    correctOptionId: 'b',
    stack: 'Frontend',
    category: 'algorithms'
  },
  {
    id: '7',
    text: 'What is the purpose of the Event Loop in JavaScript?',
    options: [
      { id: 'a', text: 'To handle multi-threading' },
      { id: 'b', text: 'To coordinate the execution of code, collect and process events' },
      { id: 'c', text: 'To compile code into machine language' },
      { id: 'd', text: 'To manage memory allocation' }
    ],
    correctOptionId: 'b',
    stack: 'Frontend',
    category: 'async'
  },
  {
    id: '8',
    text: 'How do you create a deep clone of an object in modern JS (ES2022+)?',
    options: [
      { id: 'a', text: 'Object.assign({}, obj)' },
      { id: 'b', text: '{...obj}' },
      { id: 'c', text: 'structuredClone(obj)' },
      { id: 'd', text: 'JSON.parse(JSON.stringify(obj))' }
    ],
    correctOptionId: 'c',
    stack: 'Frontend',
    category: 'algorithms'
  },
  {
    id: '9',
    text: 'What happens if you don\'t call `resolve` or `reject` in a Promise?',
    options: [
      { id: 'a', text: 'It resolves to undefined' },
      { id: 'b', text: 'It stays in a pending state indefinitely' },
      { id: 'c', text: 'It throws a runtime error' },
      { id: 'd', text: 'It automatically rejects after 5 seconds' }
    ],
    correctOptionId: 'b',
    stack: 'Frontend',
    category: 'async'
  },
  {
    id: '10',
    text: 'What is "Prop Drilling" in React?',
    options: [
      { id: 'a', text: 'A performance optimization technique' },
      { id: 'b', text: 'Passing data through several layers of components' },
      { id: 'c', text: 'Storing props in a database' },
      { id: 'd', text: 'Removing props from a component' }
    ],
    correctOptionId: 'b',
    stack: 'Frontend',
    category: 'react'
  }
];
