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

function CompletionBox({
  prompt = "",
  result,
  handleRemove,
  handleInputChange,
  ...props
}) {
  return (
    <FlowBox {...props}>
      <FormControl>
        <Flex justify="space-between">
          <FormLabel>Completion Prompt</FormLabel>
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

// 插入结果到占位符的函数
function insertResultIntoPrompt(prompt, result) {
  return prompt.replace("{result}", result);
}

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
    setPromptBoxList([...promptBoxList, { id: newId, prompt: "" }]);
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

    // Sort promptBoxList by id to ensure correct execution order
    const sortedPromptBoxList = [...promptBoxList].sort((a, b) => a.id - b.id);

    for (const prompt of sortedPromptBoxList) {
      try {
        const finalPrompt = insertResultIntoPrompt(
          prompt.prompt,
          currentResult,
        );
        console.log(finalPrompt);
        const response = await axios.post("/api/completion", {
          prompt: finalPrompt,
        });

        currentResult = response.data.text;
        console.log(currentResult);

        // Update the resultList with the new result
        setResultList((prevResultList) => {
          const updatedResultList = prevResultList.map((result) => {
            if (result.id === prompt.id) {
              return { id: result.id, result: currentResult };
            }
            return result;
          });
          return updatedResultList;
        });
      } catch (error) {
        console.error("Error fetching data:", error);
        break;
      }
    }
    setLoading(false);
  };

  return (
    <Flex direction="column" w="full" pt={10} gap={4}>
      <InputBox input={input} onChange={handleInputChange} />
      {promptBoxList.map((promptBox) => (
        <Box key={promptBox.id}>
          <CompletionBox
            prompt={promptBox.prompt}
            result={resultList.find((result) => result.id === promptBox.id)}
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
