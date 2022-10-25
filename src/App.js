import AppTreeContextProvider from "./store/AppTreeContextProvider";

import Header from "./layout/Header";
import RedBlackTreePage from "./pages/RedBlackTreePage";

const App = () => {
  return (
    <AppTreeContextProvider>
      <Header />
      <RedBlackTreePage />
    </AppTreeContextProvider>
  );
};

export default App;
