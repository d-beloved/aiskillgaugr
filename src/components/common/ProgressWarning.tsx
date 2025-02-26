interface Props {
  onContinue: () => void;
  onCancel: () => void;
}

export default function ProgressWarning({ onContinue, onCancel }: Props) {
  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Warning</h3>
        <p className="py-4">
          You have an ongoing quiz. Leaving this page will reset your progress. Do you wan to Continue?
        </p>
        <div className="modal-action">
          <button onClick={onContinue} className="btn btn-error">
            Continue
          </button>
          <button onClick={onCancel} className="btn">
            Stay
          </button>
        </div>
      </div>
    </div>
  );
}
