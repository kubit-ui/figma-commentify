export function confirmTemplate() {
  return /*html*/ `
    <p>Are you sure you want to delete this annotation?</p>
    <div class="confirm-buttons-container">
      <button id="yesButton" class="button-primary">Yes</button>
      <button id="noButton" class="button-secondary">No</button>
    </div>
  `;
}
