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
  drawOverlayGraphics(); // 繪製 overlayGraphics 的內容
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
  drawOverlayGraphics(); // 重新繪製 overlayGraphics 的內容
}

function drawOverlayGraphics() {
  overlayGraphics.background(0); // 設定背景為黑色
  overlayGraphics.noStroke();

  // 每隔 20 單位繪製一個方框和圓
  for (let x = 0; x < overlayGraphics.width; x += 20) {
    for (let y = 0; y < overlayGraphics.height; y += 20) {
      // 從 capture 中取得相對應位置的顏色
      let col = capture.get(x, y);
      let g = green(col); // 取得 G 值
      overlayGraphics.fill(0, g, 100); // 設定方框顏色 (R=0, G=G 值, B=100)
      overlayGraphics.rect(x + 1, y + 1, 18, 18); // 繪製方框，寬高為 18

      overlayGraphics.fill(0); // 設定圓的顏色為黑色
      overlayGraphics.ellipse(x + 10, y + 10, 5, 5); // 繪製圓，圓心在方框中心，直徑為 5
    }
  }
}
