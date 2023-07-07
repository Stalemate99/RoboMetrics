interface IRobotCardProps {
  name: string;
  url: string;
  handleSelection: (name: string) => void;
}

export default function RobotCard({
  name,
  handleSelection,
  url,
}: IRobotCardProps) {
  return (
    <div
      className="flex flex-col items-center max-w-md my-2 cursor-pointer bg-cover bg-[50%] bg-no-repeat h-fit"
      onClick={() => handleSelection(name)}
    >
      <img src="/images/robot1.jpg" alt={name} className="max-w-xs" />
      <h2 className="text-cyan-800 font-bold text-xl">{name}</h2>
    </div>
  );
}
