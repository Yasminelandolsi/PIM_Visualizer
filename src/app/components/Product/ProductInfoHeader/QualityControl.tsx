import { CheckCircleIcon, XCircleIcon } from "lucide-react";
interface QualityControlProps {
  verified: boolean;
}
const STATUS_TEXT = {
  verified: "Checked",
  notVerified: "Not yet checked"
};
const QualityControl: React.FC<QualityControlProps> = ({ verified }) => {
  return (
    <div className="w-full flex items-center justify-center space-x-2">
      {verified ? (
        <>
          <CheckCircleIcon className="text-green-500" size={20} />
          <span className="font-medium">{STATUS_TEXT.verified}</span>
        </>
      ) : (
        <>
          <XCircleIcon className="text-red-400" size={20} />
          <span className="font-medium text-gray-500">{STATUS_TEXT.notVerified}</span>
        </>
      )}
    </div>
  );
};

export default QualityControl;