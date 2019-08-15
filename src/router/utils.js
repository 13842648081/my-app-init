export function scrollBehavior (to, from, savedPosition) {
  if (to.meta.keepScroll && from.meta.keepScroll) {
    return null
  }
  if (savedPosition) {
    return savedPosition
  }
  if (to.hash) {
    const position = {}
    position.selector = to.hash
    const productHash = ['#item_info', '#item_review', '#item_qna', '#item_refund']
    if (productHash.some(item => item === to.hash)) {
      position.offset = {
        y: 67
      }
    }
    return position
  }
  return { x: 0, y: 0 }
}
