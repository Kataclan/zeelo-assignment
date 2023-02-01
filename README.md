# Zeelo's Candidate Assignmente

This project was bootstrapped with [ViteJS](https://vitejs.dev/). For the solution, I used React and Typescript, among other libraries described below.

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.
Console will show you in which port is the app running.

The page will reload if you make edits.
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode

### `yarn build`

Builds the app for production to the `dist` folder

## Solution description

To carry out the test, I wanted to put myself in the situation of starting a new project, which could scale. You can see the steps I followed to reach the commit-by-commit solution in the items-list branch. Things to take into account my solution:

### Project structure

To structure the project I have followed a modular structure that I have been improving as the solution progressed. The main folders inside `src` are:

- `/__mocks__` : Here I mock MSW, REST calls and database data
- `/api` : Here the actual API calls are defined
- `/components`: Each component has its folder with its index, test and in case of needing a helper we would also include it
- `/hooks`: Directory where we find the definition of the hooks and their tests under the **test** folder
- `/types`: Type definition files
- `/utils`: Helpers shared in the project
- App.tsx: Main App Component
- setupTest.ts : Test setup file
- index.tsx : App input file

### Mocking the API

To mock the API calls, I have done the following:

- I have previously used Mock Service Worker to mock API calls in development runtime. I am used to writing them and it is not difficult for me, that is why I have chosen MSW to simulate these calls and their responses, which can be seen in the DevTools.
- Also, since it is not recommended to use MSW in production, in each API call function in the `/api/{domain}` folder, I check which environment we are in. If we're in production, then I mock the call with a custom Promise that I've declared in the `/utils/mocks.ts` file.
- I use axios to make HTTP requests.
- In unit tests, I directly mock /api functions, but in integration tests, I use the MSW server.

### Considerations

- I have used ViteJS as a bundler because I have used it for the last year and configuring it seemed faster than CRA for what was requested.
- For testing, I have used Jest and Testing Library. I didn't think it was necessary to integrate Cypress for the integration tests because I could do them with these tools and MSW.
- For the API mocking, I have used a combination of Mock Service Worker and a `mockPromiseSuccess` function as I mentioned before.
- I have left the layout for last, and for this I have integrated Tailwind so that it does not take me long.

### Things I would improve

- Instead of using a hook to fetch the items, if I am going to use them in different components and web sites, I would have created a Provider with the React Context API, and coded hooks that feed from that context provider to be able to use the items and functions that call the API anywhere in the app.
- I have not considered having to use React Router to be able to interact with the API as requested. If the project grows, I would add React Router and create specific routes following a CRUD structure for the Books "domain", such as `/books` `/books/:id` and `/books/create`.
- I don't think the typing and the place where the DTOs are declared is entirely correct, I would give it a while more to structure the types of DTOs of the API calls.
