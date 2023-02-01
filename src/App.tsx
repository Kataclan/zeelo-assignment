import { Heading, ItemsList, CreateItemForm } from "./components";

const App: React.FC = () => (
  <div className="container h-full flex flex-col items-center">
    <Heading>Zeelo Assignment</Heading>
    <ItemsList />
    <CreateItemForm />
  </div>
);

export default App;
