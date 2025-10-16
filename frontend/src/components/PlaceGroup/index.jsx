import { useState, useContext } from "react";
import { Button, ButtonGroup, Box } from "@chakra-ui/react";
import { SearchContext } from "../../context/SearchContext";
import React from "react";
import { useColorModeValue } from "../ui/color-mode";

export default function PlaceGroup() {
  const [selected, setSelected] = useState("Hotels");
  const {setSearchType} = useContext(SearchContext);

  const handleChange = (opt) => {
    setSelected(opt);
    setSearchType(optionsMap[opt]);
  }

  const options = ["Hotels", "Cafes"];
  const optionsMap = {
    "Hotels": "hotel",
    "Cafes": "cafe"
  }

  const selectedBg = useColorModeValue("var(--primary-color)", "var(--primary-hover-color)");
  const selectedColor = useColorModeValue("white", "white");
  const unselectedBg = useColorModeValue("var(--neutral-bg)", "var(--neutral-bg)");
  const unselectedColor = useColorModeValue("var(--text-dark)", "var(--text-light)");

  return (
    <Box
      p="0"
      rounded="xl"
      shadow="md"
      display="inline-block"
      position="absolute"
      top="2px"
      left="50%"
      pointerEvents="auto !important"
      transform="translateX(-50%)"
      zIndex={1000}
      bg="var(--neutral-bg)"
    >
      <ButtonGroup isAttached gap="4">
        {options.map((opt) => (
          <Button
            key={opt}
            onClick={() => handleChange(opt)}
            bg={selected === opt ? selectedBg : unselectedBg}
            color={selected === opt ? selectedColor : unselectedColor}
            fontSize="sm"
            rounded="sm"
            px="4"
            py="3"
            className="text-responsive"
          >
            {opt}
          </Button>
        ))}
      </ButtonGroup>
    </Box>
  );
}
