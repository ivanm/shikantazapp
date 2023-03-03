import { Flex, CSSReset } from "@chakra-ui/react";

import useHorizontalTimer from "./useHorizontalTimer";

export const App = () => {
  const { isHorizontal, horizontalTime, eventOrientation } = useHorizontalTimer();
  return (
    <>
      <CSSReset />
      <Flex
        bg="special.background"
        as="main"
        w="100%"
        h="100vh"
        justify="center"
        align="center"
        direction="column"
        gap={4}
      >
        <Flex
          background="special.button"
          color="white"
          p={5}
        >
          Is Horizontal? {isHorizontal ? "Yes" : "No"}
        </Flex>
        <Flex
          background="special.button"
          color="white"
          p={5}
        >
          Time? {horizontalTime}
        </Flex>
        <Flex>
          {JSON.stringify(eventOrientation)}
        </Flex>
      </Flex>
    </>
  );
};
