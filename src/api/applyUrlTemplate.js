import urlTemplate from 'url-template'

export default function applyUrlTemplate (config) {
  if (config.pathParams) {
    config.url = urlTemplate.parse(config.url).expand(config.params)
    config.pathParams.forEach(key => delete config.params[key])
  }
  if (config.delData) {
    config.data = config.params[config.delData]
    delete config.params[config.delData]
  }
  return config
}
