const PRIORITY_ORDER = { high: 0, normal: 1, low: 2 }

export default class ImagePreloader {
  constructor({ concurrency = 6, onProgress, onComplete, onError } = {}) {
    this.concurrency = concurrency
    this.onProgress = onProgress
    this.onComplete = onComplete
    this.onError = onError

    this._queue = []
    this._loaded = new Set()
    this._failed = new Set()
    this._active = 0
    this._started = false
    this._aborted = false
  }

  add(url, priority = 'normal') {
    if (this._loaded.has(url) || this._failed.has(url)) return
    this._queue.push({ url, priority })
    this._sort()
  }

  addMany(urls, priority = 'normal') {
    urls.forEach(url => this.add(url, priority))
  }

  start() {
    if (this._started) return
    this._started = true
    this._process()
  }

  abort() {
    this._aborted = true
    this._queue.length = 0
  }

  getProgress() {
    const total = this._total()
    const done = this._loaded.size + this._failed.size
    return total > 0 ? done / total : 1
  }

  getStats() {
    return {
      loaded: this._loaded.size,
      failed: this._failed.size,
      active: this._active,
      queued: this._queue.length,
      total: this._total(),
      progress: this.getProgress(),
    }
  }

  _total() {
    return this._loaded.size + this._failed.size + this._queue.length + this._active
  }

  _sort() {
    this._queue.sort((a, b) => PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority])
  }

  _process() {
    if (this._aborted) return
    while (this._active < this.concurrency && this._queue.length > 0) {
      const { url } = this._queue.shift()
      this._active++
      this._load(url)
    }
    if (this._active === 0 && this._queue.length === 0) {
      this.onComplete?.({
        loaded: [...this._loaded],
        failed: [...this._failed],
      })
    }
  }

  _load(url) {
    const img = new Image()

    const done = () => {
      this._active--
      this._notify()
      this._process()
    }

    img.onload = () => {
      this._loaded.add(url)
      done()
    }

    img.onerror = () => {
      this._failed.add(url)
      this.onError?.(url)
      done()
    }

    img.src = url

    if (img.complete) {
      if (img.naturalWidth > 0) {
        this._loaded.add(url)
      } else {
        this._failed.add(url)
        this.onError?.(url)
      }
      this._active--
      this._notify()
      this._process()
    }
  }

  _notify() {
    this.onProgress?.(this.getProgress(), this._loaded.size, this._failed.size)
  }
}
