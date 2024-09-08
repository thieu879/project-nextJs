import { Provider } from "react-redux";
import { store } from "../../redux/stores/store";

export function ReduxProvider({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}
