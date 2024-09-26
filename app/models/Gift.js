import { AppState } from "../AppState.js"

export class Gift {
  constructor(data) {
    this.id = data.id
    this.url = data.url
    this.tag = data.tag
    this.opened = data.opened
    this.creatorId = data.creatorId
  }

  get openedHTMLTemplate() {
    return `
      <div class="col-md-4 mb-3">
        <div class="p-2 shadow position-relative gift">
          <img src="${this.url}" alt="Gift alt" class="gift-img">
          <p class="text-center fw-bold mb-0 mt-1">${this.tag}</p>
          ${this.deleteButton}
        </div>
      </div>
    `
  }

  get closedHTMLTemplate() {
    return `
    <div class="col-md-4 mb-3">
      <div class="d-flex justify-content-center align-items-center h-100 gift-placeholder p-4 shadow positon-relative gift"
        style="background-image: url(${this.url});">
        <div onclick="app.GiftsController.openGift('${this.id}')" class="bg-secondary w-100 p-1 text-center selectable" role="button" title="Open this gift!">
          <p class="fw-bold">${this.tag}</p>
          <i>Click to open</i>
        </div>
        ${this.deleteButton}
      </div>
    </div>
    `
  }

  get cardHTMLTemplate() {
    return this.opened ? this.openedHTMLTemplate : this.closedHTMLTemplate
  }

  get deleteButton() {
    debugger
    if (this.creatorId != AppState.account.id) return ''
    return `
    <button onclick="app.GiftsController.deleteGift('${this.id}')" class="btn btn-danger delete-gift-button" title="Delete this gift">
      <i class="mdi mdi-close-thick"></i>
    </button>
    `
  }
}