import { Box, Image, Text, Badge, Stack } from "@chakra-ui/react";
import React from "react";

export default function PlaceCard({ placeType, name, coordinates, image }) {
  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      bg="white"
      boxShadow="md"
      zIndex={2000}
      p={4}
      mb={4}
    >
      {image && (
        <Image
          src={image}
          alt={name}
          borderRadius="md"
          objectFit="cover"
          w="100%"
          h="150px"
          mb={3}
        />
      )}
      <Stack spacing={2}>
        <Text fontWeight="bold" className="text-responsive">
          {name}
        </Text>
        <Badge colorScheme="teal" alignSelf="start" className="text-responsive">
          {placeType}
        </Badge>
        <Text color="gray.600" className="text-responsive">
          Coordinates: {coordinates?.latitude}, {coordinates?.longitude}
        </Text>
      </Stack>
    </Box>
  );
}