import PrimaryButton from "./appComponents/PrimaryButton";
import { Button } from "./components/ui/button";
import config from "./config/config";
import Input from "./appComponents/Input";
import Header from "./appComponents/Header/Header";

function App() {
  return (
    <>
      <Header />
      {console.log("config", config.appWriteUrl)}
      <div>Welcome</div>
      <PrimaryButton>Send Enquiry</PrimaryButton>
      <Button className="bg-rose-600">Show more</Button>
      <Input name="email" type="email" label="Email" />
    </>
  );
}

export default App;
