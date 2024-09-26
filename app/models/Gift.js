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
        <div class="p-2 shadow">
          <img src="${this.url}" alt="Gift alt" class="gift-img">
          <p class="text-center fw-bold mb-0 mt-1">${this.tag}</p>
        </div>
      </div>
    `
  }

  get closedHTMLTemplate() {
    return `
    <div class="col-md-4 mb-3">
      <div class="d-flex justify-content-center align-items-center h-100 gift-placeholder p-4 shadow"
        style="background-image: url(${this.url});">
        <div class="bg-secondary w-100 p-1 text-center selectable" role="button" title="Open this gift!">
          <p class="fw-bold">${this.tag}</p>
          <i>Click to open</i>
        </div>
      </div>
    </div>
    `
  }

  get cardHTMLTemplate() {
    return this.opened ? this.openedHTMLTemplate : this.closedHTMLTemplate
  }
}