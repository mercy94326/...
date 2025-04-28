let capture;
let overlayGraphics;

function setup() {
  createCanvas(windowWidth, windowHeight); // 全視窗畫布
  background(245, 245, 220); // 米白色背景 (RGB: 245, 245, 220)
  capture = createCapture(VIDEO); // 擷取攝影機影像
  capture.size(windowWidth * 0.8, windowHeight * 0.8); // 設定影像大小為視窗的 80%
  capture.hide(); // 隱藏原始的 HTML 視訊元素

  // 建立與攝影機影像相同大小的圖形緩衝區
  overlayGraphics = createGraphics(capture.width, capture.height);
  overlayGraphics.fill(255, 0, 0, 100); // 半透明紅色
  overlayGraphics.noStroke();
  overlayGraphics.rect(0, 0, overlayGraphics.width, overlayGraphics.height); // 填滿整個緩衝區
}

function draw() {
  background(245, 245, 220); // 確保背景保持米白色
  translate(width / 2, height / 2); // 將原點移到畫布中心
  scale(-1, 1); // 水平翻轉影像

  // 繪製攝影機影像
  image(
    capture,
    -capture.width / 2, // 調整影像繪製位置
    -capture.height / 2,
    capture.width,
    capture.height
  );

  // 繪製 overlayGraphics 在攝影機影像上方
  image(
    overlayGraphics,
    -capture.width / 2, // 調整圖形繪製位置
    -capture.height / 2,
    capture.width,
    capture.height
  );
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight); // 當視窗大小改變時，調整畫布大小
  capture.size(windowWidth * 0.8, windowHeight * 0.8); // 更新影像大小
  overlayGraphics = createGraphics(capture.width, capture.height); // 重新建立圖形緩衝區
  overlayGraphics.fill(255, 0, 0, 100); // 半透明紅色
  overlayGraphics.noStroke();
  overlayGraphics.rect(0, 0, overlayGraphics.width, overlayGraphics.height); // 填滿整個緩衝區
}
