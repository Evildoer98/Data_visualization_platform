const theme = {
  chalk: {
    // 背景色
    backgroundColor: '#161522',
    // ScreenPage组件中标题的颜色
    titleColor: '#fff',
    // 页面左上角logo图标
    logoSrc: 'logo_dark.png',
    // 页面顶部头部边框图片
    headerBorderSrc: 'header_border_dark.png',
    // 页面右上角切换按钮的图标
    themeSrc: 'qiehuan_dark.png'
  },
  vintage: {
    backgroundColor: '#eeeeee',
    titleColor: '#000',
    logoSrc: 'logo_light2.png',
    headerBorderSrc: 'header_border_light.png',
    themeSrc: 'qiehuan_light.png'
  }
}
export function getThemeValue (arg) {
  return theme[arg]
}
