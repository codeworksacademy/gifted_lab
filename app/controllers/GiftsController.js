import { AppState } from "../AppState.js";
import { giftsService } from "../services/GiftsService.js";
import { Pop } from "../utils/Pop.js";

export class GiftsController {
  constructor() {
    AppState.on('user', this.hidePlaceholder)
    AppState.on('user', this.getGifts)
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
}