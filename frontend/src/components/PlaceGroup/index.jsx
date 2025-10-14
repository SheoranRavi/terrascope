import { useState, useContext } from "react";
import { Button, ButtonGroup, Box } from "@chakra-ui/react";
import { SearchContext } from "../../context/SearchContext";
import React from "react";

export default function PlaceGroup() {
  const [selected, setSelected] = useState("Hotels");
  const {setSearchType} = useContext(SearchContext);

  const handleChange = (opt) => {
    setSelected(opt);
    console.log(`setSearchType: ${optionsMap[opt]}`);
    setSearchType(optionsMap[opt]);
  }

  const options = ["Hotels", "Cafes"];
  const optionsMap = {
    "Hotels": "hotel",
    "Cafes": "cafe"
  }

  return (
    <Box
      bg="transparent"
      p="0"
      rounded="xl"
      shadow="md"
      display="inline-block"
      position="absolute"
      left="50%"
      transform="translateX(-50%)"
      zIndex={1000}
    >
      <ButtonGroup isAttached gap="4">
        {options.map((opt) => (
          <Button
            key={opt}
            onClick={() => handleChange(opt)}
            variant={selected === opt ? "solid" : "outline"}
            colorScheme={selected === opt ? "blue" : "gray"}
            fontSize="sm"
            rounded="sm"
            px="4"
            py="3"
          >
            {opt}
          </Button>
        ))}
      </ButtonGroup>
    </Box>
  );
}
