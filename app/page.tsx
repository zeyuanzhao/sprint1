import Game from "@/components/Game";
import { getWord } from "./actions";

export default function Home() {
  return (
    <div className="h-screen flex flex-col">
      <div className="flex justify-center mt-4">
        <div className="flex flex-col items-center">
          <h1 className="text-4xl">2️⃣0️⃣🤓</h1>
        </div>
      </div>
      <Game />
    </div>
  );
}
