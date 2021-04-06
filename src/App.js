import Root from "./components/Root";
import { AuthProvider } from "./components/AuthContext";
function App() {
  return (
    <AuthProvider>
      <Root />
    </AuthProvider>
  );
}
//Todo - make a provider - > login + register -> navbar + homePage + itemComponent - > add component form

export default App;
