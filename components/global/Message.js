/**
 * Use this Message box if you want to show the user if something went correct or wrong. Used for user input password and if data sending to a server went successfully
 * @author Kilian Aaron Brinkner
 * @param {*} isCorrect "true" for green box; "false" for red box
 * @param messsage printed message in message box
 * @returns
 */
export default function Message({ isCorrect, message }) {
  return (
    <div>
      <div>
        <div
          className={`message mt-2 ${isCorrect ? "is-success" : "is-danger"}`}
        >
          <div className="message-body">
            <p>{`${message}`}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
