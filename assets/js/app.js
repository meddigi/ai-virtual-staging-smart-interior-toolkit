// AI Virtual Staging & Smart Interior Prompt Generator
// 설명: 사용자가 선택한 방 종류, 목표, 스타일, 조명 분위기를 바탕으로 실사용 가능한 AI 이미지 프롬프트를 생성합니다.

const roomType = document.getElementById("roomType");
const goal = document.getElementById("goal");
const style = document.getElementById("style");
const lighting = document.getElementById("lighting");
const purpose = document.getElementById("purpose");
const languageMode = document.getElementById("languageMode");

const preserveStructure = document.getElementById("preserveStructure");
const avoidDistortion = document.getElementById("avoidDistortion");
const realisticOnly = document.getElementById("realisticOnly");
const noNightclub = document.getElementById("noNightclub");

const output = document.getElementById("output");
const copyStatus = document.getElementById("copyStatus");

const goalText = {
  emptyRoom: "Convert the room into a clean, empty, real-estate-ready space.",
  virtualStaging: "Create a realistic real estate virtual staging concept.",
  renovation: "Create a renovation before/after visualization concept.",
  smartLighting: "Create a premium smart lighting and smart interior concept.",
  luxuryInterior: "Create a luxury interior design concept.",
  homeCinema: "Create a cinematic home cinema room concept.",
  therapyRoom: "Create a calming therapy room concept for relaxation, focus, and recovery mood."
};

function buildConstraints() {
  const constraints = [];

  if (preserveStructure.checked) {
    constraints.push("Keep the original room structure, windows, flooring, wall layout, ceiling height, and door positions.");
    constraints.push("Do not change the architectural layout.");
  }

  if (avoidDistortion.checked) {
    constraints.push("Do not distort the room size, wall angles, window proportions, or perspective.");
  }

  if (realisticOnly.checked) {
    constraints.push("Use realistic materials, natural proportions, and professional real estate photography quality.");
  }

  if (noNightclub.checked) {
    constraints.push("Do not make the lighting look like a nightclub. Avoid excessive neon colors or unrealistic glow effects.");
  }

  return constraints;
}

function generatePrompt() {
  const selectedRoom = roomType.value;
  const selectedGoal = goalText[goal.value];
  const selectedStyle = style.value;
  const selectedLighting = lighting.value;
  const selectedPurpose = purpose.value;
  const constraints = buildConstraints();

  let prompt = `Create a realistic AI visual concept for a ${selectedRoom}.\n\n`;
  prompt += `Goal: ${selectedGoal}\n`;
  prompt += `Interior style: ${selectedStyle}.\n`;
  prompt += `Lighting direction: ${selectedLighting}.\n`;
  prompt += `Image purpose: ${selectedPurpose}.\n\n`;

  prompt += `Design requirements:\n`;
  prompt += `- Make the space feel clean, balanced, practical, and visually appealing.\n`;
  prompt += `- Prioritize a realistic residential interior suitable for real-world use.\n`;
  prompt += `- Use professional composition, clean surfaces, and natural visual hierarchy.\n`;
  prompt += `- Keep the result suitable for real estate, renovation, or smart interior presentation.\n\n`;

  if (goal.value === "emptyRoom") {
    prompt += `Empty room conversion requirements:\n`;
    prompt += `- Remove furniture, boxes, personal items, cables, trash, and visual clutter.\n`;
    prompt += `- Keep the room clean, bright, and ready for a property listing.\n`;
    prompt += `- Do not add new furniture or decorative objects.\n\n`;
  }

  if (goal.value === "smartLighting") {
    prompt += `Smart interior lighting requirements:\n`;
    prompt += `- Use comfortable brightness with no harsh glare.\n`;
    prompt += `- Add subtle indirect lighting, hidden LED strips, and premium smart ambient lighting.\n`;
    prompt += `- Make the lighting feel elegant, calm, and suitable for a premium apartment renovation.\n\n`;
  }

  if (goal.value === "homeCinema") {
    prompt += `Home cinema requirements:\n`;
    prompt += `- Create an immersive but realistic home theater atmosphere.\n`;
    prompt += `- Use controlled ambient lighting, comfortable seating, and a premium entertainment mood.\n`;
    prompt += `- Keep the space residential, not commercial or overly futuristic.\n\n`;
  }

  if (goal.value === "therapyRoom") {
    prompt += `Therapy room requirements:\n`;
    prompt += `- Create a calm, restorative, and comfortable mood.\n`;
    prompt += `- Use soft colors, gentle lighting, natural textures, and peaceful composition.\n`;
    prompt += `- Avoid medical claims. Focus on relaxation, comfort, focus, and recovery mood.\n\n`;
  }

  prompt += `Important constraints:\n`;
  constraints.forEach((item) => {
    prompt += `- ${item}\n`;
  });

  prompt += `\nNegative prompt guidance:\n`;
  prompt += `Avoid unrealistic architecture, warped walls, distorted windows, fake-looking furniture, overexposed lighting, excessive neon colors, messy composition, and low-quality rendering artifacts.`;

  if (languageMode.value === "englishKorean") {
    prompt += `\n\nKorean explanation:\n`;
    prompt += `이 프롬프트는 ${selectedRoom} 공간을 ${selectedPurpose} 용도에 맞게 AI 이미지로 시각화하기 위한 프롬프트입니다. `;
    prompt += `핵심은 원래 공간 구조를 유지하면서 ${selectedStyle} 분위기와 ${selectedLighting} 조명 방향을 적용하는 것입니다. `;
    prompt += `부동산 매물, 리노베이션 제안, 스마트 인테리어 콘셉트 설명에 활용할 수 있습니다.`;
  }

  output.value = prompt;
  copyStatus.textContent = "";
}

async function copyPrompt() {
  if (!output.value.trim()) {
    generatePrompt();
  }

  try {
    await navigator.clipboard.writeText(output.value);
    copyStatus.textContent = "Prompt copied to clipboard.";
  } catch (error) {
    output.select();
    document.execCommand("copy");
    copyStatus.textContent = "Prompt selected. You can copy it manually if needed.";
  }
}

function resetForm() {
  roomType.selectedIndex = 0;
  goal.selectedIndex = 0;
  style.selectedIndex = 0;
  lighting.selectedIndex = 0;
  purpose.selectedIndex = 0;
  languageMode.selectedIndex = 0;
  preserveStructure.checked = true;
  avoidDistortion.checked = true;
  realisticOnly.checked = true;
  noNightclub.checked = true;
  output.value = "";
  copyStatus.textContent = "";
  generatePrompt();
}

document.getElementById("generateBtn").addEventListener("click", generatePrompt);
document.getElementById("copyBtn").addEventListener("click", copyPrompt);
document.getElementById("resetBtn").addEventListener("click", resetForm);

generatePrompt();
