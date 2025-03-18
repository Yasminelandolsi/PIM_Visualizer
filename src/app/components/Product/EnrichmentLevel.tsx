// components/EnrichmentLevel.tsx

interface EnrichmentLevelProps {
  level: string;
}

const levels = ["LIS", "BAS", "OPT", "EXC"];

const EnrichmentLevel: React.FC<EnrichmentLevelProps> = ({ level }) => {
  const levelIndex = levels.indexOf(level);

  return (
    <div className="flex flex-col space-y-1">
      <div className="flex space-x-1">
        {levels.map((lvl, index) => (
          <div
            key={lvl}
            className={`h-2 w-12 rounded ${index <= levelIndex ? "bg-green-500" : "bg-gray-300"}`}
          />
        ))}
      </div>
      <div className="flex space-x-1">
        {levels.map((lvl) => (
          <div key={lvl} className="w-12 text-xs text-center text-gray-600">
            {lvl}
          </div>
        ))}
      </div>
    </div>
  );
};

export default EnrichmentLevel;