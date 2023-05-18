import {
  Box,
  Flex,
  Textarea,
  FormControl,
  FormLabel,
  Button,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";

function FlowBox({ children, ...props }) {
  return (
    <Box
      bg="white"
      rounded="xl"
      shadow="md"
      p={4}
      w="500px"
      mx="auto"
      {...props}
    >
      {children}
    </Box>
  );
}

function ChatBox({
  prompt,
  result,
  handleRemove,
  handleInputChange,
  ...props
}) {
  return (
    <FlowBox {...props}>
      <FormControl>
        <Flex justify="space-between">
          <FormLabel>Chat Prompt</FormLabel>
          <Button
            size="xs"
            colorScheme="pink"
            variant="ghost"
            onClick={handleRemove}
          >
            Remove
          </Button>
        </Flex>
        <Textarea onChange={handleInputChange} value={prompt} />
      </FormControl>
      {result?.result && (
        <Box bgColor="orange.50" rounded="md" mt={4} p={2}>
          {result.result}
        </Box>
      )}
    </FlowBox>
  );
}

const InputBox = ({ input, onChange }) => {
  return (
    <FlowBox>
      <FormControl>
        <FormLabel>Input</FormLabel>
        <Textarea value={input} onChange={onChange} />
      </FormControl>
    </FlowBox>
  );
};

export default function Home() {
  const [input, setInput] = useState("");
  const [promptBoxList, setPromptBoxList] = useState([{ id: 0, prompt: "" }]);
  const [resultList, setResultList] = useState([{ id: 0, result: undefined }]);

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const handlePromptBoxInputChange = (e, id) => {
    const updatedInputList = promptBoxList.map((input) => {
      if (input.id === id) {
        return { ...input, prompt: e.target.value };
      }
      return input;
    });
    setPromptBoxList(updatedInputList);
  };

  const handleAddPromptBox = () => {
    const newId =
      promptBoxList.length > 0
        ? promptBoxList[promptBoxList.length - 1].id + 1
        : 0;
    setPromptBoxList([...promptBoxList, { id: newId, prompt: undefined }]);
    setResultList([...resultList, { id: newId, result: undefined }]);
  };

  const handleRemovePromptBox = (id) => {
    const updatedInputList = promptBoxList.filter((input) => input.id !== id);
    const updatedResultList = resultList.filter((result) => result.id !== id);
    setPromptBoxList(updatedInputList);
    setResultList(updatedResultList);
  };

  const [loading, setLoading] = useState(false);

  const handleRun = async () => {
    setLoading(true);
    let currentResult = input;
    const newResultList = [];

    for (const prompt of promptBoxList) {
      try {
        console.log(prompt.prompt + currentResult);
        const response = await axios.post("/api/completion", {
          prompt: prompt.prompt + currentResult,
        });

        currentResult = response.data.text;
        console.log(currentResult);
        newResultList.push({ id: prompt.id, result: currentResult });
      } catch (error) {
        console.error("Error fetching data:", error);
        break;
      }
    }
    setResultList(newResultList);
    setLoading(false);
  };

  return (
    <Flex direction="column" w="full" pt={10} gap={4}>
      <InputBox input={input} onChange={handleInputChange} />
      {promptBoxList.map((promptBox) => (
        <Box key={promptBox.id}>
          <ChatBox
            prompt={promptBox.prompt}
            result={resultList[promptBox.id]}
            handleRemove={() => handleRemovePromptBox(promptBox.id)}
            handleInputChange={(e) =>
              handlePromptBoxInputChange(e, promptBox.id)
            }
          />
        </Box>
      ))}
      <Button w="200px" mx="auto" onClick={handleAddPromptBox}>
        +
      </Button>
      <Button
        isLoading={loading}
        w="100px"
        mx="auto"
        colorScheme="blue"
        onClick={handleRun}
      >
        RUN
      </Button>
    </Flex>
  );
}
