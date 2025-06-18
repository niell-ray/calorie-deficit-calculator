function calculateDeficit() {
  const weight = parseFloat(document.getElementById('weight').value);
  const deficit = parseFloat(document.getElementById('deficit').value);

  let output = document.getElementById('output');
  output.innerHTML = '';

  if (!weight || !deficit) {
    output.innerText = 'Please enter your weight and calorie deficit.';
    return;
  }

  const height = parseFloat(document.getElementById('height').value) / 100;
  const age = parseInt(document.getElementById('age').value);
  const gender = document.getElementById('gender').value;

  if (!height || !age || !gender) {
    output.innerText = 'Please enter your height, age, and gender for estimation.';
    return;
  }

  const bmi = weight / (height * height);
  let estimatedFatPercent;
  if (gender === 'male') {
    estimatedFatPercent = 1.20 * bmi + 0.23 * age - 16.2;
  } else if (gender === 'female') {
    estimatedFatPercent = 1.20 * bmi + 0.23 * age - 5.4;
  } else {
    output.innerText = 'Invalid gender selection.';
    return;
  }

  if (estimatedFatPercent <= 0 || isNaN(estimatedFatPercent)) {
    output.innerText = 'Could not estimate body fat percentage.';
    return;
  }

  let fatToLose = weight * (estimatedFatPercent / 100);
  const totalCalories = fatToLose * 7700;
  const daysNeeded = totalCalories / deficit;

  output.innerHTML = `<div class="result-content">
    <p>Estimated body fat percentage: <b>${estimatedFatPercent.toFixed(2)}%</b></p>
    <p>Based on your current weight of <b>${weight} kg</b>:</p>
    <ul>
      <li>Total fat mass to lose: <b>${fatToLose.toFixed(2)} kg</b></li>
    </ul>
    <p>Since 1 kg of fat is approximately 7,700 calories, you need to burn a total of <b>${totalCalories.toFixed(0)} kcal</b>.</p>
    <p>With a daily calorie deficit of <b>${deficit} kcal/day</b>, it will take you about <b>${Math.ceil(daysNeeded)} days</b> to reach your goal.</p>
  </div>`;
}

function convertToCm() {
  const feet = parseFloat(document.getElementById('feet').value) || 0;
  const inches = parseFloat(document.getElementById('inches').value) || 0;
  const totalInches = (feet * 12) + inches;
  const cm = totalInches * 2.54;
  document.getElementById('convertedHeight').innerText = `Height in cm: ${cm.toFixed(2)} cm`;

  document.getElementById('height').value = cm.toFixed(2);
}

window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('loader');
    if (loader) loader.style.display = 'none';
  }, 3000);
});
