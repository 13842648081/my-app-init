export function applyResetElm (response) {
  const config = response.config
  if (config.action) {
    if (window.works && window.works[config.action]) {
      window.works[config.action]()
    }
  }
  return response
}
