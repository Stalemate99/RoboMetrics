import { Storage } from "aws-amplify";
import { useEffect, useState } from "react";

interface IRobotCardProps {
  name: string;
  handleSelection: (name: string) => void;
}

export default function RobotCard({ name, handleSelection }: IRobotCardProps) {
  const [url, setUrl] = useState("");

  useEffect(() => {
    Storage.get(name)
      .then((data) => setUrl(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div
      className="flex flex-col items-center max-w-md my-2 cursor-pointer bg-cover bg-[50%] bg-no-repeat h-fit"
      onClick={() => handleSelection(name)}
    >
      <img src={url} alt={name} className="max-w-60 max-h-60" />
      <h2 className="text-cyan-800 font-bold text-xl">{name}</h2>
    </div>
  );
}
