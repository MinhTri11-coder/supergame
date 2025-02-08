let size = 5;
let level = 1;
let moves = 0;
let lights;
let board;

const startGame = () => {
  moves = 0;
  level = 1;
  document.getElementById("moves").textContent = `Số lần nhấn: ${moves}`;
  document.getElementById("level").textContent = `Cấp độ: ${level}`;
  document.getElementById("guide").textContent =
    "Nhấn vào công tắc để bật tất cả đèn sáng!";
  size = level + 4; // Tăng dần kích thước lưới theo cấp độ
  board = document.getElementById("board");
  board.innerHTML = "";
  createBoard();
};

const createBoard = () => {
  lights = [];
  for (let i = 0; i < size * size; i++) {
    const light = document.createElement("div");
    light.classList.add("light", "off");
    light.addEventListener("click", () => toggleLight(i));
    board.appendChild(light);
    lights.push(light);
  }
};

const toggleLight = (index) => {
  const affectedIndices = getAffectedLights(index);
  affectedIndices.forEach((i) => {
    lights[i].classList.toggle("on");
    lights[i].classList.toggle("off");
  });
  moves++;
  document.getElementById("moves").textContent = `Số lần nhấn: ${moves}`;
  checkVictory();
};

const getAffectedLights = (index) => {
  // Tạo quy tắc thay đổi trạng thái đèn: ảnh hưởng đến đèn theo hàng, cột hoặc xung quanh
  let affected = [index];
  let row = Math.floor(index / size);
  let col = index % size;

  // Công tắc có thể thay đổi đèn trong cùng hàng và cùng cột
  for (let i = 0; i < size; i++) {
    affected.push(row * size + i); // Cả hàng
    affected.push(i * size + col); // Cả cột
  }

  return [...new Set(affected)]; // Loại bỏ các chỉ số trùng lặp
};

const checkVictory = () => {
  if (lights.every((light) => light.classList.contains("on"))) {
    document.getElementById(
      "guide"
    ).textContent = `Chúc mừng! Bạn đã thắng ở cấp độ ${level}!`;
    level++;
    if (level > 5) level = 5; // Giới hạn cấp độ để tránh quá lớn
    startGame(); // Bắt đầu lại game với cấp độ mới
  }
};

// Bắt đầu game khi tải trang
startGame();
