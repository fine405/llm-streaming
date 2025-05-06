# LLM Streaming

A Bun-based LLM streaming demo with real-time typing effects and interactive interruption.

## Features

- 🚀 **Streaming Output** - Display LLM-generated content in real-time without waiting for complete responses
- ⌨️ **Typing Effect** - Configurable character delay to simulate realistic typing experience
- 🛑 **Interactive Interruption** - Press Enter anytime to interrupt the generation process
- 🔄 **Multiple API Support** - Works with both OpenRouter and OpenAI APIs
- 🧩 **PocketFlow-based** - Built with a modular design using the PocketFlow framework

## Installation

```bash
# Install dependencies
bun install
```

## Environment Setup

Create a `.env` file in the project root directory with the following content:

```
# Required: API key is needed
OPENROUTER_API_KEY=your_openrouter_api_key
```

## Usage

### Basic Usage

```bash
# Run directly (will prompt for input)
bun run index.ts

# Run with a question
bun run index.ts --prompt="List the most popular tourist destinations in the world"

```

### Advanced Options

```bash
# Set character output delay (milliseconds)
bun run index.ts --prompt="Your question" --delay=20
```

## Interactive Features

- **Interrupt Generation**: Press Enter or Space key anytime during generation to interrupt
- **Automatic Cleanup**: The program automatically cleans up resources, no manual handling required

## Project Structure

```
llm-streaming/
├── index.ts              # Entry point
├── types.ts              # Type definitions
├── src/
│   ├── nodes.ts          # PocketFlow node implementation
│   └── utils/
│       ├── index.ts      # Utility function exports
│       ├── llm.ts        # LLM API interaction
│       ├── listeners.ts  # Event listeners
│       └── time.ts       # Time-related utility functions
```

## Tech Stack

- **Bun** - JavaScript runtime and package manager
- **TypeScript** - Type-safe JavaScript superset
- **OpenAI SDK** - Interaction with OpenAI API
- **PocketFlow** - Lightweight workflow framework

## Customization and Extension

### Adding New LLM Providers

1. Add a new streaming function in `src/utils/llm.ts`
2. Update the `SharedStore` interface in `types.ts`
3. Add corresponding logic in `src/nodes.ts` and `index.ts`

### Modifying Output Format

You can modify the output processing logic in the `exec` method of `src/nodes.ts`.

## Troubleshooting

### Common Issues

- **Cannot Interrupt Generation**: Ensure you're running in a TTY environment; some terminals may not support raw mode
- **API Errors**: Check if your API keys are correctly set
- **Blank Output**: Some models (like the o1 series) may generate reasoning tokens with empty content; try to handle the reasoning.

### Debugging

Add the environment variable `DEBUG=true` to enable verbose logging:

```bash
DEBUG=true bun run index.ts --prompt="Your question"
```

## License

MIT
