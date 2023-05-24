# GPT Flow

GPT Flow is an open-source web-based tool that helps users who are not familiar with coding to create, validate, and debug sequences of calls to the ChatGPT API. It's built using React, Chakra UI, and Axios.

## Notice
This is a project that is currently under development.

## Features

- No coding skills required
- Add, remove, and reorder steps in the sequence
- Automatically inserts previous step results into the current step's prompt
- Displays output of each step in the sequence
- User-friendly interface

## Installation

1. Clone the repository:

```
git clone https://github.com/deadblue22/gpt-flow.git
```

2. Change to the project directory:

```
cd gpt-flow
```

3. Install the dependencies:

```
npm install
```

4. Run the development server:

```
npm run dev
```

5. Open your browser and navigate to `http://localhost:3000`.

## Usage

1. Input your initial text in the "Input" box.
2. Add a new step to the sequence by clicking the "Add Step" button.
3. Choose the type of API call (`chat` or `completion`) for each step.
4. Enter the prompt for each step. You can use the `{result}` placeholder to insert the result of the previous step.
5. Remove a step by clicking the "Remove" button next to the step's title.
6. Click the "RUN" button to execute the sequence of API calls. The results will be displayed below each step.

## Contributing

Contributions are welcome! Feel free to submit issues or pull requests.

## License

This project is licensed under the Apache License.
