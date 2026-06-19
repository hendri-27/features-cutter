# Features Cutter AI

## What it is, and how to run it?

### What it is?

Features Cutter AI is an MVP scope tool with help of AI Tools. It helps founders, solo builders, and small product teams decide which product features belong in the first release (MVP) and which ones can wait later after the MVP released.

### How to run it?

1. use node.js version 24.13+
2. Install dependencies with `npm install`.
3. Create `.env` files from `.env.example`.
4. Create & Copy OpenRouter API Key from [Open Router AI](https://openrouter.ai/workspaces/default/keys).
5. Set `VITE_OPEN_ROUTER_API_KEY` in your environment with OpenRouter API Key.
6. Start the app with `npm run dev`.
7. If you want to preview the production build, run `npm run build` and then `npm run preview`.

The `dist/` directory is the build output, not an executable app entrypoint, so commands like `npx run dist` will fail.

\*nb: Because the model used is free tier, it can be reach limit.

## Who It's for, and the one job it has to do well

### Who It's for?

It is for founders, solo builders, and small product teams

### The one job it has to do well?

Help give opinionated of MVP decision to reduce scope before they spend time and money building the wrong thing on the MVP.

## Why This problem, and how you know it's worth solving

### Why this problem?

Most early product ideas fail because of they start creating a lot of features that can be created later after MVP released. Because of creating a lot of features it makes the time for MVP development so long to released.

### How you know it's worth solving?

Because I also had an experience on my previous company where i was on the project team, we are taking a lot of time to thinking about which features need to be released for creating an MVP one and decide in the middle of development that these features can be created later.

## What's already out there for it, and why you built this anyway.

### What's already out there for it?

There are a lot of general purpose AI chats (Gemini, ChatGPT, Claude, and many more) that can be prompted to make the specific needs or output.

### Why you built this anyway?

Those tools are designed for broad use cases, so users often need carefully crafted prompts and additional customization before the generated output becomes directly usable for their specific needs.

## What you put in scope, what you left out, and why

### What you put in scope?

A required product idea and optional planned features, a core problem summary, and an output of features to differentiate which one can be build now as MVP and can be build later, AI API having rate limit, using the key api on client side eventhough it is not best practice to use it.

### What you left out?

Authentication, pricing, history of product ideas, integration with project management tools, estimation time for product ideas to finish the MVP, backend for handling request to OpenRouter API (to hide the API key request and system prompt created).

### Why?

Because the core of the product that I created is to help differentiate which one can be created later after MVP released and the limited time that i need to focus only on the core one that most user struggle.

## Where you didn't have answers, what you assumed

### Where you didn't have answers?

The real users that i can interview to get the real data or to validate.

### What you assumed?

The user already has a rough product idea, OpenRouter API is run 100% even it is using free model api, the model returns valid JSON that can be rendered safely.

## Three questions you'd ask a real user before building more?

1. What problem are you trying to solve when you use this feature?
2. How well does this feature solve your problem?
3. What would you do after using this feature?

## How you'd know it's working, and what you'd do next

### How you'd know it's working?

It is working if people can describe an idea, get a sharper MVP, and get the planned features splitted, whether it is for MVP or can be build later.

### What you'd do next?

The next step is to add estimation time completion of the product ideas for MVP features (with constraint like team size, individual skill levels, feature complexity, dependencies between tasks, so it can be more accurate on estimation time completion), integration with project management tools to create list of task of MVP features, creating a backend for handling sensitive data (api key, system prompt), authentication, billing.
