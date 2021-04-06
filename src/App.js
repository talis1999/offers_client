import Root from "./components/Root";
import { AuthProvider } from "./components/AuthContext";
import { OffersProvider } from "./components/OffersProvider";
function App() {
  return (
    <AuthProvider>
      <OffersProvider>
        <Root />
      </OffersProvider>
    </AuthProvider>
  );
}
//Todo register -> navbar + homePage + itemComponent - > add component form

export default App;
