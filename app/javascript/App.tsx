import type { FC } from "react";

type Props = { greeting: string };
const App: FC<Props> = ({ greeting }) => <h1>{greeting}, world!</h1>;
export default App;
