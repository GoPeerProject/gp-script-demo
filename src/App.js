import logo from "./logo.svg";
import "./App.css";
import { useEffect } from "react";

let theme = "dark";

function App() {
  useEffect(() => {
    setTimeout(() => {
      const gP = window.gP;
      gP.setEnv("dev");
      gP.identify({
        userId: "63d831115a2d135bad577b8c",
        firstName: "John",
        lastName: "Doe",
        organizationId: "643d803c132a3879cbc589da",
      });
      gP.show();

      gP.setButtonStyles({ bottom: "50px", right: "calc(50% - 85px)" });

      // gP.setPosition({ bottom: 50, right: 500 });
    }, 1000);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <div
          onClick={() => {
            const nextTheme = theme === "dark" ? "light" : "dark";

            window.gP.setTheme(nextTheme);
            theme = nextTheme;
          }}
        >
          <img src={logo} className="App-logo" alt="logo" />
        </div>
      </header>
    </div>
  );
}

export default App;
