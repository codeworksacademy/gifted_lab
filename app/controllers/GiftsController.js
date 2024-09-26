import { AppState } from "../AppState.js";
import { giftsService } from "../services/GiftsService.js";
import { getFormData } from "../utils/FormHandler.js";
import { Pop } from "../utils/Pop.js";
import { setHTML } from "../utils/Writer.js";

export class GiftsController {
  constructor() {
    AppState.on('user', this.hidePlaceholder)
    // AppState.on('user', this.getGifts)
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

  async openGift(giftId) {
    try {
      await giftsService.openGift(giftId)
    } catch (error) {
      Pop.error(error)
      console.error(error);
    }
  }

  async createGift() {
    try {
      event.preventDefault()
      const giftFormElem = event.target
      const giftData = getFormData(giftFormElem)
      await giftsService.createGift(giftData)
      // @ts-ignore
      giftFormElem.reset()
    } catch (error) {
      Pop.error(error)
      console.error(error);
    }
  }

  async deleteGift(giftId) {
    try {
      const wantsToDelete = await Pop.confirm('Are you sure you want to delete this gift?', 'It will be gone forever!')
      if (!wantsToDelete) return
      await giftsService.deleteGift(giftId)
    } catch (error) {
      Pop.error(error)
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