import React from "react";
import ReactDOM from "react-dom";
import FocusTrap from "focus-trap-react";
import { IForgotPasswordModalFormProps } from "../../interfaces/props/i-forgot-password-modal-form-props";

export const ForgotPasswordModalForm = ({ closeModal, onSubmit }: IForgotPasswordModalFormProps) => {
  return ReactDOM.createPortal(
    <FocusTrap>
      <aside role="dialog" tabIndex={-200} aria-modal="true" className="modal-cover">
        <div className="modal-area">
          <button
            id="modal-form-close"
            aria-label="Close Modal"
            aria-labelledby="close-modal"
            className="_modal-close"
            onClick={closeModal}
          >
            <span id="close-modal" className="_hide-visual">
              Close
            </span>
            <svg className="_modal-close-icon" viewBox="0 0 40 40">
              <path d="M 10,10 L 30,30 M 30,10 L 10,30" />
            </svg>
          </button>
          <div className="modal-body">
            <h5>Forgot password</h5>
            <form id="modal-view-form" onSubmit={onSubmit}>
              <div className="form-group">
                <label htmlFor="email">Please enter your email address here</label>
                <input type="email" className="form-control" id="email" placeholder="name@example.com" />
              </div>
              <div className="form-group">
                <button id="modal-form-submit-btn" className="form-control btn btn-primary" type="submit">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </aside>
    </FocusTrap>,
    document.body
  );
};

export default ForgotPasswordModalForm;
