import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { Button, Form, FormControl, InputGroup } from "react-bootstrap";
import { BsSearch } from "react-icons/bs";
import { fetchQuestions } from "../http/questionsApi";
import { Question } from "../models";

type Pair = [string, string[]];

const SearchLine: React.FC = observer(() => {
  const [word, setWord] = useState<string>("");
  const [questions] = useState<Pair[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const getOptions = (questions: Pair[]) => {
    const regex = new RegExp(word, "i");
    return questions.filter((pair) => {
      const [header, tags] = pair;
      return header.match(regex);
    });
  };

  useEffect(() => {
    fetchQuestions().then((data) => {
      data["rows"].forEach((question: Question) => {
        questions.push([question.header, question.markers]);
      });
    });
  }, []);

  useEffect(() => {
    setSuggestions([]);
    if (word.length > 0) {
      const options = getOptions(questions);
      const newSuggestions = options.map((pair) => pair[0]);
      setSuggestions(newSuggestions);
      console.log(suggestions);
    }
  }, [word]);

  return (
    <Form>
      <InputGroup>
        <FormControl
          placeholder="Поиск..."
          aria-label="Поиск"
          aria-describedby="basic-addon2"
          value={word}
          onChange={(e) => setWord(e.target.value)}
        />
        <Button variant="outline-secondary">
          <BsSearch /> {/* Иконка лупы */}
        </Button>
      </InputGroup>
      {suggestions.map((suggestion, index) => (
        <div key={index}>
          <h3>{suggestion}</h3>
        </div>
      ))}
    </Form>
  );
});

export default SearchLine;
