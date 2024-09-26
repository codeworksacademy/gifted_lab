import { AppState } from "../AppState.js";
import { giftsService } from "../services/GiftsService.js";
import { Pop } from "../utils/Pop.js";
import { setHTML } from "../utils/Writer.js";

export class GiftsController {
  constructor() {
    AppState.on('user', this.hidePlaceholder)
    AppState.on('user', this.getGifts)
    AppState.on('gifts', this.drawGifts)
  }

  async getGifts() {
    try {
      await giftsService.getGifts()
    } catch (error) {
      Pop.error(error)
      console.error(error);
    }
  }

  hidePlaceholder() {
    document.getElementById('placeholder-main').classList.add('d-none')
    document.getElementById('gifts-main').classList.remove('d-none')
  }

  drawGifts() {
    const gifts = AppState.gifts
    let htmlContent = ''
    gifts.forEach(gift => htmlContent += gift.cardHTMLTemplate)
    setHTML('gifts', htmlContent)
  }
}