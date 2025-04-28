let capture;

function setup() {
  createCanvas(windowWidth, windowHeight); // 全視窗畫布
  background(245, 245, 220); // 米白色背景 (RGB: 245, 245, 220)
  capture = createCapture(VIDEO); // 擷取攝影機影像
  capture.size(windowWidth * 0.8, windowHeight * 0.8); // 設定影像大小為視窗的 80%
  capture.hide(); // 隱藏原始的 HTML 視訊元素
}

function draw() {
  background(245, 245, 220); // 確保背景保持米白色
  image(
    capture,
    (width - capture.width) / 2, // 計算影像水平置中位置
    (height - capture.height) / 2, // 計算影像垂直置中位置
    capture.width,
    capture.height
  );
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight); // 當視窗大小改變時，調整畫布大小
  capture.size(windowWidth * 0.8, windowHeight * 0.8); // 更新影像大小
}
