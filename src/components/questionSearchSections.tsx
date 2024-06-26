import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { Button, Container, FormControl, InputGroup } from "react-bootstrap";
import { BsSearch } from "react-icons/bs";
import { Answer, Section } from "../models";
import { fetchSections } from "../http/sectionsApi";
import { Context } from "..";

interface InputComponentProps {
  placeholder: string;
  onSuggestionsChange: (newSuggestions: Section[]) => void;
}

const SearchLineSections: React.FC<InputComponentProps> = observer(
  ({ onSuggestionsChange, placeholder }) => {
    const [word, setWord] = useState<string>("");
    const [sections] = useState<Section[]>([]);
    const question_store = useContext(Context)?.question_store;

    const getOptions = (sections: Section[]) => {
      const regex = new RegExp(word, "i");
      return sections.filter((data) => {
        const { name } = data;
        return name.match(regex);
      });
    };

    useEffect(() => {
      fetchSections().then((data) => {
        data.forEach((section: Section) => {
          sections.push(section);
        });
      });
    }, []);

    useEffect(() => {
      if (word.length > 0) {
        const options = getOptions(sections);
        onSuggestionsChange(options);
      } else {
        onSuggestionsChange(question_store?.sections ?? []);
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
      </Container>
    );
  }
);

export default SearchLineSections;
