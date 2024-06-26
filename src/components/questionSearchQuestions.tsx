import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { Button, Container, FormControl, InputGroup } from "react-bootstrap";
import { BsSearch } from "react-icons/bs";
import { fetchQuestions } from "../http/questionsApi";
import { Question, Section } from "../models";
import { Context } from "..";

interface InputComponentProps {
  placeholder: string;
  onSuggestionsChange: (newSuggestions: Question[]) => void;
}

const SearchLineQuestions: React.FC<InputComponentProps> = observer(
  ({ onSuggestionsChange, placeholder }) => {
    const [word, setWord] = useState<string>("");
    const [questions] = useState<Question[]>([]);
    const [suggestions, setSuggestions] = useState<Question[]>([]);
    const question_store = useContext(Context)?.question_store;

    const getOptions = (questions: Question[]) => {
      const regex = new RegExp(word, "i");
      return questions.filter((data) => {
        const { header, markers } = data;
        return header.match(regex);
      });
    };

    useEffect(() => {
      fetchQuestions().then((data) => {
        data["rows"].forEach((question: Question) => {
          questions.push(question);
        });
      });
    }, []);

    useEffect(() => {
      if (word.length > 0) {
        const options = getOptions(questions);
        onSuggestionsChange(options);
      } else {
        onSuggestionsChange(question_store?.questions ?? []);
      }
    }, [word]);

    return (
      <Container>
        <InputGroup>
          <FormControl
            placeholder={placeholder}
            aria-label="Поиск"
            aria-describedby="basic-addon2"
            value={word}
            onChange={(e) => setWord(e.target.value)}
            style={{
              boxShadow: "none",
              fontFamily: "STIX Two Text",
              color: "black" /* Цвет текста */,
              fontSize: "24px",
            }}
          />
          <Button
            variant="outline-secondary"
            style={{
              backgroundColor: "#C62E3E",
            }}
          >
            <BsSearch size={"2.5em"} /> {/* Иконка лупы */}
          </Button>
        </InputGroup>
        {suggestions.map((suggestion, index) => (
          <div key={index}>
            <h3>{suggestion.header}</h3>
          </div>
        ))}
      </Container>
    );
  }
);

export default SearchLineQuestions;
